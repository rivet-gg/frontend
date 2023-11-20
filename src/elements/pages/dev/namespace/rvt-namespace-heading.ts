import { LitElement, html } from 'lit';
import * as cloud from '@rivet-gg/cloud';
import { customElement, property } from 'lit/decorators.js';
import utils from '../../../../utils/utils';
import { cssify } from '../../../../utils/css';

@customElement('rvt-namespace-heading')
export default class RvtNamespaceHeading extends LitElement {
	static styles = cssify();

	@property({ type: Object })
	namespace: cloud.NamespaceFull;

	@property({ type: Object })
	game: cloud.GameFull;

	getNamespaceVersion(namespace: cloud.NamespaceSummary) {
		return this.game.versions.find(v => v.versionId === namespace.versionId);
	}

	render() {
		return html`
			<div class="flex flex-row mb-2 gap-3">
				<h3 class="text-3xl text-white">${this.namespace.displayName}</h3>
				<div class="rounded-lg px-2 py-1 my-auto text-xs text-white/60 bg-raised-bg">
					Name ID: ${this.namespace.nameId}
				</div>
			</div>
			<div class="flex flex-col font-normal gap-1 text-md">
				<h4 class="text-white/60 pr-4">
					Version: ${this.getNamespaceVersion(this.namespace).displayName}
				</h4>
				<h4 class="text-white/60">
					${utils.formatDateShort(this.getNamespaceVersion(this.namespace).createTs)}
				</h4>
			</div>
		`;
	}
}
