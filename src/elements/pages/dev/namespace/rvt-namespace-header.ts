import { LitElement, TemplateResult, html } from 'lit';
import * as cloud from '@rivet-gg/cloud';
import { customElement, property } from 'lit/decorators.js';
import styles from './rvt-namespace-header.scss';
import { cssify } from '../../../../utils/css';

@customElement('rvt-namespace-header')
export default class RvtNamespaceHeader extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	namespace: cloud.NamespaceFull;

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Object })
	version: cloud.VersionFull;

	getNamespaceVersion(namespace: cloud.NamespaceSummary) {
		return this.game.versions.find(v => v.versionId === namespace.versionId);
	}

	render() {
		return html`
			<rvt-namespace-heading .game=${this.game} .namespace=${this.namespace}></rvt-namespace-heading>
			<div class="flex flex-col space-y-2 ml-auto">${this.renderVisitButton()}</div>
		`;
	}

	renderVisitButton(): TemplateResult {
		if (!this.version?.config.cdn) {
			return null;
		}

		let visitHost: string;
		let visitUrl: string;
		if (this.namespace.nameId == 'prod') {
			// FIXME: On Self hosted version of rivet this will be an issue
			visitHost = `${this.game.nameId}.rivet.game`;
			visitUrl = `https://${visitHost}/`;
		} else {
			visitHost = `${this.game.nameId}--${this.namespace.nameId}.rivet.game`;
			visitUrl = `https://${visitHost}/`;
		}

		return html`<rvt-button
			icon="solid/arrow-up-right"
			href=${visitUrl}
		>
			Visit
		</stylized-button>`;
	}
}
