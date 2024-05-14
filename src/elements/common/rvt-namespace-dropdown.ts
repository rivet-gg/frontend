import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import { Rivet } from '@rivet-gg/api';
import RvtRouter from '../root/rvt-router';
import { DropDownSelectEvent } from '../dev/drop-down-list';

@customElement('rvt-namespace-dropdown')
export default class RvtNamespaceDropdown extends LitElement {
	static styles = cssify();

	@property({ type: Object })
	game: Rivet.cloud.GameFull;

	@property({ type: Object })
	currentNamespace: Rivet.cloud.NamespaceSummary;

	private handleListSelect(event: DropDownSelectEvent<string>) {
		RvtRouter.shared.navigate(
			RvtRouter.shared.currentPage.route.build({
				...RvtRouter.shared.currentPage.params,
				gameId: this.game.gameId,
				namespaceId: event.selection.value
			})
		);
	}

	render() {
		return html`
			<drop-down-list
				.selection=${{
					value: this.currentNamespace.namespaceId,
					label: this.currentNamespace.displayName
				}}
				.options=${this.game.namespaces.map(namespace => ({
					value: namespace.namespaceId,
					label: namespace.displayName
				}))}
				@select=${this.handleListSelect.bind(this)}
			></drop-down-list>
		`;
	}
}
