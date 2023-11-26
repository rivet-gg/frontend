import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Rivet } from '@rivet-gg/api-internal';

const PortProtocol = Rivet.cloud.version.matchmaker.common.PortProtocol;
type PortProtocol = Rivet.cloud.version.matchmaker.common.PortProtocol;

@customElement('rvt-protocol-dropdown')
export default class RvtProtocolDropdown extends LitElement {
	@property({ type: String })
	selection: PortProtocol;

	static PORT_PROTOCOLS_LABELS = {
		[PortProtocol.Http]: 'HTTP',
		[PortProtocol.Https]: 'HTTPS',
		[PortProtocol.Tcp]: 'TCP',
		[PortProtocol.TcpTls]: 'TCP TLS',
		[PortProtocol.Udp]: 'UDP'
	} satisfies Record<PortProtocol, string>;

	static OPTIONS = Object.values(PortProtocol).map(value => ({
		label: RvtProtocolDropdown.PORT_PROTOCOLS_LABELS[value],
		value
	}));

	render() {
		return html`
			<drop-down-list
				light
				.selection=${RvtProtocolDropdown.OPTIONS.find(protocol => protocol.value == this.selection)}
				.options=${RvtProtocolDropdown.OPTIONS}
			></drop-down-list>
		`;
	}
}
