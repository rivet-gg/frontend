import * as api from '../utils/api';

export function padAccountNumber(n: number | string): string {
	return ('0000' + n).slice(-4);
}

export function identityRouteData(data: api.identity.IdentityHandle): { id: string } {
	return { id: data.identityId };
}
