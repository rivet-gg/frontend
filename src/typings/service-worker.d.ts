interface ExtendableEvent extends Event {
	waitUntil(fn: Promise<any>): void;
}
interface NotificationEvent extends ExtendableEvent {
	action: string;
	notification: Notification;
}

interface FetchEvent extends ExtendableEvent {
	request: Request;
	preloadResponse: Promise<any>;
	clientId: string;
	resultingClientId: string;
	replacesClientId: string;
	handled: Promise<undefined>;

	respondWith(r: Promise<void | Response>): undefined;
}

interface Client {
	frameType: ClientFrameType;
	id: string;
	url: string;
}

interface Clients {
	claim(): Promise<any>;
	get(id: string): Promise<Client>;
	matchAll(options?: ClientMatchOptions): Promise<Array<Client>>;
	openWindow(url: string): Promise<WindowClient>;
}

interface ClientMatchOptions {
	includeUncontrolled?: boolean;
	type?: ClientMatchTypes;
}

interface WindowClient extends Client {
	focused: boolean;
	visibilityState: WindowClientState;
	focus(): Promise<WindowClient>;
	navigate(url: string): Promise<WindowClient>;
}

type ClientFrameType = 'auxiliary' | 'top-level' | 'nested' | 'none';
type ClientMatchTypes = 'window' | 'worker' | 'sharedworker' | 'all';
type WindowClientState = 'hidden' | 'visible' | 'prerender' | 'unloaded';

declare let clients: Clients;
