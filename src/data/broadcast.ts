export interface LogoutEvent {
	kind: BroadcastEventKind.Logout;
	data: {};
}
export function logout() {
	return { kind: BroadcastEventKind.Logout, data: {} } as LogoutEvent;
}

export interface RefreshEvent {
	kind: BroadcastEventKind.Refresh;
	data: {};
}
export function refresh() {
	return { kind: BroadcastEventKind.Refresh, data: {} } as RefreshEvent;
}

export type BroadcastEvent = LogoutEvent | RefreshEvent;

export enum BroadcastEventKind {
	Logout,
	Refresh
}
