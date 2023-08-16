import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './game-banner.scss';
import * as cloud from '@rivet-gg/cloud';
import { cssify } from '../../../utils/css';
import assets from '../../../data/assets';
import routes from '../../../routes';

@customElement('game-namespace-tile')
export default class GameNamespaceTile extends LitElement {
	static styles = cssify(styles);

	@property({ type: String })
	gameId: string;

	@property({ type: Object })
	namespace: cloud.NamespaceSummary;

	@property({ type: Object })
	version: cloud.VersionSummary;

	render() {
		return html`
			<a
				class="m-auto h-full p-2 border-white/10 border flex flex-row place-content-between hover:bg-button-bg-hover-color hover:-translate-y-px transition"
				href=${routes.devNamespace.build({
					gameId: this.gameId,
					namespaceId: this.namespace.namespaceId
				})}
			>
				<div>
					<h1 class="text-lg">${this.namespace.displayName}</h1>
					<h2 class="text-sm font-light italic text-white/60">${this.namespace.nameId}</h2>
				</div>
				<div>
					<h1 class="text-lg">${this.version.displayName}</h1>
				</div>
			</a>
		`;
	}
}
