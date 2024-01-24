import { LitElement, html } from 'lit';
import { customElement, property, queryAll } from 'lit/decorators.js';
import styles from './game-tokens.scss';
import * as cloud from '@rivet-gg/cloud';
import { responses } from '../../../../../routes';
import { cssify } from '../../../../../utils/css';
import global from '../../../../../utils/global';
import { showAlert } from '../../../../../ui/helpers';
import logging from '../../../../../utils/logging';
import utils from '../../../../../utils/utils';
import { map } from 'lit/directives/map.js';

interface Token {
	name: string;
	url: string;
	description: string;
	render?: () => unknown;
}

@customElement('page-dev-game-tokens')
export default class DevGameTokens extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Object })
	namespace: cloud.NamespaceSummary;

	@property({ type: Object })
	loadError?: any;

	async createPublicToken() {
		try {
			let createRes = await global.deprecatedApi.cloud.createGameNamespaceTokenPublic({
				gameId: this.game.gameId,
				namespaceId: this.namespace.namespaceId
			});

			showAlert(
				'Namespace Public Token Creation',
				html`
					<span>
						Copy this token to your clipboard. You will not be able to access this token again.
					</span>
					<rvt-copy-area confidential value=${createRes.token}></rvt-copy-area>
				`
			);
		} catch (err) {
			logging.error('Failed to create public token', err);
		}
	}

	downloadEnvFile(token: string) {
		utils.downloadData('_env', `RIVET_TOKEN=${token}`);
	}

	render() {
		if (this.loadError) return responses.renderError(this.loadError);

		let tokens = [
			{
				name: 'Public Token',
				url: 'https://rivet.gg/docs/general/concepts/handling-game-tokens#public-namespace-tokens',
				description:
					'Public tokens are used from the game client. These are safe to share with the public.',
				render: () => {
					return html`<rvt-button @click=${this.createPublicToken.bind(this)}>
						Generate
					</rvt-button>`;
				}
			},
			{
				name: 'Development Token',
				url: 'https://rivet.gg/docs/general/concepts/dev-tokens',
				description: `Development tokens are built to let you develop your game on your local machine with access to production APIs.`,
				render: () => {
					return html`
						<p>Run the following in your terminal:</p>
						<div class="mt-2">
							<rvt-copy-area
								value=${`rivet token create dev -n ${this.namespace.nameId}`}
							></rvt-copy-area>
						</div>
					`;
				}
			}
		];

		return html`
			<h1 class="text-2xl pb-2">Tokens</h1>
			<div class="flex flex-col mx-auto gap-4 lg:grid lg:grid-cols-2">
				${map(tokens, token => this.renderTokenBlock(token))}
			</div>
		`;
	}

	renderTokenBlock(token: Token) {
		return html`
			<div class="flex flex-col border-2 border-zinc-900 bg-raised-bg rounded-lg p-5">
				<div class="flex flex-row w-full">
					<h2 class="flex-1 text-xl my-auto">${token.name}</h2>
					<rvt-button class="my-auto" href=${token.url}>Docs</rvt-button>
				</div>
				<p class="mt-2">${token.description}</p>
				<div class="mt-4">${token.render()}</div>
			</div>
		`;
	}
}
