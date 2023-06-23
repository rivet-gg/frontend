import logging from '../utils/logging';
import timing from '../utils/timing';
import * as api from '../utils/api';
import config from '../config';
import { Deferred } from '../utils/utils';
import * as protobuf from 'protobufjs';

interface CacheWrapper<T> {
	data: T;

	ts: number;
	// version: string;
}

export interface LocalStorageChange {
	id: string;
	value: any;
}

const CACHE_LIFETIME = timing.days(10);
const IDB_VERSION = 1; // Increment whenever the structure of the database is updated (See `initDB`)

// Set up IDB
let dbRequest: IDBOpenDBRequest;
const idbPromise = new Deferred<IDBDatabase>();
idbPromise.promise.catch(() => {});
let databaseDisabled = false;

let globalStorageHandler: (change: LocalStorageChange) => void;

window.addEventListener('load', () => {
	logging.event('IDB Starting...');
	dbRequest = indexedDB.open('rivet', IDB_VERSION);

	dbRequest.addEventListener('error', e => {
		logging.error(`IDB Error`, e);

		idbPromise.reject(e);
		databaseDisabled = true;
	});

	dbRequest.addEventListener('success', e => {
		idbPromise.resolve((e.target as IDBOpenDBRequest).result);
		logging.event('IDB Initialized');
	});

	dbRequest.addEventListener('upgradeneeded', e => {
		initDB((e.target as IDBOpenDBRequest).result);
		logging.event('IDB Created');
	});
});

export const ls = {
	// Used for local storage changed events
	setGlobalListener(handler: (change: LocalStorageChange) => void) {
		globalStorageHandler = handler;
	},

	buildId(id: string): string {
		return `rivet:${id}`;
	},

	// Data types
	getString(id: string, defaultValue: string): string {
		let v = localStorage.getItem(this.buildId(id));
		if (v == null) return defaultValue;
		else return v;
	},
	setString(id: string, value: string) {
		localStorage.setItem(this.buildId(id), value);

		if (globalStorageHandler) globalStorageHandler({ id, value });
	},

	getBoolean(id: string, defaultValue: boolean): boolean {
		let v = localStorage.getItem(this.buildId(id));
		if (v == null) return defaultValue;
		else return v === 'true';
	},
	setBoolean(id: string, value: boolean) {
		localStorage.setItem(this.buildId(id), value ? 'true' : 'false');

		if (globalStorageHandler) globalStorageHandler({ id, value });
	},

	delete(id: string) {
		localStorage.removeItem(this.buildId(id));
	},

	// Deletes all local storage keys that match the given regex
	deleteAllSimilar(test: RegExp) {
		Object.keys(localStorage)
			.filter(k => {
				{
					if (k.startsWith('rivet:')) {
						return test.test(k.replace('rivet:', ''));
					}
				}
				return false;
			})
			.forEach(localStorage.removeItem.bind(localStorage));
	},

	getInt(id: string, defaultValue: number): number {
		let v = localStorage.getItem(this.buildId(id));
		if (v == null) return defaultValue;
		else return parseInt(v);
	},
	setInt(id: string, value: number) {
		localStorage.setItem(this.buildId(id), Math.floor(value).toString());

		if (globalStorageHandler) globalStorageHandler({ id, value });
	}
};

export async function readCache<T>(keyPath: string[]): Promise<T> {
	if (!config.ALLOW_PAGE_CACHE) return null;

	let key = sanitizeKeyPath(keyPath);

	// Gracefully get DB
	let db;
	try {
		db = await idbPromise.promise;
	} catch {
		return null;
	}

	// Gracefully read DB
	let data;
	try {
		data = await readIDB<CacheWrapper<T>>(db, key);
	} catch (e) {
		if (!databaseDisabled) logging.error('Read error', e);

		data = null;
	}

	// Cache does not exist
	if (!data) return null;

	// Check for errors in cache
	try {
		let wrapper = data;

		// Cache expired or outdated (used to use blobs)
		if (wrapper instanceof Blob || Date.now() - (wrapper.ts as number) >= CACHE_LIFETIME) {
			logging.debug('Cache expired', key);
			deleteIDB(db, key);

			return null;
		}

		// Decode inner data
		return wrapper.data;
	} catch (e) {
		logging.warn(`Error loading cache \`${key}\``, e);
		deleteIDB(db, key);
	}

	return null;
}

export async function writeCache<T>(keyPath: string[], payload: T) {
	// Add timestamp and version properties
	let cacheWrapper: CacheWrapper<T> = {
		data: payload,
		ts: Date.now()
	};

	// Gracefully get DB
	let db;
	try {
		db = await idbPromise.promise;
	} catch {
		return;
	}

	// Save to load storage
	let key = sanitizeKeyPath(keyPath);

	// Gracefully write db
	try {
		await writeIDB(db, key, cacheWrapper);
	} catch (e) {
		if (!databaseDisabled) logging.error('Write error', e);
	}
}

// Deletes all cache KV pairs where the key matches the given regex
export async function deleteAllCache(query: RegExp): Promise<void> {
	if (!config.ALLOW_PAGE_CACHE) return null;

	// Gracefully get DB
	let db;
	try {
		db = await idbPromise.promise;
	} catch {
		return;
	}

	// Gracefully delete all from DB
	try {
		await deleteAllIDB(db, query);
	} catch (e) {
		if (!databaseDisabled) logging.error('Delete all error', e);
	}
}

export async function clearCache(): Promise<void> {
	if (!config.ALLOW_PAGE_CACHE) return null;

	// Gracefully get DB
	let db;
	try {
		db = await idbPromise.promise;
	} catch {
		return;
	}

	// Gracefully delete all from DB
	try {
		await clearIDB(db);
		await ls.deleteAllSimilar(/^identity-thread-id-.*/);
		logging.debug('Cleared cache');
	} catch (e) {
		if (!databaseDisabled) logging.error('Clear error', e);
	}
}

// === DB MANIPULATION ===
function initDB(db: IDBDatabase) {
	let _store = db.createObjectStore('cache', {
		autoIncrement: true
	});
}

async function writeIDB<T>(db: IDBDatabase, path: string, data: T) {
	let result = new Deferred();
	let txn = db.transaction('cache', 'readwrite');

	let store = txn.objectStore('cache');
	let query = store.put(data, path);

	query.addEventListener('success', event => {
		result.resolve();
	});

	query.addEventListener('error', event => {
		let err = (event.target as IDBRequest).error;
		logging.error('Write transaction error', err);

		result.reject(err);
	});

	return result.promise;
}

async function readIDB<T>(db: IDBDatabase, path: string): Promise<T> {
	let result = new Deferred<T>();
	let txn = db.transaction('cache', 'readonly');
	let store = txn.objectStore('cache');

	let query = store.get(path);

	query.addEventListener('success', event => {
		result.resolve((event.target as IDBRequest).result);
	});

	query.addEventListener('error', event => {
		let err = (event.target as IDBRequest).error;
		logging.error('Read transaction error', err);

		result.reject(err);
	});

	return result.promise;
}

async function deleteIDB(db: IDBDatabase, path: string) {
	let result = new Deferred();
	let txn = db.transaction('cache', 'readwrite');
	let store = txn.objectStore('cache');

	let query = store.delete(path);

	query.addEventListener('success', event => {
		result.resolve();
	});

	query.addEventListener('error', event => {
		let err = (event.target as IDBRequest).error;
		logging.error('Delete transaction error', err);

		result.reject(err);
	});

	return result.promise;
}

// Deletes all KV pairs where the key matches the given regex
async function deleteAllIDB(db: IDBDatabase, query: RegExp) {
	let result = new Deferred();
	let txn = db.transaction('cache', 'readwrite');
	let store = txn.objectStore('cache');

	let getCursorRequest = store.openCursor();
	getCursorRequest.addEventListener('success', event => {
		let cursor = (event.target as IDBRequest).result as IDBCursorWithValue;

		if (cursor) {
			if (query.test(cursor.key as string)) {
				let deleteRes = cursor.delete();

				deleteRes.addEventListener('error', event => {
					let err = (event.target as IDBRequest).error;
					logging.error('Bulk delete transaction error', err);
				});
			}

			cursor.continue();
		} else {
			result.resolve();
		}
	});

	getCursorRequest.addEventListener('error', event => {
		let err = (event.target as IDBRequest).error;
		logging.error('Delete transaction error', err);

		result.reject(err);
	});

	return result.promise;
}

async function clearIDB(db: IDBDatabase) {
	let result = new Deferred();
	let txn = db.transaction('cache', 'readwrite');
	let store = txn.objectStore('cache');

	let clearRequest = store.clear();
	clearRequest.addEventListener('success', event => {
		result.resolve();
	});

	clearRequest.addEventListener('error', event => {
		let err = (event.target as IDBRequest).error;

		result.reject(err);
	});

	return result.promise;
}

function sanitizeKeyPath(keyPath: string[]): string {
	return keyPath
		.map(segment => {
			if (typeof segment == 'string') {
				return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			} else {
				logging.error('Invalid IDB keypath', keyPath);
				return '---';
			}
		})
		.join('/');
}
