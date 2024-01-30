import { LitElement, html, PropertyValues, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import * as cloud from '@rivet-gg/cloud';
import global from '../../../../../utils/global';
import { responses } from '../../../../../routes';
import { cssify } from '../../../../../utils/css';
import { map } from 'lit/directives/map.js';
import { showAlert } from '../../../../../ui/helpers';

interface Token {
	name: string;
	url: string;
	description: string;
	renderFunction?: any;
}

@customElement('page-dev-game-settings-tokens')
export default class DevGameSettingsTokens extends LitElement {
	static styles = cssify();

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Object })
	loadError?: any;

	// === DEV TOKEN COMPONENTS ===
	activeNamespaceId: string;

	@property({ type: String })
	selectedNamespace = '';

	@property({ type: Array })
	tokens: Token[] = [
		{
			name: 'Cloud Token',
			url: 'https://rivet.gg/docs/general/concepts/token-types#cloud',
			description:
				'Cloud tokens are used to access Rivet Cloud. They are used by the client to access Rivet Cloud.',
			renderFunction: this.createCloudToken
		}
	];

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);
	}

	resetData() {
		this.loadError = null;

		this.requestUpdate();
	}

	async createCloudToken() {
		let createRes = await global.deprecatedApi.cloud.createCloudToken({ gameId: this.game.gameId });

		showAlert(
			'Cloud Token Creation',
			html`
				<span
					>Copy this token to your clipboard. You will not be able to access this token again.</span
				>
				<br />
				<rvt-copy-area confidential .value=${createRes.token}></rvt-copy-area>
			`
		);
	}

	renderTokenBlock(token: Token): TemplateResult {
		return html`
			<div class="border-2 border-zinc-900 bg-raised-bg p-5">
				<div class="flex flex-row w-full place-content-between align-middle mx-auto">
					<h2 class="text-xl my-auto">${token.name}</h2>
					<rvt-button class="my-auto" href=${token.url}> Docs </rvt-button>
				</div>
				<p class="pt-3 pr-24 mb-4">${token.description}</p>
				<rvt-button @click=${token.renderFunction}> Generate </rvt-button>
			</div>
		`;
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		return html`
			<h1 class="text-2xl pb-2">Generate Game Tokens</h1>
			<div class="flex flex-col space-y-4">
				${map(this.tokens, token => this.renderTokenBlock(token))}
			</div>
		`;
	}

	renderPlaceholder() {
		return html`<div id="placeholder">
			<div id="placeholder-right"><loading-placeholder></loading-placeholder></div>
			<div id="placeholder-controls">
				<loading-placeholder></loading-placeholder><loading-placeholder></loading-placeholder>
			</div>
			<loading-placeholder id="placeholder-summary"></loading-placeholder>
			<loading-placeholder id="placeholder-table-header"></loading-placeholder>
			<loading-placeholder id="placeholder-table-row"></loading-placeholder>
		</div>`;
	}
}
