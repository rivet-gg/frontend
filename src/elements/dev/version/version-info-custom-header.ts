import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, queryAll } from 'lit/decorators.js';
import { cssify } from '../../../utils/css';
import styles from './version-info-custom-header.scss';
import cloud from '@rivet-gg/cloud';
import { TraversableErrors, VALIDATION_ERRORS } from '../../../utils/traversable-errors';

// See game-version-validate
const HEADER_COUNT_MAX = 32;

@customElement('dev-version-info-custom-header')
export class DevVersionInfoCustomHeader extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Object })
	config: cloud.CdnVersionCustomHeadersMiddleware;

	@property({ type: Object })
	routeConfig: cloud.CdnVersionRoute;

	@property({ type: Boolean })
	editing: boolean;

	@property({ type: Object })
	middlewareErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME_VERSION);
	@property({ type: Object })
	routeErrors: TraversableErrors = new TraversableErrors(VALIDATION_ERRORS.GAME_VERSION);

	@queryAll('.header-input > text-input')
	headerInputs: HTMLElement[];

	removeCustomHeader() {
		this.dispatchEvent(new Event('remove'));
	}

	updateConfig() {
		this.requestUpdate('config');
		this.dispatchEvent(new Event('update'));
	}

	changeGlob(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		this.routeConfig.glob = target.value;

		this.updateConfig();
	}

	changePriority(event: InputEvent) {
		let target = event.target as HTMLInputElement;
		let value = parseInt(target.value);
		if (!isNaN(value)) this.routeConfig.priority = value;

		this.updateConfig();
	}

	updateHeader(idx: number, key: keyof cloud.CdnVersionHeader, event: InputEvent) {
		let target = event.target as HTMLInputElement;
		this.config.headers[idx][key] = target.value;
		this.updateConfig();
	}

	removeHeader(idx: number) {
		this.config.headers.splice(idx, 1);
		this.updateConfig();
	}

	createHeader() {
		this.config.headers.push({ name: '', value: '' });
		this.updateConfig();

		this.updateComplete.then(async () => {
			await this.getUpdateComplete();

			let lastInput = this.headerInputs[this.headerInputs.length - 2];
			if (lastInput) lastInput.focus();
		});
	}

	render() {
		let globErrors = this.routeErrors.findFormatted('glob');
		let tooManyHeaders = this.middlewareErrors.findFormatted(
			'custom-headers',
			'headers-meta',
			'too-many'
		);

		return html`
			<div id="base">
				${this.editing
					? html`<icon-button
							id="close"
							src="solid/xmark"
							.trigger=${this.removeCustomHeader.bind(this)}
					  ></icon-button>`
					: null}

				<div class="row">
					<div class="controller">
						<h4>Glob</h4>
						${globErrors.length ? html`<error-list .errors=${globErrors}></error-list>` : null}
						${this.editing
							? html`<text-input
									id="name-id-input"
									class="medium"
									placeholder="Glob"
									.init=${this.routeConfig.glob}
									@input=${this.changeGlob.bind(this)}
							  ></text-input>`
							: html`<p class="immut-info medium">${this.routeConfig.glob}</p>`}
					</div>
					<div class="controller">
						<h4>Priority</h4>
						${this.editing
							? html`<text-input
									class="short"
									number
									placeholder="Priority"
									.min=${0}
									.max=${100}
									.init=${this.routeConfig.priority.toString()}
									@input=${this.changePriority.bind(this)}
							  ></text-input>`
							: html`<p class="immut-info short">${this.routeConfig.priority}</p>`}
					</div>
				</div>

				<h4>Headers</h4>
				${tooManyHeaders.length ? html`<error-list .errors=${tooManyHeaders}></error-list>` : null}
				<div id="headers-list" class="list">
					${this.config.headers.length
						? html`<div>
								${this.config.headers.map((v, i) => {
									if (this.editing) {
										let headerErrors = this.middlewareErrors.findFormatted(
											'custom-headers',
											'headers',
											i
										);

										return html`
											${headerErrors.length
												? html`<error-list .errors=${headerErrors}></error-list>`
												: null}
											<div class="item header header-input">
												<!-- maxlength is > 512 so that users pasting in content can see the "too long" error -->
												<text-input
													.init=${v.name}
													placeholder="Header name"
													maxlength="513"
													@input=${this.updateHeader.bind(this, i, 'name')}
												></text-input>
												<span>:</span>
												<!-- maxlength is > 1024 so that users pasting in content can see the "too long" error -->
												<text-input
													.init=${v.value}
													placeholder="Header value"
													maxlength="1025"
													@input=${this.updateHeader.bind(this, i, 'value')}
												></text-input>
												<icon-button
													src="solid/xmark"
													small
													.trigger=${this.removeHeader.bind(this, i)}
												></icon-button>
											</div>
										`;
									} else {
										return html`<p class="immut-info">${v.name}: ${v.value}</p>`;
									}
								})}
						  </div>`
						: this.editing
						? null
						: html`<p class="muted">No headers defined</p>`}
					${this.editing && this.config.headers.length < HEADER_COUNT_MAX
						? html`<dashed-button icon="solid/plus" .trigger=${this.createHeader.bind(this)}
								>Add Header</dashed-button
						  >`
						: null}
				</div>
			</div>
		`;
	}
}
