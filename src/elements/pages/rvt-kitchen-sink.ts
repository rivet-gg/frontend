import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { cssify } from '../../utils/css';

@customElement('rvt-kitchen-sink')
export default class RvtKitchenSink extends LitElement {
	static styles = cssify();

	render() {
		return html`<div class="flex flex-col space-y-4 p-8">
			<!-- TODO: Create typography component -->

			<h2 class="text-xl mb-4">Buttons</h1>
			<div class="grid md:grid-cols-2 gap-4">
				<rvt-section>
					<h3 slot="title">Primary</h3>
					<h4 class="my-2">Default elevation</h4>
					<div class="mb-8">
						<rvt-button>Continue</rvt-button>
						<h5 class="my-2">Icons variations</h4>
						<div>
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
						<h5 class="my-2">Size varations</h3>
						<div>
							<rvt-button size="sm" icon="regular/gamepad">Small</rvt-button>
							<rvt-button size="md" icon="regular/gamepad">Medium</rvt-button>
							<rvt-button size="lg" icon="regular/gamepad">Large</rvt-button>
						</div>
						<h5 class="my-2">State variations</h3>
						<div>
							<rvt-button disabled>Disabled</rvt-button>
							<rvt-button loading>Loading</rvt-button>
						</div>
	</div>
					<h4 class="my-2">Medium elevation</h4>
					<div>
						<rvt-button elevation="md">Continue</rvt-button>
						<h5 class="my-2">Icons variations</h4>
						<div>
							<rvt-button elevation="md" icon="regular/gamepad">Play</rvt-button>
							<rvt-button elevation="md" icon-right="regular/chart-line">Analytics</rvt-button>
							<rvt-button elevation="md" icon="regular/gamepad" icon-right="regular/gamepad">Play</rvt-button>
							<rvt-button elevation="md" icon="regular/arrow-up-right">
								Button
								<span slot="suffix">suffix</span>
							</rvt-button>
							<rvt-button elevation="md" icon-right="regular/arrow-up-right">
								Button
								<span slot="prefix">I'm a prefix</span>
							</rvt-button>
							<rvt-button elevation="md">
								Button
								<span slot="prefix">prefix</span>
								<span slot="suffix">sufix</span>
							</rvt-button>
							</div>
						<h5 class="my-2">Size varations</h3>
						<div>
							<rvt-button elevation="md" size="sm" icon="regular/gamepad">Small</rvt-button>
							<rvt-button elevation="md" size="md" icon="regular/gamepad">Medium</rvt-button>
							<rvt-button elevation="md" size="lg" icon="regular/gamepad">Large</rvt-button>
						</div>
						<h5 class="my-2">State variations</h3>
						<div>
							<rvt-button elevation="md" disabled>Disabled</rvt-button>
							<rvt-button elevation="md" loading>Loading</rvt-button>
						</div>
					</div>
				</rvt-section>
				<rvt-section>
					<h3 slot="title">Secondary</h3>
					<h4 class="my-2">Default elevation</h3>
					<div>
					<rvt-button variant="secondary">Continue</rvt-button>
						<h5 class="my-2">Icons variations</h4>
						<div>
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
						<h5 class="my-2">Size varations</h3>
						<div>
							<rvt-button variant="secondary" size="sm" icon="regular/gamepad">Small</rvt-button>
							<rvt-button variant="secondary" size="md" icon="regular/gamepad">Medium</rvt-button>
							<rvt-button variant="secondary" size="lg" icon="regular/gamepad">Large</rvt-button>
						</div>
						<h5 class="my-2">State variations</h3>
						<div>
							<rvt-button variant="secondary" disabled>Disabled</rvt-button>
							<rvt-button variant="secondary" loading>Loading</rvt-button>
						</div>
					</div>
					<h4 class="my-2">Medium elevation</h3>
					<div><rvt-button elevation="md" variant="secondary">Continue</rvt-button>
						<h5 class="my-2">Icons variations</h4>
						<div>
							<rvt-button elevation="md" variant="secondary" icon="regular/gamepad">Play</rvt-button>
							<rvt-button elevation="md" variant="secondary" icon-right="regular/chart-line">Analytics</rvt-button>
							<rvt-button elevation="md" variant="secondary" icon="regular/gamepad" icon-right="regular/gamepad">Play</rvt-button>
							<rvt-button elevation="md" variant="secondary" icon="regular/arrow-up-right">
								Button
								<span slot="suffix">suffix</span>
							</rvt-button>
							<rvt-button elevation="md" variant="secondary" icon-right="regular/arrow-up-right">
								Button
								<span slot="prefix">I'm a prefix</span>
							</rvt-button>
							<rvt-button elevation="md" variant="secondary">
								Button
								<span slot="prefix">prefix</span>
								<span slot="suffix">sufix</span>
							</rvt-button>
							</div>
						<h5 class="my-2">Size varations</h3>
						<div>
							<rvt-button elevation="md" variant="secondary" size="sm" icon="regular/gamepad">Small</rvt-button>
							<rvt-button elevation="md" variant="secondary" size="md" icon="regular/gamepad">Medium</rvt-button>
							<rvt-button elevation="md" variant="secondary" size="lg" icon="regular/gamepad">Large</rvt-button>
						</div>
						<h5 class="my-2">State variations</h3>
						<div>
							<rvt-button elevation="md" variant="secondary" disabled>Disabled</rvt-button>
							<rvt-button elevation="md" variant="secondary" loading>Loading</rvt-button>
						</div>
						
					</div>
				</rvt-section>
			</div>`;
	}
}
