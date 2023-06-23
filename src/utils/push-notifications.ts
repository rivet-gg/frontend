import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import firebaseAuth from '../data/firebase.json';
import logging from './logging';
import global from './global';
import * as api from '../utils/api';
import { ls } from './cache';

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseAuth);
const FIREBASE_MESSAGING = navigator.serviceWorker === undefined ? null : getMessaging(FIREBASE_APP);

export default class PushNotifications {
	enabled = false;
	initiated = false;

	registration: ServiceWorkerRegistration = null;

	constructor() {
		this.enabled = ls.getBoolean(`push-notifications`, false);

		// Start service worker
		if (this.enabled) this.enable();
	}

	init() {
		if (navigator.serviceWorker === undefined) {
			logging.warn('Service worker not enabled');
			return;
		}

		if (!FIREBASE_MESSAGING) return;

		navigator.serviceWorker.getRegistration().then(registration => {
			if (registration) {
				getToken(FIREBASE_MESSAGING, {
					vapidKey:
						'BKxHW6m8-HZbEcjV2NtRQS8q55BuNEjEOg9bWGIzcS8SpmIy1ygXKAwX6X-8ooRNm8bmZU0tBF6YIii5QwLWuuY',
					serviceWorkerRegistration: registration
				})
					.then(currentToken => {
						if (currentToken) {
							logging.event('Push notifications active');

							let serviceID = 'firebase';
							let needsUpdate = this.store(serviceID, currentToken);

							// Update registration
							if (needsUpdate) {
								if (serviceID == 'firebase') {
									global.live.portal
										.registerNotifications({
											service: {
												firebase: {
													accessKey: currentToken
												}
											}
										})
										.catch(err => logging.error('Notification registration error', err));
								}
							}
						} else {
							logging.event('No push notification token available');

							global.pushNotifications.disable();
						}
					})
					.catch(err => {
						global.pushNotifications.disable();
						logging.event('Push notifications activation failed', err);
					});

				this.initiated = true;
			}
		});
	}

	enable() {
		this.enabled = true;
		ls.setBoolean('push-notifications', true);

		if (!this.initiated) this.init();
	}

	disable() {
		this.enabled = false;
		this.initiated = false;
		ls.setBoolean('push-notifications', false);

		global.live.portal
			.unregisterNotifications({
				service: api.portal.NotificationUnregisterService.FIREBASE
			})
			.catch(err => logging.error('Notification un-registration error', err));

		ls.delete('push-notifications-firebase');
		logging.event('Push notifications inactive');
	}

	store(serviceID: string, value: string): boolean {
		let id = `push-notifications-${serviceID}`;

		// Update registration
		if (ls.getString(id, '') != value) {
			ls.setString(id, value);

			return true;
		}

		return false;
	}
}
