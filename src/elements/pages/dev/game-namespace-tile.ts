import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import * as cloud from '@rivet-gg/cloud';
import { cssify } from '../../../utils/css';
import routes from '../../../routes';

@customElement('game-namespace-tile')
export default class GameNamespaceTile extends LitElement {
	static styles = cssify();

	@property({ type: String })
	gameId: string;

	@property({ type: Object })
	namespace: cloud.NamespaceSummary;

	@property({ type: Object })
	version: cloud.VersionSummary;

	render() {
		return html`
			<a
				class="m-auto h-full p-2 rounded-lg border-white/10 border flex flex-row place-content-between hover:bg-button-bg-hover-color hover:-translate-y-px transition"
				href=${routes.devNamespace.build({
					gameId: this.gameId,
					namespaceId: this.namespace.namespaceId
				})}
			>
				<div>
					<p class="text-lg font-semibold">${this.namespace.displayName}</p>
					<p class="text-sm font-extralight italic text-white/60">${this.namespace.nameId}</p>
				</div>
				<div>
					<p class="text-lg font-light">${this.version.displayName}</p>
				</div>
			</a>
		`;
	}
}
