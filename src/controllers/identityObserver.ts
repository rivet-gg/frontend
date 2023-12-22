import { ReactiveController, ReactiveControllerHost } from 'lit';
import { globalEventGroups, IdentityChangeEvent } from '../utils/global-events';
import { IdentityProfile } from '@rivet-gg/identity';
import global from '../utils/global';

export class IdentityObserver implements ReactiveController {
	public identity: IdentityProfile | null = global.currentIdentity || null;

	constructor(private host: ReactiveControllerHost) {
		host.addController(this);
	}

	hostConnected() {
		globalEventGroups.add('identity-change', this.handleIdentityChange);
	}

	hostDisconnected() {
		globalEventGroups.remove('identity-change', this.handleIdentityChange);
	}

	private handleIdentityChange = (e: IdentityChangeEvent) => {
		this.identity = e.value;
		this.host.requestUpdate();
	};
}
