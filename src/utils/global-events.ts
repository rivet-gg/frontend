import * as api from './api';
import { GlobalStatus, WindowSize } from './global';
import logging from './logging';
import { SettingChange } from './settings';

type CallbackSignature<T> = (event: T) => any;
interface EventOptions extends AddEventListenerOptions {
	throttleRate?: number;
}

// Manages all of the event handler groups for a specific element
class EventGroupManager<B> {
	groups: Map<string, HandlerGroup<any>> = new Map();

	constructor() {}

	add<T extends B>(name: string, callback: CallbackSignature<T>, opts: EventOptions | number = 0) {
		// Get throttle rate from options
		let rate = typeof opts == 'number' ? opts : (opts as EventOptions).throttleRate || 0;

		// Find handler group
		if (this.groups.has(name)) {
			// Add handler to existing group
			this.groups.get(name).add(callback, rate);
		}
		// No handler group exists, make a new one
		else {
			// Create a new handler group and add the callback
			let newGroup = new HandlerGroup<T>();
			newGroup.add(callback, rate);

			// Add key to handlers map
			this.groups.set(name, newGroup);

			// Establish handler on window
			this.eventSetter(name, newGroup);
		}
	}

	remove<T>(name: string, callback: CallbackSignature<T>, throttleRate = 0) {
		// Find handler group
		if (this.groups.has(name)) {
			let handlerGroup = this.groups.get(name);

			handlerGroup.remove(callback, throttleRate);

			// Remove handler group if no handlers are left
			if (handlerGroup.handlers.size == 0) {
				this.groups.delete(name);

				this.eventRemover(name, handlerGroup);
			}
		}
		// No handler group exists
		else {
			logging.warn(`Attempt to remove event handler from group that does not exist: "${name}"`);
		}
	}

	// Abstracted event setting function
	eventSetter<T extends B>(name: string, newGroup: HandlerGroup<T>) {}
	eventRemover<T extends B>(name: string, handlerGroup: HandlerGroup<T>) {}
}

class ElementEventGroupManager extends EventGroupManager<Event> {
	element: Window | HTMLElement;

	constructor(element: Window | HTMLElement) {
		super();

		this.element = element;
	}

	eventSetter<T extends Event>(name: string, newGroup: HandlerGroup<T>) {
		this.element.addEventListener(name, newGroup.groupHandlerCallback as EventListener);
	}

	eventRemover<T extends Event>(name: string, handlerGroup: HandlerGroup<T>) {
		this.element.removeEventListener(name, handlerGroup.groupHandlerCallback as EventListener);
	}
}

class GlobalEventGroupManager extends EventGroupManager<GlobalChangeEvent<any>> {
	constructor() {
		super();
	}

	// No actual event setters are created since no HTML elements are involved
	eventSetter<T>(name: string, newGroup: HandlerGroup<T>) {}
	eventRemover<T>(name: string, handlerGroup: HandlerGroup<T>) {}

	// Dispatch an event
	dispatch<T>(name: string, value: T) {
		// Create property update event
		let event: GlobalChangeEvent<T> = {
			value: value
		};

		// Dispatch property update event
		if (this.groups.has(name)) {
			this.groups.get(name).groupHandlerCallback(event);
		}
	}

	// Waits for a specific event
	await<T>(name: string): Promise<GlobalChangeEvent<T>> {
		return new Promise(resolve => {
			let handler = (e: GlobalChangeEvent<T>) => {
				resolve(e);

				this.remove(name, handler);
			};

			this.add(name, handler);
		});
	}
}

// Manages all of the throttle event handler groups
class HandlerGroup<T> {
	groupHandlerCallback: (event: T) => void;
	handlers: Map<number, ThrottleHandler<T>> = new Map();

	constructor() {
		// Create a new group handler callback
		this.groupHandlerCallback = (event: T) => this.activate(event);
	}

	activate(event: T) {
		// Run all throttle handlers
		this.handlers.forEach(handler => handler.activate(event));
	}

	add(callback: CallbackSignature<T>, throttleRate: number) {
		// Check if the throttle handler exists
		if (this.handlers.has(throttleRate)) {
			this.handlers.get(throttleRate).add(callback);
		}
		// Throttle handler does not exist
		else {
			// Make a new handler
			let newHandler = new ThrottleHandler<T>(throttleRate);
			newHandler.add(callback);

			this.handlers.set(throttleRate, newHandler);
		}
	}

	remove(callback: CallbackSignature<T>, throttleRate: number) {
		// Check if the throttle handler exists
		if (this.handlers.has(throttleRate)) {
			let handler = this.handlers.get(throttleRate);

			// Remove event handler
			handler.remove(callback);

			// Remove throttle handler if no event handlers are left
			if (handler.eventHandlers.size == 0) {
				this.handlers.delete(throttleRate);
			}
		}
		// Group does not exist
		else {
			logging.warn(
				`Attempt to remove event handler from group that does not exist (throttleRate: ${throttleRate})`
			);
		}
	}
}

// Manages all of the event handlers of the same throttle value
class ThrottleHandler<T> {
	eventHandlers: Set<CallbackSignature<T>> = new Set();

	// === THROTTLE DATA ===
	throttleRate: number;
	timeoutID: number = null;
	activateOnFallingEdge = false;
	latestEvent: T = null;

	constructor(throttleRate: number) {
		this.throttleRate = throttleRate;
	}

	activate(event: T) {
		// Cache latest event regardless of if it will be used immediately or not
		this.latestEvent = event;

		// Throttle event
		if (this.throttleRate != 0) {
			if (this.timeoutID == null) {
				// Run event handlers normally
				this.eventHandlers.forEach(cb => cb(this.latestEvent));

				this.timeoutID = window.setTimeout(this.throttle.bind(this), this.throttleRate);
			}
			// Event was called during timeout, set flag for falling edge execution
			else {
				this.activateOnFallingEdge = true;
			}
		} else {
			// Run event handlers normally
			this.eventHandlers.forEach(cb => cb(this.latestEvent));
		}
	}

	throttle() {
		// Activate event again on falling edge of timeout
		if (this.activateOnFallingEdge) {
			this.activateOnFallingEdge = false;

			// Run event handlers normally
			this.eventHandlers.forEach(cb => cb(this.latestEvent));

			// Set a new timeout to prevent double execution
			this.timeoutID = window.setTimeout(this.throttle.bind(this), this.throttleRate);
		}
		// Reset throttle status
		else {
			this.timeoutID = null;
		}
	}

	add(callback: CallbackSignature<T>) {
		// Check for duplicates
		if (this.eventHandlers.has(callback)) {
			logging.warn('Attempt to add an event handler that already exists');
		}
		// Add event handler
		else {
			this.eventHandlers.add(callback);
		}
	}

	remove(callback: CallbackSignature<T>) {
		// Check if handler exists
		if (this.eventHandlers.has(callback)) {
			this.eventHandlers.delete(callback);
		}
		// Does not exist
		else {
			logging.warn('Attempt to remove an event handler that does not exist');
		}
	}
}

// Stores all window handler groups
export const windowEventGroups = new ElementEventGroupManager(window);
// Stores all document body handler groups
export const bodyEventGroups = new ElementEventGroupManager(document.body);

export const globalEventGroups = new GlobalEventGroupManager();

export interface GlobalChangeEvent<T> {
	value: T;
}

export type SettingChangeEvent = GlobalChangeEvent<SettingChange>;
export type NotificationEvent = GlobalChangeEvent<api.identity.GlobalEvent>;
export type GlobalStatusChangeEvent = GlobalChangeEvent<GlobalStatus>;
export type ThreadReadEvent = GlobalChangeEvent<string>;
export type ThreadUpdateEvent = GlobalChangeEvent<api.identity.ChatThread[]>;
export type IdentityChangeEvent = GlobalChangeEvent<api.identity.IdentityProfile>;
export type PartyUpdateEvent = GlobalChangeEvent<api.identity.PartySummary>;
export type GlobalResizeEvent = GlobalChangeEvent<WindowSize>;
export type RecentFollowersUpdateEvent = GlobalChangeEvent<void>;
export type ErrorEvent = GlobalChangeEvent<any>;
