import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { cssify } from '../../utils/css';

@customElement('rvt-kitchen-sink')
export default class RvtKitchenSink extends LitElement {
	static styles = cssify();

	render() {
		return html`<div class="flex flex-col space-y-4 p-8">
			<!-- TODO: Create typography component -->
			<section class="border-b border-gray-500 pb-8">
				<h2 class="text-xl mb-4">Buttons</h1>
				<h3 class="mb-2">Primary</h3>
				<div>
					<rvt-button>Continue</rvt-button>
					<rvt-button icon="regular/gamepad">Play</rvt-button>
					<rvt-button icon-right="regular/chart-line">Analytics</rvt-button>
					<rvt-button icon="regular/gamepad" icon-right="regular/gamepad">Play</rvt-button>
					<rvt-button icon="regular/arrow-up-right">
						Button
						<span slot="suffix">suffix</span>
					</rvt-button>
					<rvt-button icon-right="regular/arrow-up-right">
						Button
						<span slot="prefix">I'm a prefix</span>
					</rvt-button>
					<rvt-button>
						Button
						<span slot="prefix">prefix</span>
						<span slot="suffix">sufix</span>
					</rvt-button>
				</div>
				<h3 class="my-2">Secondary</h3>
				<div>
					<rvt-button variant="secondary">Continue</rvt-button>
					<rvt-button variant="secondary" icon="regular/gamepad">Play</rvt-button>
					<rvt-button variant="secondary" icon-right="regular/chart-line">Analytics</rvt-button>
					<rvt-button variant="secondary" icon="regular/gamepad" icon-right="regular/gamepad">Play</rvt-button>
					<rvt-button variant="secondary" icon="regular/arrow-up-right">
						Button
						<span slot="suffix">suffix</span>
					</rvt-button>
					<rvt-button variant="secondary" icon-right="regular/arrow-up-right">
						Button
						<span slot="prefix">I'm a prefix</span>
					</rvt-button>
					<rvt-button variant="secondary">
						Button
						<span slot="prefix">prefix</span>
						<span slot="suffix">sufix</span>
					</rvt-button>
				</div>
			</section>
		</div> `;
	}
}
