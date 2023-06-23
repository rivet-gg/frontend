import logging from './utils/logging';

window.addEventListener('load', () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then(registration => {
				logging.event('Service worker registered', registration);
			})
			.catch(error => {
				logging.warn('Error registering service worker:', error);
			});
	}
});
