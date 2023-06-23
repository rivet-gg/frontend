import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './version-publish-summary.scss';
import { cssify } from '../../utils/css';
import { repeat } from 'lit/directives/repeat.js';
import { when } from 'lit/directives/when.js';
import utils from '../../utils/utils';
import cloud from '@rivet-gg/cloud';
import { getRegionEmoji } from '../../utils/emoji';

@customElement('version-publish-summary')
export default class VersionPublishSumary extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Object })
	tiers: cloud.RegionTier[] = [];

	@property({ type: Array })
	namespaces: string[] = [];

	@property({ type: Object })
	config: cloud.CloudVersionConfig;

	noServices() {
		return !this.config.cdn && !this.config.matchmaker && !this.config.kv && !this.config.identity;
	}

	render() {
		let namespaces = this.game.namespaces
			.filter(n => this.namespaces.includes(n.namespaceId))
			.map(n => n.displayName);

		return html`
			<div id="base">
				<h2>${namespaces.length ? utils.formatList(namespaces, 4, '&') : 'No namespaces'}</h2>
				<div id="services" class="light-scrollbar">
					${when(this.noServices(), () => html`<p class="muted-text">No services selected</p>`)}
					${when(this.config.cdn, () => this.renderCdn())}
					${when(this.config.matchmaker, () => this.renderMatchmaker())}
					${when(this.config.kv, () => this.renderKv())}
					${when(this.config.identity, () => this.renderIdentity())}
				</div>
				<em class="footnote"
					>Fees and charges that are billed for usage, such as the service “Serverless Lobbies”, are
					billed by the second. Usage is rounded up to the nearest second and cent.</em
				>
			</div>
		`;
	}

	renderCdn() {
		return html`<div class="service">
			<div class="service-header">
				<div class="service-name">
					<e-svg preserve non-icon src="/products2/cdn-duotone"></e-svg>
					<h3>CDN</h3>
					<div class="service-tag">BETA</div>
				</div>
			</div>
		</div>`;
	}

	renderMatchmaker() {
		return html`<div class="service">
			<div class="service-header">
				<div class="service-name">
					<e-svg preserve non-icon src="/products2/matchmaker-duotone"></e-svg>
					<h3>Serverless Lobbies</h3>
				</div>
			</div>
			<div class="service-body">
				${when(
					this.config.matchmaker.lobbyGroups.length,
					() =>
						repeat(
							this.config.matchmaker.lobbyGroups,
							(_, i) => i,
							l => {
								return html`<div class="game-mode">
									<h4 class="game-mode-header">${l.nameId}</h4>
									${repeat(l.regions, (_, i) => i, this.renderRegion.bind(this))}
								</div>`;
							}
						),
					() => html`<p class="muted-text">No gamemodes</p>`
				)}
			</div>
		</div>`;
	}

	renderRegion(r: cloud.LobbyGroupRegion) {
		let regionConfig = this.game.availableRegions.find(a => r.regionId == a.regionId);
		let regionIcon = getRegionEmoji(regionConfig.universalRegion);

		let formattedTierNameId = r.tierNameId
			.replace('basic', 'Basic')
			.replace(/-/g, ' ')
			.replace(/(\d+)d(\d+)/, '$1/$2');

		return html`<div class="region">
			<ul>
				<li>
					<e-svg class="region-icon" preserve src=${regionIcon}></e-svg>
					${regionConfig.regionDisplayName} (${formattedTierNameId})
				</li>
				<li class="expanded-list-item">
					<p>Lobbies</p>
				</li>
				<li class="expanded-list-item">
					<p>Idle lobbies</p>
				</li>
			</ul>
		</div>`;
	}

	renderKv() {
		return html`<div class="service">
			<div class="service-header">
				<div class="service-name">
					<e-svg preserve non-icon src="/products2/kv-duotone"></e-svg>
					<h3>KV</h3>
					<div class="service-tag">BETA</div>
				</div>
			</div>
		</div>`;
	}

	renderIdentity() {
		return html`<div class="service">
			<div class="service-header">
				<div class="service-name">
					<e-svg preserve non-icon src="/products2/identity-duotone"></e-svg>
					<h3>Identity</h3>
				</div>
			</div>
		</div>`;
	}
}
