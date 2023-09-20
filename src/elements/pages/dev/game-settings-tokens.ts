import { LitElement, html, PropertyValues, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import cloud from '@rivet-gg/cloud';
import { responses } from '../../../routes';
import { cssify } from '../../../utils/css';
import { map } from 'lit/directives/map.js';
import { ifDefined } from 'lit/directives/if-defined';

interface Token {
    name: string;
    url: string;
    description: string;
    renderFunction?: any;
}

const tokens: Token[] = [
    {
        name: "Public Namespace Token",
        url: "https://rivet.gg/docs/general/concepts/handling-game-tokens#public-namespace-tokens",
        description: "Public namespace tokens are used to access public namespaces. They are used by the client to access public namespaces.",
        renderFunction: () => {
            console.log("testPublic")
        }
    },
    {
        name: "Development Token",
        url: "https://rivet.gg/docs/general/concepts/dev-tokens",
        description: "Development tokens are used to access development namespaces. They are used by the client to access development namespaces.",
        renderFunction: () => {
            console.log("testDevelopment")
        }
    }
]

@customElement('page-dev-game-settings-tokens')
export default class DevGameSettingsTokens extends LitElement {
	static styles = cssify();

	@property({ type: Object })
	game: cloud.GameFull;

	@property({ type: Object })
	loadError?: any;

	updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);
	}

	resetData() {
		this.loadError = null;

		this.requestUpdate();
	}

    renderTokenBlock(token: Token): TemplateResult {
        return html`
            <div class="w-4/5 mx-auto border-2 border-zinc-900 bg-raised-bg rounded-lg p-5">
                <div class="flex flex-row w-full place-content-between align-middle mx-auto">
                    <h2 class="text-xl my-auto">${token.name}</h2>
                    <stylized-button
                    class="my-auto"
                    .href=${token.url}
                    right-icon="solid/arrow-right"
                    >
                        Docs
                    </stylized-button>
                </div>
                <p class="pt-3 pr-24">${token.description}</p>
                <!-- <h3 class="text-lg py-1.5 underline "><a .href=${token.url} class="hover:text-main-accent">Docs</a></h3> -->
                <!-- <button @click=${token.renderFunction}>Generate</button> -->
                <stylized-button
                    class="my-auto pt-4"
                    @click=${token.renderFunction}
                    right-icon="solid/plus"
                    >
                    Generate
                </stylized-button>
            </div>
        `
    }

	render() {
		if (this.loadError) return responses.renderError(this.loadError, true);

		return html`
			<div class="flex flex-col space-y-4">
                ${map(tokens, (token) => this.renderTokenBlock(token))}
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
