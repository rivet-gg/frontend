import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import timing from '../../utils/timing';
import { windowEventGroups } from '../../utils/global-events';
import logging from '../../utils/logging';
import { classMap } from 'lit/directives/class-map.js';
import styles from './rvt-router.scss';
import routes, {
	RenderResult,
	RenderResultRedirect,
	RenderResultTemplate,
	responses,
	routesArray
} from '../../routes';

import * as uuid from 'uuid';
import { Breadcrumb } from '../common/rvt-nav';

interface PageState {
	scrollTop: number;
}

// Options for navigating to a page
interface NavigateOpts {
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
		public breadcrumb: Breadcrumb = undefined
	) {
		super('change');
	}
}

export class RouteTitleChangeEvent extends Event {
	constructor(public title: string) {
		super('title-change');
	}
}

@customElement('rvt-router')
export default class RvtRouter extends LitElement {
	static styles = cssify(styles);

	static shared: RvtRouter;

	@property({ type: Array })
	history: RemovablePage[] = [];
	forwardsHistory: string[] = [];

	@property({ type: Number })
	windowWidth: number = null;

	@property({ type: Number })
	scrollTop = 0;

	// === EVENT HANDLERS ===
	handleResize: () => void;
	handleClick: (e: MouseEvent) => void;
	handlePopstate: (e: PopStateEvent) => void;
	handleScroll: (e: Event) => void;

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
		RvtRouter.shared = this;

		// Parse the path url
		let url = routes.home.build({});
		let parsed = new URL(url);

		// Resolve the route
		let renderResult = this.resolveRoute(parsed.pathname, parsed.searchParams) as RenderResultTemplate;
	}

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		// Navigate to initial route
		this.navigate(this.fullPath, {
			replaceHistory: true
		});
	}

	connectedCallback() {
		super.connectedCallback();

		// Handle resize
		this.handleResize = this.onResize.bind(this);
		windowEventGroups.add('resize', this.handleResize, timing.milliseconds(100));
		this.onResize();

		// Add pop state event; this makes it so when the identity presses the back
		// button, it loads the appropriate page
		this.handlePopstate = this.onPopstate.bind(this);
		windowEventGroups.add('popstate', this.handlePopstate);

		// Intercept all click events
		this.handleClick = this.onClick.bind(this);
		windowEventGroups.add('click', this.handleClick, {
			capture: true // Capture event before any other events
		});
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Remove event listeners
		windowEventGroups.remove('resize', this.handleResize, timing.milliseconds(100));
		windowEventGroups.remove('popstate', this.handlePopstate);
		windowEventGroups.remove('click', this.handleClick);
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
		// Handle redirect if needed and don't do anything else; if doesn't match, then cast to a template
		if ((renderResult as RenderResultRedirect).redirect) {
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

		// Prevent adding page to history upon navigating back to previous page
		if (opts.previousPage == null) {
			// Cycle through the page list to update the very last active page
			for (let i = 0; i < this.history.length; i++) {
				// Set page to old
				if (this.history[i].new) {
					this.history[i].old = true;
					this.history[i].new = false;
					this.history[i].state = this.buildPageState();
					if (this.history.length > 0) {
						if (!this.removePage(this.history[i])) {
							logging.error(`Failed to remove page "${this.history[i].src}"`);
						}
					}
					break;
				}
			}

			let newPage: RemovablePage = {
				renderResult: renderResult,
				src: url,
				old: false,
				new: false,
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
		let event = new RouteChangeEvent(title, renderResult.breadcrumb);
		this.dispatchEvent(event);

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
		history.back();
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

						if (!this.removePage(page)) {
							logging.error(`Failed to remove page "${page.src}"`);
						}
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

	resolveRoute(pathname: string, searchParams: URLSearchParams): RenderResult {
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

			let search = Object.fromEntries(searchParams.entries());
			// return early if one of the middlewares returns a result
			for (let middleware of route.middlewaresCreator()) {
				let result = middleware(params, search);
				if (result) return result;
			}

			// Return the result
			return route.render(params, search);
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
		// Clone the page history list so it will not be mutated
		let pageList = [...this.history];

		let newestPage = pageList[pageList.length - 1];

		if (!newestPage) return html``;

		// Create class map
		let classes = classMap({
			page: true,
			old: newestPage.old,
			new: newestPage.new,
			back: newestPage.back,
			first: pageList.length == 1
		});

		return html`<div class="${classes} h-full">${newestPage.renderResult.template}</div> `;
	}
}
