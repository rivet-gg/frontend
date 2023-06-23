import { customElement, property, query } from 'lit/decorators.js';
import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import { repeat } from 'lit/directives/repeat.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { cssify } from '../../utils/css';
import global, { GlobalStatus } from '../../utils/global';
import {
	globalEventGroups,
	GlobalMobileChangeEvent,
	windowEventGroups,
	GlobalStatusChangeEvent
} from '../../utils/global-events';
import timing from '../../utils/timing';
import styles from './ui-root.scss';
import UIRouter, { RouteChangeEvent, RouteTitleChangeEvent } from './ui-router';
import EmojiPicker, { EmojiItemData, EmojiSelectEvent } from '../overlay/emoji-picker';
import { AlertOption } from '../overlay/alert-panel';
import { ActionSheetItem } from '../overlay/action-sheet';
import { showAlert } from '../../ui/helpers';
import { MenuItem } from '../sidebar/main-sidebar';
import SearchPanel from '../overlay/search-panel';
import * as api from '../../utils/api';
import RegisterPanel from '../overlay/register-panel';
import config from '../../config';
import { HookFetch } from '../../utils/fetch-hook';
import { DeferredStageEvent, Stage } from '../pages/link-game';
import StylizedButton from '../common/stylized-button';
import { Orientation, Alignment } from '../common/overlay-positioning';
import { DropDownSelectEvent, DropDownSelection } from '../dev/drop-down-list';

export const MIN_SWIPE_THRESHOLD = 10;
const TRANSITION_LENGTH = timing.milliseconds(200); // Match with consts.scss/$transition-length

interface EmojiPickerData {
	contextElement: HTMLElement;
	cb: (item: EmojiItemData) => void;
	active: boolean;
}

export interface AlertPanelData {
	title: string;
	details: TemplateResult;
	options: AlertOption[];
	noDimClose?: boolean; // Disable closing the alert panel by clicking outside of the modal
	active: boolean;
}

interface ActionSheetData {
	contextElement: HTMLElement;
	options: ActionSheetItem[];
	active: boolean;
}

// Enables which item to search for in the search panel
interface SearchPanelFilter {
	identities?: boolean;
	games?: boolean;
	chats?: boolean;
	groups?: boolean;
}

// Options for showing the search panel (with `helpers.showSearchPanel`).
export interface SearchPanelData {
	filter: SearchPanelFilter;
	selectionCb?: (item: api.identity.IdentityHandle | api.group.GroupHandle) => void;
	active: boolean;
}

interface TooltipData {
	contextElement: HTMLElement;
	text: string;
	active: boolean;
}

interface ContextMenuData {
	x: number;
	y: number;
	contextElement: HTMLElement;
	content: TemplateResult;
	orientation: Orientation;
	active: boolean;
}

interface DropDownListData<T> {
	contextElement: HTMLElement;
	active: boolean;
	fixed: boolean;
	orientation: Orientation;
	options: DropDownSelection<T>[];
	light: boolean;
	selection: DropDownSelection<T>;
	selectionCb: (event: DropDownSelectEvent<T>) => void;
	bgColor: string;
	highlightColor: string;
}

@customElement('ui-root')
export default class UIRoot extends LitElement {
	static styles = cssify(styles);

	static shared: UIRoot;

	// === COMPONENTS ===
	@query('ui-router')
	router: UIRouter;

	// @query('game-container')
	// gameContainer: GameContainer; // `global.playingGame` should be used instead if not doing UI-related work

	@query('emoji-picker')
	emojiPicker: EmojiPicker;

	@query('search-panel')
	searchPanel: SearchPanel;

	@query('register-panel')
	registerPanel: RegisterPanel;

	// === DATA ==
	@property({ type: Number })
	globalStatus: GlobalStatus = GlobalStatus.Loading;

	@property({ type: Object })
	playingGameData?: api.identity.GameHandle = null;

	@property({ type: Object })
	emojiPickerData: EmojiPickerData = { contextElement: null, cb: null, active: false };

	@property({ type: Object })
	alertPanelData: AlertPanelData = { title: '', details: null, options: [], active: false };

	@property({ type: Object })
	actionSheetData: ActionSheetData = { contextElement: null, options: [], active: false };

	@property({ type: Object })
	tooltipData: TooltipData = { contextElement: null, text: '', active: false };

	@property({ type: Object })
	contextMenuData: ContextMenuData = {
		x: 0,
		y: 0,
		contextElement: null,
		content: null,
		orientation: Orientation.TopLeft,
		active: false
	};

	@property({ type: Object })
	searchPanelData: SearchPanelData = { filter: null, active: false };

	@property({ type: Object })
	dropDownListData: DropDownListData<any> = {
		contextElement: null,
		active: false,
		fixed: false,
		orientation: Orientation.TopLeft,
		options: [],
		light: false,
		selection: null,
		selectionCb: null,
		bgColor: null,
		highlightColor: null
	};

	@property({ type: Object })
	windowSize: { width: number; height: number } = { width: window.innerWidth, height: window.innerHeight };

	@property({ type: Object })
	activeMenu: MenuItem;

	@property({ type: String })
	routeTitle = '';

	@property({ type: Boolean })
	mobileNavStuck = false;

	@property({ type: Boolean })
	registerPanelActive = false;

	@property({ type: Boolean })
	onHomePage = false;

	// True when the user selects "register" instead of "continue as guest" on the link page
	@property({ type: Number })
	deferredLinkGameStage: Stage = null;

	turnstileWidgetId: string = null;

	// === MEDIA DATA ===
	@property({ type: Boolean })
	isMediaMinimized = false; // If the media is in PiP

	// === EVENT HANDLERS ===
	handleStatusChange: (e: GlobalStatusChangeEvent) => void;
	handleResize: () => void;
	handleKeyDown: (e: KeyboardEvent) => void;
	handleMobile: (e: GlobalMobileChangeEvent) => void;

	// === DEBUG ===
	@property({ type: Object })
	inFlightRequests!: Map<number, URL>;

	/// If there is any media being displayed on the screen.
	get isViewingMedia(): boolean {
		return !!this.playingGameData;
	}

	/// If rendering fullscreen and there's media actually being rendered.
	get isRenderedFullscreen(): boolean {
		return this.isViewingMedia && !this.isMediaMinimized;
	}

	constructor() {
		super();

		// Set singleton
		if (UIRoot.shared != null) throw new Error('UIRoot.shared has already been set.');
		UIRoot.shared = this;

		// Hook in to fetch events
		if (!config.IS_PROD) {
			new HookFetch(inFlight => (this.inFlightRequests = inFlight));
		}
	}

	beforeUnload(event: BeforeUnloadEvent) {
		event.returnValue = 'Are you sure you want to leave?';
	}

	// === LIFECYCLE ===
	connectedCallback() {
		super.connectedCallback();

		// Handle status change
		this.handleStatusChange = this.onStatusChange.bind(this);
		globalEventGroups.add('status-change', this.handleStatusChange);

		// Handle resize
		this.handleResize = this.onResize.bind(this);
		windowEventGroups.add('resize', this.handleResize, timing.milliseconds(100));
		this.onResize();

		// Handle key down
		this.handleKeyDown = this.onKeyDown.bind(this);
		windowEventGroups.add('keydown', this.handleKeyDown);

		// Handle mobile detection
		this.handleMobile = this.onMobile.bind(this);
		globalEventGroups.add('mobile', this.handleMobile);
		this.onMobile();
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// TODO: Stop listening to live events

		// Remove event listeners
		globalEventGroups.remove('status-change', this.handleStatusChange);
		windowEventGroups.remove('resize', this.handleResize, timing.milliseconds(100));
		windowEventGroups.remove('keydown', this.handleKeyDown);
		globalEventGroups.remove('mobile', this.handleMobile);

		if (this.playingGameData !== null) windowEventGroups.remove('beforeunload', this.beforeUnload);
	}

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		// Update media state if any of the properties changed
		let updateMediaProps = ['playingGameData', 'isMediaMinimized'];
		if (updateMediaProps.filter(k => changedProperties.has(k)).length > 0) {
			this.updateMediaState();
		}
	}

	// === GAME EVENTS ===
	/// Create a game container and optionally redirect to the game page.
	playGame(game: api.portal.GameProfile) {
		// TODO: Track game sessions on live server
		// TODO: Set global.playingGame
		windowEventGroups.add('beforeunload', this.beforeUnload);

		// Check if the game is already being played
		if (this.playingGameData && this.playingGameData.gameId == game.gameId) {
			// Expand the game if playing the game that's already being played
			this.isMediaMinimized = false;
			this.requestUpdate('playingGame');
		} else if (this.playingGameData != null) {
			// Confirm the player wants to leave the game
			showAlert(
				`Are you sure you want to leave ${this.playingGameData.displayName}?`,
				html`All progress will be lost.`,
				[
					{ label: 'Cancel' },
					{
						label: `Leave`,
						destructive: true,
						cb: () => {
							// Close the old game
							this.closeGame();

							// Play the game
							this.playGame(game);
						}
					}
				]
			);
		} else {
			// Set the playing game
			global.setPlayingGame(game);

			// Update the state
			this.isMediaMinimized = false;
			this.playingGameData = game;

			// Open game in new tab
			window.open(game.url, '_blank');
		}
	}

	/// Closes the current game.
	closeGame() {
		if (this.playingGameData === null) return;

		// Stop playing game
		global.setPlayingGame(null);

		// Update the state
		this.playingGameData = null;

		// Remove "confirm leave" event listener
		windowEventGroups.remove('beforeunload', this.beforeUnload);
	}

	// === STATE MANAGEMENT ===
	public openEmojiPicker(data: EmojiPickerData) {
		this.emojiPickerData = data;
	}

	public closeEmojiPicker() {
		this.emojiPickerData.active = false;
		this.requestUpdate('emojiPickerData');
	}

	public showAlertPanel(data?: AlertPanelData) {
		this.alertPanelData = data;
	}

	public hideAlertPanel() {
		globalEventGroups.dispatch('alert-panel-close', false);
		this.alertPanelData.active = false;
		this.requestUpdate('alertPanelData');
	}

	public showActionSheet(data: ActionSheetData) {
		this.actionSheetData = data;
	}

	public hideActionSheet() {
		this.actionSheetData.active = false;
		this.requestUpdate('actionSheetData');
	}

	public showTooltip(contextElement: HTMLElement, text: string) {
		this.tooltipData = {
			contextElement,
			text,
			active: true
		};
	}

	public hideTooltip() {
		if (!this.tooltipData.active) return;

		this.tooltipData.active = false;
		this.requestUpdate('tooltipData');
	}

	public showContextMenu(
		contextElement: HTMLElement,
		x: number,
		y: number,
		content: TemplateResult,
		orientation: Orientation = Orientation.TopLeft
	) {
		this.contextMenuData = {
			x: Math.round(x),
			y: Math.round(y),
			contextElement,
			content,
			orientation,
			active: true
		};
	}

	public hideContextMenu() {
		if (!this.contextMenuData.active) return;

		this.contextMenuData.active = false;
		this.requestUpdate('contextMenuData');
	}

	public openDropDownList<T>(data: DropDownListData<T>) {
		this.dropDownListData = data;
	}

	public closeDropDownList() {
		this.dropDownListData.active = false;
		this.requestUpdate('dropDownListData');
	}

	// === MEDIA MANAGEMENT ===
	attemptCloseMedia() {
		// Skip if not playing game
		if (!this.playingGameData) return;

		// Build alert data
		let options: AlertOption[] = [
			{ label: 'Cancel' },
			{ label: 'Leave', destructive: true, cb: () => this.closeGame() }
		];

		// Confirm leaving the game
		showAlert(
			`Are you sure you want to leave ${this.playingGameData.displayName}?`,
			html`All progress will be lost.`,
			options
		);
	}

	toggleMinimize(active: boolean) {
		// Update state
		this.isMediaMinimized = active;
	}

	updateMediaState() {
		// Reset minimized if needed
		if (this.isMediaMinimized && !this.isViewingMedia) {
			this.isMediaMinimized = false;
		}
	}

	onStatusChange(e: GlobalStatusChangeEvent) {
		this.globalStatus = e.value;
	}

	onResize() {
		// Update pip window size
		this.windowSize.width = window.innerWidth;
		this.windowSize.height = window.innerHeight;
		this.requestUpdate('windowSize');

		// Turn off the emoji picker, tooltip, and context menu on resize
		this.closeEmojiPicker();
		this.hideContextMenu();
		this.hideActionSheet();
		this.hideTooltip();
	}

	onKeyDown(event: KeyboardEvent) {
		// Close overlays
		if (event.code == 'Escape') {
			// Alert panel takes precedence over search panel
			if (this.contextMenuData.active) {
				this.hideContextMenu();
			} else if (this.alertPanelData.active) {
				this.hideAlertPanel();
			} else if (this.searchPanelData.active) {
				this.closeSearchPanel();
			}
		}
	}

	// Update on mobile change
	onMobile() {
		document.body.classList.toggle('has-scrollbar', !global.isMobile);

		this.requestUpdate();
	}

	onEmojiSelect(event: EmojiSelectEvent) {
		if (!this.emojiPickerData) return;

		// Call callback
		this.emojiPickerData.cb(event.item);

		// Hide picker
		this.emojiPickerData.active = false;
	}

	onRouteChange(event: RouteChangeEvent) {
		// Update sidebar
		this.activeMenu = event.menuItem;

		this.onHomePage = event.title == 'Home';

		if (event.mobileNavStuck !== null) {
			this.mobileNavStuck = event.mobileNavStuck;
			this.routeTitle = event.title;
		}

		// Update title name after the page animation is complete
		setTimeout(() => {
			this.routeTitle = event.title;
		}, TRANSITION_LENGTH);

		// Hide overlay and set media to minimized
		this.toggleMinimize(true);

		// Hide context menu
		this.hideContextMenu();
	}

	onTitleChange(event: RouteTitleChangeEvent) {
		// Update title name after the page animation is complete
		setTimeout(() => {
			this.routeTitle = event.title;
		}, TRANSITION_LENGTH);
	}

	openSearchPanel(data: SearchPanelData) {
		this.searchPanelData = data;

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the body's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			this.searchPanel.focusInput();
		});
	}

	closeSearchPanel() {
		this.searchPanelData.active = false;
		this.requestUpdate('searchPanelData');

		// Clear after animation is complete
		setTimeout(() => {
			if (this.searchPanel) {
				this.searchPanel.clearSearch();
			}
		}, timing.milliseconds(300));
	}

	openRegisterPanel() {
		this.registerPanelActive = true;

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the body's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			this.registerPanel.focusInput();
		});
	}

	closeRegisterPanel() {
		this.registerPanelActive = false;

		// Clear after animation is complete
		setTimeout(() => {
			if (this.searchPanel) this.registerPanel.resetRegister();
		}, timing.milliseconds(300));
	}

	// Manage loading status
	hideLoading() {
		document.getElementById('loading').classList.add('hidden');
	}

	showLoading() {
		document.getElementById('loading').classList.remove('hidden');
	}

	openCaptcha(cb: (token: string) => void, errCb?: (err: Error) => void) {
		let element: HTMLElement = document.body.querySelector('#turnstile');

		if (element) {
			element.style.removeProperty('display');
		} else {
			element = document.createElement('div');
			element.setAttribute('id', 'turnstile');
			element.addEventListener('click', e => {
				if (e.target === e.currentTarget) this.closeCaptcha();
			});

			let cancel = new StylizedButton();
			cancel.addEventListener('click', this.closeCaptcha.bind(this));
			cancel.append(document.createTextNode('Cancel'));
			element.append(cancel);

			document.body.append(element);
		}

		this.turnstileWidgetId = turnstile.render(element, {
			sitekey: config.IS_PROD ? '0x4AAAAAAABeRY1vaJVtjfBV' : '1x00000000000000000000AA',
			callback: cb,
			'error-callback': errCb
		});
	}

	closeCaptcha() {
		let element: HTMLElement = document.body.querySelector('#turnstile');

		if (element) {
			element.style.setProperty('display', 'none');
			turnstile.remove(this.turnstileWidgetId);
		}
	}

	// === RENDER ===
	render() {
		let content = null;

		// NOTE: Game link page has own flow
		if (
			window.location.pathname.startsWith('/link/') &&
			(this.globalStatus == GlobalStatus.Consenting ||
				this.globalStatus == GlobalStatus.Connected ||
				this.globalStatus == GlobalStatus.Reconnecting)
		) {
			this.hideLoading();

			let token = window.location.pathname.split('/')[2];
			content = html`
				<page-link-game
					.token=${token}
					.initStage=${ifDefined(this.deferredLinkGameStage)}
					@deferred-stage=${(e: DeferredStageEvent) => (this.deferredLinkGameStage = e.stage)}
				></page-link-game>
				${this.renderBasicOverlays()}
			`;
		} else {
			switch (this.globalStatus) {
				// Loading
				case GlobalStatus.Loading:
				case GlobalStatus.Authenticating:
					this.showLoading();
					break;

				// Interactive
				case GlobalStatus.Consenting:
					this.hideLoading();
					content = html`<page-consent></page-consent>`;
					break;
				case GlobalStatus.Connected:
				case GlobalStatus.Reconnecting:
					// Continue as normal
					this.hideLoading();
					content = this.renderContent();
					break;

				// Failures
				case GlobalStatus.AuthFailed:
					this.showLoading();
					break;
			}
		}

		return html`
			<!-- Debug -->
			${when(!config.IS_PROD, () => this.renderDebug())}

			<!-- Content -->
			${content}
		`;
	}

	renderDebug() {
		let inFlightHostCounts = [...this.inFlightRequests.values()].reduce((prev, curr) => {
			let key = curr.host;
			prev.set(key, (prev.get(key) ?? 0) + 1);
			return prev;
		}, new Map<string, number>());
		let inFlightHostCountsSorted = [...inFlightHostCounts].sort((a, b) => b[1] - a[1]);

		return html`
			<div id="debug">
				<div id="build-info">
					${config.RIVET_NAMESPACE ?? 'unknown'} &mdash; ${config.GIT_BRANCH} &mdash;
					${config.GIT_COMMIT.substring(0, 8)}
				</div>

				<div id="in-flight-requests">
					<ul>
						${repeat(
							inFlightHostCountsSorted,
							x => x[0],
							x => {
								return html`<li class="${classMap({ error: x[1] > 3 })}">
									${x[0]}: <span>${x[1]}</span>
								</li>`;
							}
						)}
					</ul>
				</div>
			</div>
		`;
	}

	renderContent() {
		// Calculated layout properties
		let fullWidth = window.innerWidth;
		let fullHeight = window.innerHeight;

		// Calculate PiP scaling
		let scalePercent = 1;
		let offsetRight = 0;
		let offsetBottom = 0;
		if (this.isMediaMinimized) {
			// Scale to mini tile
			let targetWidth = 400;
			let targetHeight = 300;
			scalePercent = Math.min(targetWidth / fullWidth, targetHeight / fullHeight);

			// Offset from the sides
			offsetRight = 16;
			offsetBottom = 16;
		}

		// Scale width and height
		let scaledWidth = Math.round(fullWidth * scalePercent);
		let scaledHeight = Math.round(fullHeight * scalePercent);

		return html`
			<!-- Mobile Navigation -->
			${when(
				global.isMobile,
				() => html`<mobile-nav .title=${this.routeTitle} .stuck=${this.mobileNavStuck}></mobile-nav>`
			)}

			<!-- Page Body -->
			<div id="content-holder" class=${classMap({ mobile: global.isMobile })}>
				<ui-router
					@change=${this.onRouteChange.bind(this)}
					@title-change=${this.onTitleChange.bind(this)}
				></ui-router>
			</div>

			<!-- Media -->
			<div
				id="media-holder"
				class=${classMap({ minimize: this.isMediaMinimized })}
				style=${styleMap({
					width: `${scaledWidth}px`,
					height: `${scaledHeight}px`,
					right: `${offsetRight}px`,
					bottom: `${offsetBottom}px`
				})}
			>
				<!-- PiP Content -->
				<!-- <div
					id="media-content"
					style=${styleMap({
					width: `${fullWidth}px`,
					height: `${fullHeight}px`,
					transform: scalePercent != 1 ? `scale(${scalePercent.toFixed(3)})` : null
				})}
				>
					${when(
					this.playingGameData,
					() => html`<game-container
						.game=${this.playingGameData}
						?minimized=${this.isMediaMinimized}
					></game-container>`
				)}
				</div> -->

				<!-- Minimized Overlay -->
				<!-- <div id="minimized-overlay" @mousedown=${this.toggleMinimize.bind(this, false)}>
					<div>Expand</div>
					<icon-button
						class="close-button"
						src="regular/circle-xmark"
						smaller
						.trigger=${this.attemptCloseMedia.bind(this)}
					></icon-button>
				</div> -->
			</div>

			<!-- Sidebar -->
			${when(
				!global.isMobile,
				() => html`<main-sidebar
					.activeMenu=${this.activeMenu}
					.onHomePage=${this.onHomePage}
				></main-sidebar>`
			)}

			<!-- Interactable Overlays -->
			<overlay-positioning
				.active=${this.emojiPickerData.active}
				.contextElement=${this.emojiPickerData.contextElement}
				.orientation=${Orientation.BottomCenter}
				@close=${this.closeEmojiPicker.bind(this)}
				scale-animation
				offset-y="-5"
			>
				<emoji-picker @select=${this.onEmojiSelect.bind(this)}></emoji-picker>
			</overlay-positioning>

			<!-- Search overlay -->
			<drop-down-modal
				.active=${this.searchPanelData.active}
				@close=${this.closeSearchPanel.bind(this)}
			>
				<modal-body slot="body">
					<search-panel .options=${this.searchPanelData}></search-panel>
				</modal-body>
			</drop-down-modal>

			<!-- Register overlay -->
			<drop-down-modal .active=${this.registerPanelActive} @close=${this.closeRegisterPanel.bind(this)}>
				<modal-body slot="body">
					<register-panel light @close=${this.closeRegisterPanel.bind(this)}></register-panel>
				</modal-body>
			</drop-down-modal>

			<overlay-positioning
				.active=${this.dropDownListData.active}
				.contextElement=${this.dropDownListData.contextElement}
				.orientation=${this.dropDownListData.orientation}
				.alignment=${Alignment.Corner}
				.fadeAnimation=${false}
				@close=${this.closeDropDownList.bind(this)}
			>
				<drop-down-list
					overlay
					.selection=${this.dropDownListData.selection}
					.options=${this.dropDownListData.options}
					?fixed=${this.dropDownListData.fixed}
					.light=${this.dropDownListData.light}
					.bgColor=${this.dropDownListData.bgColor}
					.highlightColor=${this.dropDownListData.highlightColor}
					@select=${this.dropDownListData.selectionCb}
					@close=${this.closeDropDownList.bind(this)}
				></drop-down-list>
			</overlay-positioning>

			${this.renderBasicOverlays()}
		`;
	}

	renderBasicOverlays() {
		return html`<!-- Alert overlay -->
			<drop-down-modal
				.active=${this.alertPanelData.active}
				.no-dim-close=${this.alertPanelData && this.alertPanelData.noDimClose}
				@close=${this.hideAlertPanel.bind(this)}
			>
				<modal-body slot="body">
					<alert-panel
						.data=${this.alertPanelData}
						@select=${this.hideAlertPanel.bind(this)}
					></alert-panel>
				</modal-body>
			</drop-down-modal>

			<overlay-positioning
				.active=${this.actionSheetData.active}
				.contextElement=${this.actionSheetData.contextElement}
				.orientation=${Orientation.TopCenter}
				scale-animation
				offset-y="5"
				@close=${this.hideActionSheet.bind(this)}
			>
				<action-sheet
					.options=${this.actionSheetData.options}
					@select=${this.hideActionSheet.bind(this)}
				></action-sheet>
			</overlay-positioning>

			<!-- Notification Layer -->
			<notification-overlay></notification-overlay>

			<!-- Tooltip -->
			${when(
				!global.isMobile,
				() => html`<overlay-positioning
					.active=${this.tooltipData.active}
					.contextElement=${this.tooltipData.contextElement}
					.orientation=${Orientation.TopCenter}
					@close=${this.hideTooltip.bind(this)}
					no-pointer
					scale-animation
					offset-y="5"
				>
					<div id="tooltip">${this.tooltipData.text}</div>
				</overlay-positioning>`
			)}

			<!-- Context menu -->
			<overlay-positioning
				manual
				.active=${this.contextMenuData.active}
				.anchorX=${this.contextMenuData.x}
				.anchorY=${this.contextMenuData.y}
				.contextElement=${this.contextMenuData.contextElement}
				.orientation=${this.contextMenuData.orientation}
				@close=${this.hideContextMenu.bind(this)}
			>
				${this.contextMenuData.content}
			</overlay-positioning>`;
	}
}
