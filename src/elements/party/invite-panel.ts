import { customElement, property, query, queryAll } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import { cssify } from '../../utils/css';
import { repeat } from 'lit/directives/repeat.js';
import global from '../../utils/global';
import styles from './invite-panel.scss';
import TextInput from '../dev/text-input';
import { classMap } from 'lit/directives/class-map.js';
import { showIdentityContextMenu } from '../../ui/helpers';
import timing, { Debounce } from '../../utils/timing';
import * as api from '../../utils/api';
import logging from '../../utils/logging';
import assets from '../../data/assets';

@customElement('party-invite-panel')
export default class PartyInvitePanel extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	inviteToken: string = null;

	@query('text-input')
	input: TextInput;

	@property({ type: Array })
	output: api.identity.IdentityHandle[] = [];

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

	@queryAll('.identity')
	identityElements: HTMLElement[];

	@property({ type: Object })
	invitedIdentities: Set<string> = new Set();

	// === DEBOUNCE INFO ===
	searchDebounce: Debounce<(query: string) => Promise<api.identity.SearchIdentitiesCommandOutput>>;

	constructor() {
		super();

		this.searchDebounce = new Debounce({
			delay: timing.milliseconds(500),
			cb: async query => {
				return global.live.identity.searchIdentities({ query, limit: 10 });
			},
			completeCb: res => {
				this.output = res.identities.filter(i => i.identityId != global.currentIdentity.identityId);

				this.isLoading = false;
				this.queryInit = true;
			}
		});
	}

	commandKeyPress(event: KeyboardEvent) {
		let modShift = event.getModifierState('Shift');
		let modCtrl = event.getModifierState('Control');

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
			if (this.selection < 0) this.selection = this.output.length - 1;
			else if (this.selection >= this.output.length) this.selection = 0;

			// Scroll to item
			let selectedElement = this.identityElements[this.selection];
			selectedElement.scrollIntoView({
				block: 'nearest'
			});
		}
		// Select current list item
		else if (event.code == 'Enter') {
			event.preventDefault();

			this.selectItem(this.selection);

			// Special case for end of list selection
			if (this.selection >= this.output.length) this.selection--;
		}
	}

	async selectItem(index: number) {
		// Index check
		if (index == -1 || index >= this.output.length) return;

		let item = this.output[index];

		if (!this.invitedIdentities.has(item.identityId)) {
			this.invitedIdentities.add(item.identityId);

			// Send invite chat message
			try {
				await global.live.chat.sendChatMessage({
					topic: { identityId: item.identityId },
					messageBody: {
						partyInvite: {
							token: this.inviteToken
						}
					}
				});
			} catch (err) {
				logging.error(err);
				this.invitedIdentities.delete(item.identityId);
			}

			this.requestUpdate('invitedIdentities');
		}
	}

	onPointerEnterItem(index: number) {
		this.selection = index;
	}

	async commandInput(event: Event) {
		let target = event.target as HTMLInputElement;
		let input = target.value;

		this.parseCommand(input);
	}

	async parseCommand(input: string) {
		this.inputText = input;

		if (this.inputText.trim().length) {
			this.queryActive = true;
			this.isLoading = true;

			this.searchDebounce.trigger(this.inputText);
		} else {
			this.resetSearch();
			this.requestUpdate('output');
		}
	}

	render() {
		return html`
			<div id="base">
				<div id="input-area">
					<text-input
						id="main-input"
						light
						seamless
						.spellcheck=${false}
						placeholder="Search for identities..."
						@input=${this.commandInput.bind(this)}
						@keydown=${this.commandKeyPress.bind(this)}
					></text-input>
					${this.isLoading
						? html`<loading-wheel
								inline
								small
								no-fade
								message=""
								color="#151515cc"
						  ></loading-wheel>`
						: null}
				</div>
				<div id="output" class="light-scrollbar" @pointerleave=${() => (this.selection = -1)}>
					<div id="output-section">
						${repeat(
							this.output,
							i => i.identityId,
							(identity, i) => this.renderIdentity(identity, i)
						)}
					</div>

					${this.renderHelpArea()}
				</div>
			</div>
		`;
	}

	renderIdentity(identity: api.identity.IdentityHandle, index: number) {
		let invited = this.invitedIdentities.has(identity.identityId);
		let classes = classMap({
			identity: true,
			selected: this.selection == index,
			invited
		});

		return html`<a
			class=${classes}
			@click=${!invited ? this.selectItem.bind(this, index) : null}
			@contextmenu=${showIdentityContextMenu(identity)}
			@pointerenter=${this.onPointerEnterItem.bind(this, index)}
		>
			<div class="identity-content">
				<identity-avatar class="identity-thumbnail" .identity=${identity}></identity-avatar>
				<identity-name
					class="identity-label"
					no-link
					light
					show-number
					.identity=${identity}
				></identity-name>
			</div>
			<div class="identity-right">
				${invited
					? html`<e-svg src="solid/check" large></e-svg>`
					: html`<e-svg src="solid/paper-plane-top" large></e-svg>`}
			</div>
		</a>`;
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
			`;
		}

		return null;
	}

	helpMessage() {
		return 'Searching...';
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
		this.queryInit = false;
		this.queryActive = false;
		this.selection = -1;
		this.invitedIdentities.clear();

		if (clearInput) this.inputText = '';
	}
}
