import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import styles from './game-kv.scss';
import global from '../../../../../utils/global';
import cloud from '@rivet-gg/cloud';
import { responses } from '../../../../../routes';
import { cssify } from '../../../../../utils/css';
import { classMap } from 'lit/directives/class-map.js';
import TextInput from '../../../../dev/text-input';
import { repeat } from 'lit/directives/repeat.js';
import timing, { Debounce } from '../../../../../utils/timing';
import logging from '../../../../../utils/logging';
import { globalEventGroups } from '../../../../../utils/global-events';
import { Rivet } from '@rivet-gg/api';
import { when } from 'lit/directives/when.js';
import { RepeatingRequest } from '../../../../../utils/repeating-request';

type OutputKind = { value?: any; list?: Rivet.kv.Entry[] };

@customElement('page-dev-game-kv')
export default class DevGameKv extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: String })
	namespaceId: string;

	@property({ type: Object })
	namespace: cloud.NamespaceFull = null;

	@property({ type: Object })
	version: cloud.VersionFull = null;

	/// Key that is currently being shown.
	@property({ type: String })
	currentKey = '';

	/// Output for the `currentKey`.
	@property({ type: Object })
	output?: OutputKind = null;

	/// The JSON data inputed by the user.
	@property({ type: Object })
	inputJson: any = null;

	/// If the input JSON sring is valid.
	@property({ type: Boolean })
	inputJsonInvalid = false;

	/// If the input JSON is different than the output.
	@property({ type: Boolean })
	inputJsonChanged = false;

	/// If the value is currently being sent to the server or deleted.
	@property({ type: Boolean })
	updatingValue = false;

	/// Error with the inputed key.
	@property({ type: String })
	keyError: string = null;

	@property({ type: Object })
	loadError?: any;

	@query('#key')
	keyInput: TextInput;

	@query('#json')
	jsonInput: TextInput;

	reqCounter = 0;

	watchStream: RepeatingRequest<Rivet.kv.GetResponse>;

	viewKeyDebounce: Debounce<
		() => Promise<{
			key: string;
			output: OutputKind;
		}>
	>;

	constructor() {
		super();

		this.viewKeyDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async () => {
				if (this.keyError) return null;

				let key = this.currentKey;

				if (this.watchStream) this.watchStream.cancel();

				if (keyIsDirectory(key)) {
					logging.event('Listing directory', key);

					let res = await global.api.kv.list({
						directory: key.slice(0, -1),
						namespaceId: this.namespaceId
					});
					return { key, output: { list: res.entries } };
				} else {
					logging.event('Fetching key', key);

					let res = await global.api.kv.get({
						key: key,
						namespaceId: this.namespaceId
					});
					this.watchKey(key, res.watch.index);

					return { key, output: { value: res.value } };
				}
			},
			completeCb: res => {
				this.output = res.output;

				// Update input JSON
				if (res.output.value) {
					this.updateEditorInput(this.output.value);
				}
			}
		});

		this.viewKeyDebounce.onError(async err => {
			console.error(err);
			this.loadError = err;
		});
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Request data if namespace id set
		if (changedProperties.has('namespaceId')) {
			this.resetData();
			this.fetchMeta();
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Dispose event
		// if (this.watchStream) this.watchStream.cancel();
	}

	resetData() {
		this.namespace = null;
		this.loadError = null;

		// this.lastOutput = LastOutput.Single;
		// this.singleOutput = undefined;
		// this.batchOutput.length = 0;
		// this.lastKeyValue = null;
		// this.keyValue = null;
		// if (this.keyInput) this.keyInput.reset();
		// this.keyError = null;
		// this.invalidJson = false;
		// this.jsonValueIsSame = true;
		// this.updatingValue = false;

		// this.updateEditorInput(undefined);

		this.requestUpdate();
	}

	async fetchMeta() {
		try {
			let reqId = ++this.reqCounter;

			let namespaceRes = await global.deprecatedApi.cloud.getGameNamespaceById({
				gameId: this.game.gameId,
				namespaceId: this.namespaceId
			});

			// Fetch full version config
			let versionRes = await global.deprecatedApi.cloud.getGameVersionById({
				gameId: this.game.gameId,
				versionId: namespaceRes.namespace.versionId
			});

			// Make sure request is most up to date
			if (this.reqCounter == reqId) {
				this.namespace = namespaceRes.namespace;
				this.version = versionRes.version;

				// Switch to root key
				if (this.version.config.kv) this.setCurrentKey('');
			}
		} catch (err) {
			this.loadError = err;
		}
	}

	setCurrentKey(key: string) {
		// Reset state
		this.currentKey = key;
		if (this.keyInput) this.keyInput.value = key;
		this.output = null;

		this.inputJson = null;
		this.inputJsonInvalid = false;
		this.inputJsonChanged = false;

		// Fetch new key
		this.keyError = validateKey(key);
		this.viewKeyDebounce.trigger();
	}

	/// Updates the JSON text inside the editor.
	updateEditorInput(value: any) {
		// Remove undefined value
		if (value === undefined) value = null;

		this.inputJson = value;

		if (this.jsonInput) {
			this.jsonInput.init = JSON.stringify(value, undefined, '\t');
			this.jsonInput.reset();
		}
	}

	/// Resets the input to whatever is reflected on the server.
	discardInput() {
		this.inputJsonInvalid = false;
		this.inputJsonChanged = false;
		this.updatingValue = false;
		this.updateEditorInput(this.output.value);
	}

	async putEntry() {
		// watchKey will listen for the resulting change and update the UI.

		if (this.keyError || this.inputJsonInvalid) return;

		try {
			logging.event('Putting entry', this.namespaceId, this.currentKey, this.inputJson);

			// Put value
			this.updatingValue = true;
			await global.api.kv.put({
				key: this.currentKey,
				value: this.inputJson,
				namespaceId: this.namespaceId
			});
		} catch (err) {
			this.loadError = err;
			this.updatingValue = false;
		}
	}

	async deleteEntry(key: string, e: Event) {
		// If isCurrentKey is true, watchKey will listen for the resulting change and update the UI.

		e.stopImmediatePropagation();

		let isCurrentKey = key == this.currentKey;

		try {
			logging.event('Deleting entry', this.namespaceId, this.currentKey);

			if (isCurrentKey) {
				this.updatingValue = true;
			}

			// Immediately remove from list
			if (this.output.list) {
				this.output = {
					list: this.output.list.filter(x => x.key != key)
				};
			}

			// Delete value
			await global.api.kv.delete({ key, namespaceId: this.namespaceId });
		} catch (err) {
			this.loadError = err;
		}
	}

	/// Called from viewKeyDebounce when we need to watch a key.
	watchKey(key: string, watchIndex: string) {
		let ctxNamespaceId = this.namespaceId;
		let ctxKey = key;

		if (this.watchStream) this.watchStream.cancel();
		this.watchStream = new RepeatingRequest(
			'DevGameKv.watchStream',
			async (abortSignal, watchIndex) => {
				return await global.api.kv.get(
					{
						key,
						namespaceId: this.namespaceId,
						watchIndex
					}
					// TODO:
					// { abortSignal }
				);
			},
			{ watchIndex: { index: watchIndex } }
		);

		this.watchStream.onMessage(res => {
			if (this.namespaceId == ctxNamespaceId && this.currentKey == ctxKey) {
				logging.event('Entry updated', this.namespaceId, this.currentKey, res.value);

				// Update output
				this.output = { value: res.value };
				this.updateEditorInput(res.value);

				// Flag as complete if was editing
				this.updatingValue = false;
				this.inputJsonChanged = false;
				this.inputJsonInvalid = false;
			}
		});

		this.watchStream.onError(async err => {
			logging.error('Request error', err);

			globalEventGroups.dispatch('error', err);
		});
	}

	/// When the key input changes.
	onKeyChange(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		this.setCurrentKey(target.value);
	}

	/// When the JSON input text changes.
	onJsonUpdate(event: InputEvent) {
		let target = event.target as HTMLTextAreaElement;
		try {
			this.inputJson = JSON.parse(target.value);
			this.inputJsonInvalid = false;
			this.inputJsonChanged = JSON.stringify(this.inputJson) !== JSON.stringify(this.output?.value);
		} catch {
			this.inputJsonInvalid = true;
			this.inputJsonChanged = true;
		}
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);
		if (this.namespace == null) return this.renderPlaceholder();

		let keyPath = splitKey(this.currentKey);

		return html`<div id="base">
			<slot name="namespace-select"></slot>
			${when(
				this.version.config.kv,
				() =>
					html`<div id="navigation-holder">
							<div id="navigation" class="key-display">
								${this.renderKeyPath(keyPath, true, true)}
							</div>
						</div>
						<div id="controls">
							<text-input
								id="key"
								placeholder="Key"
								maxlength="512"
								.init=${this.currentKey}
								@input=${this.onKeyChange.bind(this)}
							></text-input>
						</div>
						${when(
							this.keyError,
							() => html`<h2 class="error">Invalid key: ${this.keyError}</h2>`
						)}
						${when(!this.output, () => this.renderBodyPlaceholder())}
						${when(this.output?.value !== undefined, () => this.renderEditor())}
						${when(this.output?.list !== undefined, () => this.renderList())}`,
				() =>
					html`<div id="no-kv" class="muted">
						This namespace does not have the KV service enabled.
					</div>`
			)}
		</div>`;
	}

	renderPlaceholder() {
		return html`<div id="placeholder">
			<div id="placeholder-controls">
				<loading-placeholder></loading-placeholder>
			</div>
		</div>`;
	}

	renderBodyPlaceholder() {
		return html` <div id="body-placeholder">
			<loading-wheel></loading-wheel>
		</div>`;
	}

	renderKeyPath(key: string[], clickable = false, home = false) {
		let keys = key.map((keySegment, i) => {
			if (keySegment.length == 0) return null;

			// The last segment is not clickable
			let segmentClickable = clickable && i != key.length - 1;

			// The key is split up by character and all whitespace characters
			// are made "special" so they are visible to the user.
			let splitKey;
			if (/\s/.test(keySegment)) {
				splitKey = keySegment
					.split('')
					.map(char => (/\s/.test(char) ? html`<span class="special">&nbsp;</span>` : char));
			} else {
				splitKey = keySegment;
			}

			// Calculate the key to navigate to
			let keyPath = key.slice(0, i + 1);
			let keyString = `${connectKey(keyPath)}/`;

			let classes = classMap({
				segment: true,
				clickable: segmentClickable
			});

			return html`<span
					class=${classes}
					@click=${segmentClickable ? this.setCurrentKey.bind(this, keyString) : null}
					>${splitKey}</span
				>${when(i != key.length - 1, () => html`<span class="separator">/</span>`)}`;
		});

		return html`
			<!-- Home icon to navigate to root directory -->
			${when(
				home,
				() => html`
					<span
						class=${classMap({ segment: true, home: true, clickable })}
						@click=${clickable ? this.setCurrentKey.bind(this, '') : null}
						><e-svg src="solid/home"></e-svg
					></span>
					<span class="separator">/</span>
				`
			)}

			<!-- Subsequential keys -->
			${when(key.length > 0, () => keys)}
		`;
	}

	renderEditor() {
		let value = this.output?.value;

		return html`
			<text-input
				id="json"
				area
				.placeholder=${value == null ? 'Key does not exist. Create a value here.' : 'JSON data'}
				maxlength="2048"
				.init=${JSON.stringify(this.inputJson, undefined, '\t')}
				@input=${this.onJsonUpdate.bind(this)}
			></text-input>

			${when(this.inputJsonInvalid, () => html`<h2 class="error">Invalid JSON</h2>`)}

			<div id="update-actions">
				<div id="left">
					<stylized-button
						color="#d93636"
						?disabled=${value == null}
						.trigger=${this.deleteEntry.bind(this, this.currentKey)}
						>Delete</stylized-button
					>
					<stylized-button
						?disabled=${!this.inputJsonChanged}
						.trigger=${this.discardInput.bind(this)}
						>Discard</stylized-button
					>
				</div>
				<stylized-button
					?disabled=${this.updatingValue || this.inputJsonInvalid || !this.inputJsonChanged}
					.trigger=${this.putEntry.bind(this)}
					>Update</stylized-button
				>
			</div>
		`;
	}

	renderList() {
		if (!this.output?.list) return null;
		let entries = this.output.list;

		if (entries.length == 0)
			return html`<p id="no-values" class="muted">
				No keys found.<br />Type a new key path to add one.
			</p>`;

		return html`<div id="kv-list">
			${repeat(
				entries,
				x => x.key,
				entry => {
					let keyPath = splitKey(entry.key);

					let classes = classMap({
						delete: true
					});

					return html`<div class="kv-pair" @click=${this.setCurrentKey.bind(this, entry.key)}>
						<icon-button
							class=${classes}
							src="solid/xmark"
							.color=${null}
							.highlightColor=${null}
							.trigger=${this.deleteEntry.bind(this, entry.key)}
						></icon-button>
						<div class="info">
							<h2 class="key-display">${this.renderKeyPath(keyPath)}</h2>
							<h3 class="value">${JSON.stringify(entry.value)}</h3>
						</div>
						<e-svg src="solid/chevron-right"></e-svg>
					</div>`;
				}
			)}
		</div>`;
	}
}

function splitKey(key: string) {
	let words = [];
	let dontSplit = false;
	let lastIndex = 0;

	let chars = key.split('');
	for (let i = 0, l = key.length; i < l; i++) {
		let char = chars[i];

		if (char == '\\') dontSplit = !dontSplit;
		else {
			if (!dontSplit && char == '/') {
				words.push(key.slice(lastIndex, i).replace(/\\(.)/g, '$1'));
				lastIndex = i + 1;
			}

			dontSplit = false;
		}
	}

	words.push(key.slice(lastIndex).replace(/\\(.)/g, '$1'));

	return words;
}

function connectKey(key: string[]) {
	return key.map(segment => segment.replace(/[,\/]/g, '\\$&')).join('/');
}

function validateKey(key: string) {
	if (key.length > 512) return 'Key longer than 512 characters';
	if (key.startsWith('/')) return 'Key cannot start with forward slash';

	let match = key.match(/\\+?$/);
	if (match && match[0].length % 2 == 0) return 'Key cannot end with a backlash';

	return null;
}

function keyIsDirectory(key: string) {
	let match = key.match(/\\*?\/$/);

	return key.length == 0 || (match && match[0].length % 2 == 1);
}
