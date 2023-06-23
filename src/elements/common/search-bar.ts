import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import UIRoot from '../root/ui-root';
import styles from './search-bar.scss';

@customElement('search-bar')
export default class SearchBar extends LitElement {
	static styles = cssify(styles);

	showSearch() {
		UIRoot.shared.openSearchPanel({
			filter: {
				identities: true,
				games: true,
				chats: true,
				groups: true
			},
			active: true
		});
	}

	render() {
		return html`
			<div id="base" @click=${this.showSearch.bind(this)}>
				<e-svg id="search-icon" src="material/magnify"></e-svg>
				<p>Search Rivet...</p>
			</div>
		`;
	}
}
