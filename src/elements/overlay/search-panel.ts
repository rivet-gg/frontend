import { customElement, property, query, queryAll } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import { cssify } from '../../utils/css';
import { repeat } from 'lit/directives/repeat.js';
import global from '../../utils/global';
import styles from './search-panel.scss';
import TextInput from '../dev/text-input';
import { classMap } from 'lit/directives/class-map.js';
import { showIdentityContextMenu } from '../../ui/helpers';
import { identityRouteData } from '../../data/identity';
import routes from '../../routes';
import timing, { Debounce } from '../../utils/timing';
import { groupRouteData } from '../../data/group';
import * as api from '../../utils/api';
import { SearchPanelData } from '../root/ui-root';
import { ifDefined } from 'lit/directives/if-defined.js';
import assets from '../../data/assets';

interface Command {
	prefix: string;
	label: string;

	identities?: boolean;
	chats?: boolean;
	groups?: boolean;
}

type OutputItem = api.identity.IdentityHandle | api.group.GroupHandle;
type OutputList = OutputItem[];

const COMMAND_PREFIX = /^(i|g)\//;

const COMMANDS: Command[] = [
	{
		prefix: 'i',
		label: 'Identity',

		identities: true
	},
	// {
	// 	prefix: 'c/',
	// 	label: 'Chat',

	// 	chats: true
	// },
	{
		prefix: 'g',
		label: 'Group',

		groups: true
	}
];

@customElement('search-panel')
export default class SearchPanel extends LitElement {
	static styles = cssify(styles);

	@query('text-input')
	input: TextInput;

	@property({ type: Array })
	output: OutputList[] = [];

	@property({ type: Object })
	options: SearchPanelData = null;

	// Shows current valid command
	@property({ type: String })
	activeCommand: string = null;

	@property({ type: String })
	inputText = '';

	// True when text after command is detected
	@property({ type: Boolean })
	queryActive = false;

	// True when a single search has completed
	@property({ type: Boolean })
	queryInit = false;

	// True when search is in progress
	@property({ type: Boolean })
	isLoading = false;

	@property({ type: Number })
	selection = -1;

	@queryAll('.item')
	itemElements: HTMLElement[];

	// === DEBOUNCE INFO ===
	searchDebounce: Debounce<
		(
			query: string
		) => Promise<(api.identity.SearchIdentitiesCommandOutput | api.group.SearchGroupsCommandOutput)[]>
	>;

	constructor() {
		super();

		this.searchDebounce = new Debounce({
			delay: timing.milliseconds(250),
			cb: async query => {
				let searches = [];
				if (this.options.filter.identities && (!this.activeCommand || this.activeCommand == 'i')) {
					searches.push(global.live.identity.searchIdentities({ query, limit: 10 }));
				}
				if ((this.options.filter.groups && !this.activeCommand) || this.activeCommand == 'g') {
					searches.push(global.live.group.searchGroups({ query, limit: 10 }));
				}

				return Promise.all(searches);
			},
			completeCb: responses => {
				this.output.length = 0;

				for (let res of responses) {
					if (isIdentityResponse(res) && res.identities.length) {
						this.output.push(res.identities);
					} else if (!isIdentityResponse(res) && res.groups.length) {
						this.output.push(res.groups);
					}
				}

				this.isLoading = false;
				this.queryInit = true;
			}
		});

		this.searchDebounce.onError(console.error);
	}

	commandKeyPress(event: KeyboardEvent) {
		let modShift = event.getModifierState('Shift');
		let modCtrl = event.getModifierState('Control');
		let fullOutputLength = this.output.reduce((s, a) => s + a.length, 0);

		// Move list cursor
		if (
			event.code == 'ArrowUp' ||
			event.code == 'ArrowDown' ||
			(event.code == 'KeyN' && modShift && modCtrl) ||
			(event.code == 'KeyN' && modCtrl)
		) {
			event.preventDefault();

			// Decrease/increase selection index
			this.selection +=
				event.code == 'ArrowUp' || (event.code == 'KeyN' && modShift && modCtrl) ? -1 : 1;

			// Bound index
			if (this.selection < 0) this.selection = fullOutputLength - 1;
			else if (this.selection >= fullOutputLength) this.selection = 0;

			// Scroll to item
			let selectedElement = this.itemElements[this.selection];
			selectedElement.scrollIntoView({
				block: 'nearest'
			});
		}
		// Select current list item
		else if (event.code == 'Enter') {
			event.preventDefault();

			this.selectItem(this.selection);

			// Special case for end of list selection
			if (this.selection >= fullOutputLength) this.selection--;
		}
	}

	selectCommand(index: number, refocus = false) {
		// Set active command
		if (index == -1 || index >= COMMANDS.length) return;

		// Detect existing command
		let hasCommand = COMMAND_PREFIX.test(this.inputText);

		// Replace command
		if (hasCommand) {
			this.input.inputNode.value = this.inputText.replace(/^\w+\//, `${COMMANDS[index].prefix}/`);
		}
		// Prepend command
		else this.input.inputNode.value = `${COMMANDS[index].prefix}/${this.inputText}`;

		this.parseCommand(this.input.inputNode.value);

		if (refocus) this.focusInput();
	}

	selectItem(index: number) {
		// Index check
		let fullOutputLength = this.output.reduce((s, a) => s + a.length, 0);
		if (index == -1 || index >= fullOutputLength) return;

		// Select item
		if (this.options.selectionCb) {
			// Find item in output lists
			for (let section of this.output) {
				if (index >= section.length) {
					index -= section.length;
				} else {
					this.options.selectionCb(section[index]);
					break;
				}
			}
		} else {
			this.itemElements[index].click();
		}
	}

	// Used when rendering custom items with `options.itemRenderer`
	onSelectItem(index: number) {
		this.selectItem(index);
	}

	onPointerEnterItem(index: number) {
		this.selection = index;
	}

	async commandInput(event: Event) {
		let target = event.target as HTMLInputElement;
		let command = target.value;

		this.parseCommand(command);
	}

	async parseCommand(command: string) {
		let prefixMatch = command.match(COMMAND_PREFIX);

		this.inputText = command;
		let query = this.inputText;

		if (this.inputText.trim().length) {
			if (prefixMatch) {
				let prefix = prefixMatch[1];
				query = command.slice(prefixMatch[0].length).trim();

				this.activeCommand = prefix;

				// No query found
				if (!query) {
					this.output.length = 0;
					this.queryActive = false;
					this.queryInit = false;
					return;
				}
			} else {
				this.activeCommand = null;
			}

			this.queryActive = true;
			this.isLoading = true;

			this.searchDebounce.trigger(query);
		} else {
			this.resetSearch();
			this.requestUpdate('output');
		}
	}

	render() {
		if (!this.options.filter) return null;

		let singleFilter = this.options
			? (this.options.filter.identities != this.options.filter.chats) != this.options.filter.groups
			: false;

		return html`
			<div id="base">
				<div id="controls">
					<div id="input-area">
						<text-input
							id="main-input"
							light
							seamless
							.spellcheck=${false}
							placeholder="Search..."
							@input=${this.commandInput.bind(this)}
							@keydown=${this.commandKeyPress.bind(this)}
						></text-input>
						${this.isLoading
							? html`<loading-wheel
									inline
									small
									no-fade
									message=""
									color="#18181bcc"
							  ></loading-wheel>`
							: null}
					</div>
					${singleFilter
						? null
						: html` <div id="commands">
								${repeat(COMMANDS, c => c.prefix, this.renderCommand.bind(this))}
						  </div>`}
				</div>
				<div id="output" class="light-scrollbar" @pointerleave=${() => (this.selection = -1)}>
					<div id="output-sections">${this.output.map(this.renderOutputSection.bind(this))}</div>

					${this.renderHelpArea()}
				</div>
			</div>
		`;
	}

	renderCommand(command: Command, index: number) {
		let commandAvailable = this.options
			? this.options.filter.identities == command.identities ||
			  this.options.filter.chats == command.chats ||
			  this.options.filter.groups == command.groups
			: true;
		if (!commandAvailable) return null;

		let classes = classMap({
			command: true,
			selected: this.activeCommand == command.prefix
		});

		return html` <div class=${classes} @click=${this.selectCommand.bind(this, index, true)}>
			<div class="command-icon">${command.prefix}/</div>
			<p class="command-label">${command.label}</p>
		</div>`;
	}

	renderOutputSection(section: OutputList, index: number) {
		let previousSectionLength = this.output[index - 1] ? this.output[index - 1].length : 0;
		return html`<div class="section">
			${repeat(
				section,
				i => (isIdentity(i) ? i.identityId : i.groupId),
				(item, i) => this.renderItem(item, i + previousSectionLength)
			)}
		</div>`;
	}

	renderItem(item: OutputItem, index: number) {
		let classes = classMap({
			item: true,
			selected: this.selection == index
		});

		// Render identity
		if (isIdentity(item)) {
			return html`<a
				class=${classes}
				.href=${ifDefined(
					this.options.selectionCb ? undefined : routes.identity.build(identityRouteData(item))
				)}
				@click=${this.options.selectionCb ? this.options.selectionCb.bind(this, item) : null}
				@contextmenu=${showIdentityContextMenu(item)}
				@pointerenter=${this.onPointerEnterItem.bind(this, index)}
			>
				<identity-avatar class="item-thumbnail" .identity=${item}></identity-avatar>
				<identity-name class="item-label" no-link light show-number .identity=${item}></identity-name>
			</a>`;
		} else if (isGroup(item)) {
			return html`<a
				class=${classes}
				.href=${ifDefined(
					this.options.selectionCb ? undefined : routes.groupOverview.build(groupRouteData(item))
				)}
				@click=${this.options.selectionCb ? this.options.selectionCb.bind(this, item) : null}
				@pointerenter=${this.onPointerEnterItem.bind(this, index)}
			>
				<group-avatar class="item-thumbnail" light .group=${item}></group-avatar>
				<p class="item-label">${item.displayName}</p>
			</a>`;
		} else {
			return null;
		}
	}

	renderHelpArea() {
		// Command and no results
		if (this.inputText.length > 1) {
			if (!this.output.length) {
				return html`<h2 id="no-results">
					${this.queryActive && this.queryInit ? 'No results found' : this.helpMessage()}
				</h2>`;
			}
		} else {
			return html`
				<div id="search-graphic">
					<lazy-img bg-size="contain" src=${assets.asset('/graphics/search.svg')}></lazy-img>
				</div>
				<p id="help">Try: <b>i/username</b> or <b>g/groupname</b></p>
			`;
		}

		return null;
	}

	helpMessage() {
		if (this.activeCommand == 'i') {
			return 'Search for an identity (Name#0000)';
		} else if (this.activeCommand == 'c') {
			return 'Search for a chat room';
		} else if (this.activeCommand == 'g') {
			return 'Search for a group';
		} else {
			return 'Searching...';
		}
	}

	focusInput() {
		if (this.input) this.input.focus();
	}

	clearSearch() {
		if (this.input) this.input.clear();

		this.resetSearch(true);
	}

	resetSearch(clearInput = false) {
		this.output.length = 0;
		this.activeCommand = null;
		this.queryInit = false;
		this.queryActive = false;
		this.selection = -1;

		if (clearInput) this.inputText = '';
	}
}

function isIdentity(item: object): item is api.identity.IdentityHandle {
	return item.hasOwnProperty('accountNumber');
}

function isGroup(item: object): item is api.group.GroupHandle {
	return !item.hasOwnProperty('accountNumber');
}

function isIdentityResponse(item: object): item is api.identity.SearchIdentitiesCommandOutput {
	return item.hasOwnProperty('identities');
}
