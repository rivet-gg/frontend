import { Rivet } from '@rivet-gg/api';
import posthog from 'posthog-js';

export const identifyUser = (
	id: string,
	identity?: Pick<Rivet.identity.common.Profile, 'displayName' | 'linkedAccounts' | 'avatarUrl'>
) => {
	let properties = {
		name: identity?.displayName,
		email: identity?.linkedAccounts.find(x => x.email)?.email?.email,
		avatar: identity?.avatarUrl
	};

	posthog.identify(`user:${id}`, identity ? properties : undefined);
};
