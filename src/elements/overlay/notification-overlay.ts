import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './notification-overlay.scss';
import timing from '../../utils/timing';
import {
	globalEventGroups,
	ErrorEvent,
	NotificationEvent,
	GlobalStatusChangeEvent
} from '../../utils/global-events';
import { classMap } from 'lit/directives/class-map.js';
import logging from '../../utils/logging';
import { repeat } from 'lit/directives/repeat.js';
import * as uuid from 'uuid';
import { GlobalStatus } from '../../utils/global';
import { showAlert } from '../../ui/helpers';

const TICK_RATE = timing.seconds(1);
const NOTIFICATION_LIFESPAN = timing.seconds(6);
const NOTIFICATION_FADE_LENGTH = timing.milliseconds(200); // Match with consts.scss/$transition-length

interface TimeoutNotification {
	id: string;
	timestamp: Date | number;
	life: number;
	timeoutId: number;
	isFading: boolean;
	mouseOver: boolean;

	// Either
	body: {
		error?: any;
		system?: { icon?: string; title: string; body: TemplateResult };
	};
}

@customElement('notification-overlay')
export default class NotificationOverlay extends LitElement {
	static styles = cssify(styles);

	@property({ type: Array })
	notifications: TimeoutNotification[] = [];

	@property({ type: Object })
	clockTimeout: number = null;

	@property({ type: Object })
	reconnectingNotificationId: string = null;

	// === EVENT HANDLERS ===
	handleStatusChange: (e: GlobalStatusChangeEvent) => void;
	handleNotification: (e: NotificationEvent) => void;
	handleError: (e: ErrorEvent) => void;

	async connectedCallback() {
		super.connectedCallback();

		this.tickClock();

		// Handle status change
		this.handleStatusChange = this.onStatusChange.bind(this);
		globalEventGroups.add('status-change', this.handleStatusChange);

		this.handleError = this.onError.bind(this);
		globalEventGroups.add('error', this.handleError);
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		// Remove event handlers
		globalEventGroups.remove('status-change', this.handleStatusChange);
		globalEventGroups.remove('notification', this.handleNotification);
		globalEventGroups.remove('error', this.handleError);

		window.clearTimeout(this.clockTimeout);
	}

	onError(e: ErrorEvent) {
		let error = e.value;
		let id = uuid.v4();

		// Insert notification
		this.notifications.unshift({
			id,
			timestamp: Date.now(),
			life: NOTIFICATION_LIFESPAN,
			timeoutId: null,
			isFading: false,
			mouseOver: false,
			body: { error }
		});
		this.requestUpdate('notifications');
	}

	onStatusChange(e: GlobalStatusChangeEvent) {
		let status = e.value;

		if (status == GlobalStatus.Reconnecting) {
			let id = uuid.v4();

			this.reconnectingNotificationId = id;

			// Insert notification
			this.notifications.unshift({
				id,
				timestamp: Date.now(),
				// Notification is indefinite
				life: null,
				timeoutId: null,
				isFading: false,
				mouseOver: false,
				body: {
					system: {
						icon: 'solid/cloud-slash',
						title: 'Reconnecting',
						body: html`Experiencing connection problems, trying to reconnect...`
					}
				}
			});
			this.requestUpdate('notifications');
		} else {
			// Dismiss reconnecting notification and send new connected notification
			if (this.reconnectingNotificationId) {
				this.dismissNotification(this.reconnectingNotificationId);
				this.reconnectingNotificationId = null;

				let id = uuid.v4();
				let timeoutId = window.setTimeout(() => this.dismissNotification(id), NOTIFICATION_LIFESPAN);

				this.notifications.unshift({
					id,
					timestamp: Date.now(),
					// Notification is indefinite
					life: null,
					timeoutId: null,
					isFading: false,
					mouseOver: false,
					body: {
						system: {
							icon: 'logo/logo-small',
							title: 'Reconnected',
							body: html`Successfully reconnected to Rivet.`
						}
					}
				});
				this.requestUpdate('notifications');
			}
		}
	}

	dismissNotification(id: string) {
		// Get the notification
		let notification = this.notifications.find(n => n.id == id);
		if (!notification) {
			logging.warn(`Attempted to dismiss notification with id ${id} that does not exist`);
			return;
		}

		if (notification.isFading) {
			logging.warn(`Attempted to dismiss notification with id ${id} that is already being dismissed`);
			return;
		} else {
			// Set notification as "fading" for SCSS animation
			notification.isFading = true;
			this.requestUpdate('notifications');

			// Remove it
			window.clearTimeout(notification.timeoutId);
			notification.timeoutId = window.setTimeout(() => {
				this.removeNotification(id);
			}, NOTIFICATION_FADE_LENGTH);
		}
	}

	// Different from dismissNotification, which has a fade animation
	removeNotification(id: string) {
		// Get the notification index
		let index = this.notifications.findIndex(n => n.id == id);
		if (index == -1) {
			logging.warn(`Attempted to remove notification with id ${id} that does not exist`);
			return;
		}

		let notification = this.notifications[index];

		// Stop removal timer on hover
		window.clearTimeout(notification.timeoutId);

		this.notifications.splice(index, 1);
		this.requestUpdate('notifications');
	}

	pointerEnterNotification(id: string, e: Event) {
		// Get the notification
		let notification = this.notifications.find(n => n.id == id);
		if (!notification) return;

		notification.mouseOver = true;

		// Stop removal timer on hover
		if (notification.life !== null) {
			window.clearTimeout(notification.timeoutId);
		}
	}

	pointerLeaveNotification(id: string, e: Event) {
		// Get the notification
		let notification = this.notifications.find(n => n.id == id);
		if (!notification) return;

		// Start removal timer on pointerout
		if (notification.life !== null) {
			notification.mouseOver = false;
			notification.life = NOTIFICATION_LIFESPAN / 2;
			notification.timeoutId = window.setTimeout(
				() => this.dismissNotification(id),
				NOTIFICATION_LIFESPAN
			);
		}
	}

	errorClick(error: any) {
		showAlert(error.name ?? 'Error', error.message ?? error);
	}

	tickClock() {
		if (!document.hidden) {
			for (let notification of this.notifications) {
				if (!notification.mouseOver) {
					notification.life -= TICK_RATE;

					if (notification.life <= 0) this.dismissNotification(notification.id);
				}
			}
		}

		this.clockTimeout = window.setTimeout(this.tickClock.bind(this), TICK_RATE);
	}

	systemClick(notification: TimeoutNotification) {
		let body = notification.body.system;
		showAlert(body.title, body.body);
	}

	render() {
		return html`
			<!-- Offset notification overlay for navbar -->
			<div class="pt-[4rem]"></div>
			<div id="base">
				${repeat(
					this.notifications,
					n => n.id,
					n => {
						let classes = classMap({ fading: n.isFading });

						if (n.body.error) {
							let body = n.body.error;

							return html`<identity-notification
								class=${classes}
								error
								.timestamp=${n.timestamp}
								.trigger=${this.errorClick.bind(this, body)}
								@opened=${this.dismissNotification.bind(this, n.id)}
								@pointerenter=${this.pointerEnterNotification.bind(this, n.id)}
								@pointerleave=${this.pointerLeaveNotification.bind(this, n.id)}
								@pointercancel=${this.pointerLeaveNotification.bind(this, n.id)}
								@close=${this.removeNotification.bind(this, n.id)}
								@drop=${this.dismissNotification.bind(this, n.id)}
								temporary
							>
								<e-svg slot="icon" src="solid/triangle-exclamation"></e-svg>
								<h1 slot="title">${body.name ?? 'Error'}</h1>
								<p slot="details">${body.message ?? body}</p>
							</identity-notification>`;
						} else if (n.body.system) {
							let body = n.body.system;

							return html`<identity-notification
								class=${classes}
								.timestamp=${n.timestamp}
								.trigger=${this.systemClick.bind(this, n)}
								@opened=${this.dismissNotification.bind(this, n.id)}
								@pointerenter=${this.pointerEnterNotification.bind(this, n.id)}
								@pointerleave=${this.pointerLeaveNotification.bind(this, n.id)}
								@pointercancel=${this.pointerLeaveNotification.bind(this, n.id)}
								@close=${this.removeNotification.bind(this, n.id)}
								@drop=${this.dismissNotification.bind(this, n.id)}
								temporary
							>
								<e-svg slot="icon" src=${body.icon ?? 'solid/circle-info'}></e-svg>
								<h1 slot="title">${body.title}</h1>
								<div slot="details">${body.body}</div>
							</identity-notification>`;
						} else {
							logging.warn('unknown notification body', n.body);
							return null;
						}
					}
				)}
			</div>
		`;
	}
}
