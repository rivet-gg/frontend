import { ReactiveControllerHost } from 'lit';
import { v2 } from '../../data/cache';
import { CacheController } from './cacheController';

export class GroupProfileCacheController extends CacheController<v2.GroupProfile> {
	constructor(name: string, host: ReactiveControllerHost) {
		super(name, host, v2.GroupProfile);
	}
}
