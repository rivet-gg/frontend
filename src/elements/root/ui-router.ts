import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { cssify } from '../../utils/css';
import global from '../../utils/global';
import timing from '../../utils/timing';
import {
	windowEventGroups,
	bodyEventGroups,
	GlobalMobileChangeEvent,
	globalEventGroups
} from '../../utils/global-events';
import logging from '../../utils/logging';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import styles from './ui-router.scss';
import UIRoot, { MIN_SWIPE_THRESHOLD } from './ui-root';
import routes, {
	RenderResult,
	RenderResultRedirect,
	RenderResultTemplate,
	responses,
	routesArray
} from '../../routes';
import SidebarPage from '../pages/sidebar';
import { MenuItem } from '../sidebar/main-sidebar';

import * as uuid from 'uuid';

const PAGE_ANIMATION_DURATION = timing.milliseconds(250);

interface PageState {
	scrollTop: number;
}

// Options for navigating to a page
interface NavigateOpts {
	disableAnimation?: boolean; // Disabled slide animation on mobile
	replaceHistory?: boolean; // Removes the previous page in history
	pageState?: PageState; // State config
	previousPage?: RemovablePage; // Used for back navigation
	forward?: boolean; // Used for forward navigation
	forceSamePage?: boolean; // Rerenders page regardless of if its the same URL (does not imply `replaceHistory`)

	replacePage?: boolean; // Used for out of site navigations
}

// TODO: Make this a class
// Page object that is stored in the history buffer
interface RemovablePage {
	id: string;
	src: string;
	old: boolean;
	new: boolean;
	back: boolean;
	state: PageState;
	renderResult: RenderResultTemplate;
	removalTimeout?: number;
}

export class RouteChangeEvent extends Event {
	constructor(
		public title: string,
		public menuItem: MenuItem = null,
		public mobileNavStuck: boolean = null
	) {
		super('change');
	}
}

export class RouteTitleChangeEvent extends Event {
	constructor(public title: string) {
		super('title-change');
	}
}

@customElement('ui-router')
export default class UIRouter extends LitElement {
	static styles = cssify(styles);

	static shared: UIRouter;

	@property({ type: Array })
	history: RemovablePage[] = [];
	forwardsHistory: string[] = [];

	// === SIDEBAR HOMEPAGE DATA ===
	sidebarHomePage: RemovablePage;
	@query('page-sidebar')
	sidebarHome: SidebarPage;

	// === TOUCH DATA ===
	startTouch: Touch = null;
	startTouchTime: number = null;
	swipeActive = false;
	swipeDirection = 0;
	@property({ type: Number })
	touchDifferenceX: number = null;
	@property({ type: Number })
	touchDifferenceY: number = null;

	@property({ type: Number })
	windowWidth: number = null;

	@property({ type: Number })
	scrollTop = 0;

	// === EVENT HANDLERS ===
	handleResize: () => void;
	handleMobile: (e: GlobalMobileChangeEvent) => void;
	handleClick: (e: MouseEvent) => void;
	handlePopstate: (e: PopStateEvent) => void;
	handleScroll: (e: Event) => void;
	handleTouchStart: (e: TouchEvent) => void;
	handleTouchMove: (e: TouchEvent) => void;
	handleTouchEnd: (e: TouchEvent) => void;

	/*=== Navigation State ===*/
	/// Returns the full URL for the current page.
	get fullPath(): string {
		return location.href;
	}

	// Find first previous page
	get previousPage(): RemovablePage {
		for (let i = this.history.length - 1; i >= 0; i--) {
			let page = this.history[i];

			if (!page.back && page.old) return page;
		}

		return null;
	}

	// Find newest page
	get newestPage(): RemovablePage {
		for (let i = this.history.length - 1; i >= 0; i--) {
			let page = this.history[i];

			if (!page.back && page.new) return page;
		}

		return null;
	}

	/// Search params for the current URL.
	searchParams: URLSearchParams = new URLSearchParams();

	/*=== Config ===*/
	forceReloadEndpoints: string[] = ['/logout', '/login'];

	constructor() {
		super();

		// Set singleton
		UIRouter.shared = this;

		// Parse the path url
		let url = routes.sidebarHome.build({});
		let parsed = new URL(url);

		// Resolve the route
		let renderResult = this.resolveRoute(parsed.pathname, parsed.searchParams) as RenderResultTemplate;

		// Create home page and cache it
		this.sidebarHomePage = {
			renderResult: renderResult,
			src: url,
			old: false,
			new: false,
			back: false,
			state: {
				scrollTop: 0
			},
			id: uuid.v4()
		};
	}

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		this.sidebarHomePage.old = true;

		// Navigate to initial route
		this.navigate(this.fullPath, {
			replaceHistory: true,
			disableAnimation: true
		});
	}

	connectedCallback() {
		super.connectedCallback();

		// Handle resize
		this.handleResize = this.onResize.bind(this);
		windowEventGroups.add('resize', this.handleResize, timing.milliseconds(100));
		this.onResize();

		// Handle mobile
		this.handleMobile = this.onMobile.bind(this);
		globalEventGroups.add('mobile', this.handleMobile);

		// Add pop state event; this makes it so when the identity presses the back
		// button, it loads the appropriate page
		this.handlePopstate = this.onPopstate.bind(this);
		windowEventGroups.add('popstate', this.handlePopstate);

		// Establish event handlers
		this.handleScroll = this.onScroll.bind(this);
		bodyEventGroups.add('scroll', this.handleScroll);

		// Intercept all click events
		this.handleClick = this.onClick.bind(this);
		windowEventGroups.add('click', this.handleClick, {
			capture: true // Capture event before any other events
		});

		// Handle touch events
		this.handleTouchStart = this.onTouchStart.bind(this);
		windowEventGroups.add('touchstart', this.handleTouchStart);
		this.handleTouchMove = this.onTouchMove.bind(this);
		windowEventGroups.add('touchmove', this.handleTouchMove);
		this.handleTouchEnd = this.onTouchEnd.bind(this);
		windowEventGroups.add('touchend', this.handleTouchEnd);
		windowEventGroups.add('touchcancel', this.handleTouchEnd);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Remove event listeners
		windowEventGroups.remove('resize', this.handleResize, timing.milliseconds(100));
		windowEventGroups.remove('popstate', this.handlePopstate);
		windowEventGroups.remove('click', this.handleClick);
		bodyEventGroups.remove('scroll', this.handleScroll);
		globalEventGroups.remove('mobile', this.handleMobile);

		windowEventGroups.remove('touchstart', this.handleTouchStart);
		windowEventGroups.remove('touchmove', this.handleTouchMove);
		windowEventGroups.remove('touchend', this.handleTouchEnd);
		windowEventGroups.remove('touchcancel', this.handleTouchEnd);
	}

	onPopstate(event: PopStateEvent) {
		// Navigate backwards internally
		if (this.previousPage && this.previousPage.src == this.fullPath) {
			this.back();
		}
		// Navigate forwards internally
		else if (this.forwardsHistory[1] == this.fullPath) {
			this.navigate(this.fullPath, {
				pageState: event.state,
				forward: true
			});
		}
		// Weird outlier, when 2 or more pages are in the forwardsHistory array and the current page is sidebar home,
		// disable forwards navigation manually (no forwards navigation can occur from the sidebar home page)
		else if (this.sidebarHomePage.new && this.forwardsHistory[2] == this.fullPath) {
			// This code stops the forward navigation, but fails to set the tab title because setting
			// document.title too quickly after a navigation does not work
			// // Navigate to sidebar home page
			// this.navigate(this.sidebarHomePage.src, {
			// 	pageState: this.sidebarHomePage.state,
			// 	previousPage: this.sidebarHomePage
			// });
		}
		// Load event, force partial load, and send the event state
		else {
			this.navigate(this.fullPath, {
				pageState: event.state
			});
		}
	}

	onResize() {
		this.windowWidth = window.innerWidth;
	}

	// Update on mobile change
	onMobile() {
		let mobileOnly = this.newestPage
			? this.newestPage.renderResult.mobileRedirect
			: this.sidebarHomePage.new;

		// Some pages are inaccessible to desktop, navigate back to redirect if mobile change is detected
		if (!global.isMobile && mobileOnly) {
			let mobileRedirect = this.newestPage
				? this.newestPage.renderResult.mobileRedirect
				: this.sidebarHomePage.renderResult.mobileRedirect;

			this.navigate(mobileRedirect, {
				replaceHistory: true
			});
		}

		this.requestUpdate();
	}

	onTouchStart(e: TouchEvent) {
		this.startTouch = e.changedTouches[0];
		this.startTouchTime = performance.now();
		this.touchDifferenceX = 0;
		this.touchDifferenceY = 0;
	}

	onTouchMove(e: TouchEvent) {
		if (this.startTouch) {
			this.touchDifferenceX = e.changedTouches[0].pageX - this.startTouch.pageX;
			this.touchDifferenceY = e.changedTouches[0].pageY - this.startTouch.pageY;

			// If no swipe is currently active, check for swipe
			if (!this.swipeDirection) {
				let swipeLength = Math.sqrt(this.touchDifferenceX ** 2 + this.touchDifferenceY ** 2);
				let normX = Math.abs(this.touchDifferenceX / swipeLength);
				let normY = Math.abs(this.touchDifferenceY / swipeLength);

				// Check if a swipe has occurred
				if (
					Math.abs(this.touchDifferenceX) > MIN_SWIPE_THRESHOLD ||
					Math.abs(this.touchDifferenceY) > MIN_SWIPE_THRESHOLD
				) {
					// Detect page navigation swipe (right to left)
					if (normX > 0.5 && normY < 0.5 && this.sidebarHomePage.old && this.touchDifferenceX > 0) {
						this.swipeActive = true;
						this.swipeDirection = Math.sign(this.touchDifferenceX);
					}
					// Cancel swipe if vertical swipe detected
					else this.stopTouch();
				}
			}

			// Not part of the previous if statement because swipeDirection mutates
			if (this.swipeActive) {
				this.touchDifferenceX -= MIN_SWIPE_THRESHOLD * this.swipeDirection;
			}
		}
	}

	onTouchEnd(e: TouchEvent) {
		if (this.startTouch) {
			this.touchDifferenceX = e.changedTouches[0].pageX - this.startTouch.pageX;
			this.touchDifferenceY = e.changedTouches[0].pageY - this.startTouch.pageY;

			// Apply velocity to swipe
			let elapsed = Math.min(300, performance.now() - this.startTouchTime) / 300;
			let swipeX = this.touchDifferenceX / Math.max(0.2, elapsed);

			// Navigate back to the previous page
			if (swipeX > 80) this.navBack();

			this.stopTouch();
		}
	}

	stopTouch() {
		this.startTouch = null;
		this.startTouchTime = null;
		this.swipeActive = false;
		this.swipeDirection = 0;
		this.touchDifferenceX = null;
		this.touchDifferenceY = null;
	}

	onScroll() {
		// Scroll does not need to be updated on desktop
		if (global.isMobile) this.scrollTop = document.body.scrollTop;
	}

	/// Checks if a click element can redirect the page. If there is a page
	/// redirect, true is returned
	onClick(event: MouseEvent) {
		// Don't do anything if there is a modifier on the click event; this allows for the browser to handle events
		// like opening links in new tabs and other special actions
		if (event.altKey || event.metaKey || event.ctrlKey) return;

		// Check if any of the elements in the path are links
		for (let node of event.composedPath()) {
			// TODO: Polyfill composedPath
			// Assert the node is an element
			if (!(node instanceof HTMLElement)) continue;

			// Check if the given item is a link and not a download button
			if (
				node.tagName.toLowerCase() === 'a' &&
				!!node.attributes.getNamedItem('href') &&
				!node.attributes.getNamedItem('download')
			) {
				let link = node as HTMLLinkElement;

				// Attempt to load the page
				let target = link.getAttribute('target');
				if (target && target == '_blank') {
					// TODO: Does this work on Windows?
					// Meta key is down; open in new tab
					window.open(link.href, '_blank');
				} else if (target != '_self') {
					// Load in-place; note that if an error is thrown in this function, this entire callback will
					// stop and `preventDefault` will not be called, therefore causing the link to be treated normally
					// and reload the page; this is the correct behavior
					this.navigate(link.href);
				}

				// '_self' target opens a link as normal (used for downloading files)
				if (target != '_self') {
					// Prevent default action
					event.preventDefault();
					event.stopImmediatePropagation();
				}

				// Stop iterating
				break;
			}
		}
	}

	// TODO: Add router queue and change all timeouts here to `await X`
	navigate(url: string, opts?: NavigateOpts) {
		// Set default options
		opts = Object.assign(
			{
				replaceHistory: false,
				disableAnimation: false,
				pageState: null,
				previousPage: null,
				forward: false
			},
			opts
		);

		// Parse the path url
		let parsed = new URL(url);

		// Check if this page can be partially loaded; if not, open in a new tab
		if (parsed.host != location.host) {
			if (opts.replacePage) {
				location.href = url;
			} else {
				logging.event('Force navigate', url);
				window.open(url, '_blank');
			}
			return;
		}

		// Check if this page has to be force reloaded
		if (this.forceReloadEndpoints.indexOf(parsed.pathname) !== -1) {
			logging.event('Force reload', url);
			location.href = url;
			return;
		}

		// Resolve the route
		let renderResult = this.resolveRoute(parsed.pathname, parsed.searchParams);
		let newest = this.newestPage;

		// Do not navigate to page if it is mobile only, navigate to it's mobile redirect
		if (!global.isMobile && (renderResult as RenderResultTemplate).mobileRedirect) {
			let mobileRedirect = (renderResult as RenderResultTemplate).mobileRedirect;

			// Log event
			logging.event('Mobile redirect', url, '->', mobileRedirect, opts.pageState);

			opts.replaceHistory = true;
			this.navigate(mobileRedirect, opts);

			return;
		}
		// Handle redirect if needed and don't do anything else; if doesn't match, then cast to a template
		else if ((renderResult as RenderResultRedirect).redirect) {
			let redirect = (renderResult as RenderResultRedirect).redirect;

			// Log event
			logging.event('Redirect', url, '->', redirect, opts.pageState);

			opts.replaceHistory = true;
			this.navigate(redirect, opts);

			return;
		}
		// Do not do any navigation if the current page is already at the given url
		else if (newest && newest.src == url && !opts.forceSamePage) {
			return;
		}

		renderResult = renderResult as RenderResultTemplate;

		// Log event
		logging.event('Navigate', url, opts.pageState);

		let fromHome = false;

		// Hide overlays on navigation
		UIRoot.shared.closeSearchPanel();

		// Special case for navigating to the home page, no new page is created
		if (opts.previousPage == null && url == this.sidebarHomePage.src) {
			opts.previousPage = this.sidebarHomePage;
		}
		// If navigating to a new page from the home page, clear history
		else if (this.sidebarHomePage.new) {
			this.sidebarHomePage.new = false;
			this.sidebarHomePage.old = true;

			// Clear all removal timeouts to prevent error upon removing page
			this.history.forEach(page => clearTimeout(page.removalTimeout));
			this.history.length = 0;

			fromHome = true;
		}

		// Prevent adding page to history upon navigating back to previous page
		if (opts.previousPage == null) {
			// Cycle through the page list to update the very last active page
			for (let i = 0; i < this.history.length; i++) {
				// Set page to old
				if (this.history[i].new) {
					this.history[i].old = true;
					this.history[i].new = false;
					this.history[i].state = this.buildPageState();
					break;
				}
			}

			let newPage: RemovablePage = {
				renderResult: renderResult,
				src: url,
				old: false,
				new: opts.disableAnimation,
				back: opts.previousPage != null,
				state: {
					scrollTop: 0
				},
				id: uuid.v4()
			};

			// Remove previous history
			if (opts.replaceHistory) this.history.pop();
			// Add to history buffer
			this.history.push(newPage);

			this.requestUpdate('history');

			// Start the fade in animation
			setTimeout(() => {
				newPage.new = true;
				this.requestUpdate('history');
			}, timing.milliseconds(1));
		}

		// Render the page title
		let title = renderResult.title;
		let pageTitle = 'Rivet – ' + title;
		let newPageState: PageState = Object.assign(
			{ scrollTop: 0 },
			typeof opts.pageState == 'object' ? opts.pageState : {}
		);

		// Update the new (previous) page to the correct title and location
		if (opts.previousPage) {
			// Update page properties
			opts.previousPage.new = true;
			opts.previousPage.old = false;
			opts.previousPage.back = false;

			// Update title to the previous page's title. This is to ensure the correct title is shown if
			// the page itself has altered the title after the initial render
			title = opts.previousPage.renderResult.title;
			pageTitle = 'Rivet – ' + title;

			// Update history information for home page
			if (this.sidebarHomePage.new) {
				history.replaceState(newPageState, pageTitle, url);
			}

			document.title = pageTitle;

			this.requestUpdate();
		}
		// Add new page. No history manipulation is required on page forward
		else if (!opts.forward) {
			// Reset the forwards history buffer upon navigation
			this.forwardsHistory.length = 0;

			// Overwrite the current page in history. Pages that were just navigated from the home page
			// overwrite the home page in history because it should never actually be a part of the history
			// list
			if (opts.replaceHistory || fromHome) {
				history.replaceState(newPageState, pageTitle, url);
				document.title = pageTitle;
			}
			// Normal page navigation
			else {
				// Save the current scroll position
				history.replaceState(this.buildPageState(), document.title, this.fullPath);

				// Push the state
				history.pushState(newPageState, pageTitle, url);
				document.title = pageTitle;
			}
		}

		// Add this page to the forwards history
		this.forwardsHistory.unshift(url);

		// Update the state
		this.searchParams = parsed.searchParams;

		// Propagate the event up to the UI root
		let event = new RouteChangeEvent(title, renderResult.menuItem, !!renderResult.mobileNavStuck);
		this.dispatchEvent(event);

		// TODO: Propagate as event
		// Update mobile sidebar home page
		if (global.isMobile && this.sidebarHome && renderResult.menuItem)
			this.sidebarHome.activeMenu = renderResult.menuItem;

		// Scroll back to location from state
		document.body.scrollTop = newPageState.scrollTop;

		this.updateComplete.then(async () => {
			// Waiting for this makes sure that the body's scroll height is updated before setting scroll
			// position
			await this.getUpdateComplete();

			document.body.scrollTop = newPageState.scrollTop;
		});
	}

	// Used by other elements to navigate to a previous page
	navBack() {
		// Check if navigating to the home page
		if (global.isMobile && !this.canGoBack(this.getBackedPages())) this.back(true);
		else history.back();
	}

	// Used internally on all back navigations
	back(goToHome = false) {
		// Navigate back to previous page
		if (this.canGoBack() || goToHome) {
			for (let i = this.history.length - 1; i >= 0; i--) {
				let page = this.history[i];

				if (!page.back) {
					// Make the most current page set as "back" so its animation is reversed
					if (page.new) {
						page.back = true;
						page.old = true;
						page.new = false;
						page.state.scrollTop = document.body.scrollTop;

						// The sidebar home page isn't actually navigated "back" to since its page is permanently
						// loaded so no new page is needed
						if (goToHome) {
							// Navigate to sidebar home page
							this.navigate(this.sidebarHomePage.src, {
								pageState: this.sidebarHomePage.state,
								previousPage: this.sidebarHomePage
							});
							break;
						}

						// Remove current page from history after animation is over
						page.removalTimeout = window.setTimeout(() => {
							if (!this.removePage(page)) {
								logging.error(`Failed to remove page "${page.src}"`);
							}

							this.requestUpdate('history');
						}, PAGE_ANIMATION_DURATION);
					}
					// Navigate to previous page
					else if (page.old) {
						this.navigate(page.src, {
							pageState: page.state,
							previousPage: page
						});
						break;
					}
				}
			}

			// Update element
			this.requestUpdate('history');
		}
	}

	// Remove page by reference. Returns true if removal is successful
	removePage(page: RemovablePage): boolean {
		let index = this.history.indexOf(page);
		if (index != -1) {
			this.history.splice(index, 1);
			return true;
		}

		return false;
	}

	updateTitle(title: string) {
		// Update the document title
		document.title = 'Rivet – ' + title;

		// Save the title in history
		history.replaceState(this.buildPageState(), title, location.href);

		// Update latest page in history
		if (this.history.length) this.history[this.history.length - 1].renderResult.title = title;

		// Propagate the event up to the UI root
		let event = new RouteTitleChangeEvent(title);
		this.dispatchEvent(event);
	}

	reload() {
		this.navigate(this.fullPath, {});
	}

	resolveRoute(pathname: string, search: URLSearchParams): RenderResult {
		// Attempt to match the path; default to 404 if not found
		for (let route of routesArray) {
			// Attempt to match the route
			let result = route.pathRegex.exec(pathname);
			if (!result) continue;

			// Build the params
			let params: { [key: string]: string } = {};
			for (let i = 1; i < result.length; i++) {
				let key = route.pathKeys[i - 1]; // Regex group starts at 1, while keys start at 0
				params[key.name] = result[i] != undefined ? decodeURIComponent(result[i]) : undefined;
			}

			// Return the result
			return route.render(params, Object.fromEntries(search.entries()));
		}

		// Return 404
		return responses.notFound();
	}

	buildPageState(): PageState {
		return {
			scrollTop: document.body.scrollTop
		};
	}

	// Checks if there are any rivet pages to navigate back to
	canGoBack(searchSize = 0): boolean {
		return this.history.length > searchSize + 1; // Current path is always present
	}

	// Count how many pages are currently in a back animation
	getBackedPages(): number {
		for (let i = this.history.length - 1; i >= 0; i--) {
			if (!this.history[i].back) return this.history.length - i - 1;
		}

		return this.history.length;
	}

	render() {
		// Create touch classes
		let baseClasses = classMap({
			mobile: global.isMobile,
			notouch: !this.swipeActive
		});

		// Clone the page history list so it will not be mutated
		let pageList = [...this.history];
		// Count how many back animation pages there are (used for animation purposes)
		let backedPages = this.getBackedPages();

		// Add the sidebar home page to the page list
		if (global.isMobile && (this.sidebarHomePage.old || this.sidebarHomePage.new)) {
			pageList.unshift(this.sidebarHomePage);
		}

		if (!global.isMobile) {
			let newestPage = pageList[pageList.length - 1];

			if (!newestPage) return html`<div id="base" class=${baseClasses}></div>`;

			// Create class map
			let classes = classMap({
				page: true,
				old: newestPage.old,
				new: newestPage.new,
				back: newestPage.back,
				home: newestPage == this.sidebarHomePage
			});

			// Create style map (includes touch drag translation)
			let xPageTransform = this.getXPageTransform(newestPage);
			let style = styleMap({
				transform: xPageTransform !== null ? `translateX(${xPageTransform}px)` : null
			});

			// Position old pages in the proper y-pos based on scroll
			let scrollStyle = styleMap({
				transform: newestPage.old
					? `translateY(${-newestPage.state.scrollTop + this.scrollTop}px)`
					: null
			});

			// Two divs are used here because you cannot animate separate transform properties in
			// css separately
			return html`<div id="base" class=${baseClasses}>
				<div class=${classes} style=${style}>
					<div class="y-scroll" style=${scrollStyle}>${newestPage.renderResult.template}</div>
				</div>
			</div>`;
		} else {
			return html` <div id="base" class=${baseClasses}>
				${repeat(
					pageList,
					p => p.id,
					(p, i) => {
						// Do not render pages that are too far back in the history
						if (i < this.history.length - (backedPages + 2)) return null;

						// Do not render the home page unless there are no pages left
						if (p == this.sidebarHomePage && this.canGoBack(backedPages)) return null;

						// Create class map
						let classes = classMap({
							page: true,
							old: p.old,
							new: p.new,
							back: p.back,
							home: p == this.sidebarHomePage
						});

						// Create style map (includes touch drag translation)
						let xPageTransform = this.getXPageTransform(p);
						let style = styleMap({
							transform: xPageTransform !== null ? `translateX(${xPageTransform}px)` : null
						});

						// Position old pages in the proper y-pos based on scroll
						let scrollStyle = styleMap({
							transform: p.old ? `translateY(${-p.state.scrollTop + this.scrollTop}px)` : null
						});

						// Two divs are used here because you cannot animate separate transform properties in
						// css separately
						return html` <div class=${classes} style=${style}>
							<div class="y-scroll" style=${scrollStyle}>${p.renderResult.template}</div>
						</div>`;
					}
				)}
			</div>`;
		}
	}

	getXPageTransform(page: RemovablePage) {
		// No transformation needed if no swipe is happening
		if (!this.swipeActive) {
			return null;
		} else {
			// Transformation for old pages
			if (page.old) {
				// Page is navigating back
				if (page.back) return null;
				else
					return (
						Math.min(0, Math.max(-this.windowWidth, this.touchDifferenceX - this.windowWidth)) / 4
					);
			}
			// Transformation for new pages
			else if (page.new) {
				return Math.min(this.windowWidth, Math.max(0, this.touchDifferenceX));
			}
		}

		// Pages can be neither old nor new during the first 10ms for animation starting purposes
		return null;
	}
}
