import './utils/start-posthog';

import './elements/common/button';
import './elements/common/lazy-image'; // TODO: Use raw img in static pages
import './elements/common/embedded-svg';
import './elements/common/loading-placeholder';
import './elements/common/icon-button';
import './elements/common/range-slider';

window.addEventListener('load', () => {
	document.body.classList.add('loaded');
});
