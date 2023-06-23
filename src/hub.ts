import './utils/start-posthog';
import './elements/mod';
import numbro from 'numbro';
import UIRoot from './elements/root/ui-root';
import global from './utils/global';
import logging from './utils/logging';

numbro.setDefaults({ roundingFunction: Math.floor });

window.addEventListener('load', async () => {
	// Add main UI
	let uiRoot = new UIRoot();
	document.body.appendChild(uiRoot);

	// initiate
	logging.event('Running hub...');
	await global.init();
});
