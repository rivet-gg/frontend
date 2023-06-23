import * as api from './api';

export function isDeveloper(identity: api.identity.IdentityProfile): boolean {
	return identity.groups.some(x => x.group.isDeveloper);
}
