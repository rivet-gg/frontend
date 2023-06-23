import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { cssify } from '../../utils/css';
import timing from '../../utils/timing';
import { windowEventGroups, bodyEventGroups } from '../../utils/global-events';
import styles from './arcade-feed.scss';
import { responses } from '../../routes';
import { showIdentityContextMenu } from '../../ui/helpers';
import * as api from '../../utils/api';

@customElement('arcade-feed')
export default class ArcadeFeed extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	loadError?: any = null;

	// Event listeners
	feedStream?: api.RepeatingRequest<void>;
	feedIdentities: api.identity.IdentityHandle[] = [];

	swapPosition = false;
	oldScrollTop = 0;
	feedMargin = 0;
	oldOffsetTop = 0;
	movingDown = true;

	@query('#base')
	baseElement: HTMLElement;

	// === EVENT HANDLERS ===
	handleResize: () => void;
	handleScroll: () => void;

	firstUpdated(changedProperties: PropertyValues) {
		super.firstUpdated(changedProperties);

		// Fetch events
		// this.feedStream = new api.RepeatingRequest(async (abortSignal, watchIndex) => {
		// 	return await global.live.portal.getArcadeFeed({ watchIndex }, { abortSignal });
		// });

		// this.feedStream.onMessage(res => {
		// 	this.feedIdentities = res.identities;
		// 	this.requestUpdate('feedIdentities');
		// });

		// this.feedStream.onError(err => {
		// 	this.loadError = err;
		// });
	}

	connectedCallback() {
		super.connectedCallback();

		// Establish event handlers
		this.handleResize = this.onResize.bind(this);
		windowEventGroups.add('resize', this.handleResize, timing.milliseconds(100));
		this.handleScroll = this.onScroll.bind(this);
		bodyEventGroups.add('scroll', this.handleScroll);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Dispose of the event listeners
		if (this.feedStream) this.feedStream.cancel();
		windowEventGroups.remove('resize', this.handleResize, timing.milliseconds(100));
		bodyEventGroups.remove('scroll', this.handleScroll);
	}

	onResize() {
		this.movingDown = true;
		this.onScroll();
	}

	onScroll() {
		// Check if scroll direction changed
		this.swapPosition = this.oldScrollTop > document.body.scrollTop;
		this.oldScrollTop = document.body.scrollTop;

		// Check if scrolling down
		if (this.movingDown) {
			// Update margin if sticky base block started to stick again
			if (this.baseElement.offsetTop < this.oldOffsetTop) {
				this.movingDown = false;
				// Alter the size of the margin block
				this.feedMargin = this.baseElement.offsetTop;
			}
		}
		// Check if scrolling up
		else {
			// Update margin if sticky base block started to stick again
			if (this.baseElement.offsetTop > this.oldOffsetTop) {
				this.movingDown = true;
				this.feedMargin = this.baseElement.offsetTop;
			}
		}

		// Update old reference
		this.oldOffsetTop = this.baseElement.offsetTop;

		// Update feed
		this.requestUpdate('feedMargin');
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		// Determine how much scroll is allowed based on the size of the base block
		let offset = this.baseElement
			? this.baseElement.clientHeight > window.innerHeight
				? Math.max(0, this.baseElement.clientHeight - window.innerHeight)
				: 0
			: 0;

		// Style map for margin block
		let marginStyle = styleMap({ 'margin-top': `${this.feedMargin}px` });
		// Style map for sticky base block
		let baseStyle =
			offset != 0
				? styleMap(this.swapPosition ? { bottom: `-${offset}px` } : { top: `-${offset}px` })
				: styleMap({ top: '0px' });

		return html`
			${offset != 0 ? html`<div id="margin" style=${marginStyle}></div>` : null}
			<div id="base" style=${baseStyle}>
				<div id="hover-overlay"></div>
				<div id="hover-overlay2"></div>

				<div id="contents">
					<e-svg id="feed-icon" src="regular/shapes"></e-svg>
					<h1 id="title">Feed</h1>

					<!-- Feed categories -->
					<div id="categories">
						<div id="simplified">
							<div class="category">
								<div class="category-icon">
									<div class="backdrop"></div>
									<div class="identity-count">24</div>
								</div>
							</div>
							<div class="category">
								<div class="category-icon">
									<div class="backdrop"></div>
									<div class="identity-count">1</div>
								</div>
							</div>
							<div class="category">
								<div class="category-icon">
									<div class="backdrop"></div>
									<div class="identity-count">99+</div>
								</div>
							</div>
						</div>
						<div id="detailed">
							<!-- <div class='category'>
								<h1 class='category-header'>Upcoming</h1>

								<div class='event'>
									<h1 class='name'>Krunker tournament</h1>
									<h2 class='activity'>$5000 Grand Prize</h2>
									<h2 class='date'>Aug 20</h2>
								</div>
							</div> -->
							<div class="category">
								<!-- <h1 class='category-header'>Live</h1> -->
								${this.feedIdentities.length
									? html`<div>
											${repeat(
												this.feedIdentities,
												a => a,
												a => this.renderIdentity(a)
											)}
									  </div>`
									: 'No friend activity here :('}
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	renderIdentity(identity: api.identity.IdentityHandle) {
		return html`<identity-tile
			.identity=${identity}
			@contextmenu=${showIdentityContextMenu(identity)}
		></identity-tile>`;
	}
}
