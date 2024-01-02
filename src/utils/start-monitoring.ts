import posthog from 'posthog-js';
import * as Sentry from '@sentry/browser';

posthog.init('phc_6kfTNEAVw7rn1LA51cO3D69FefbKupSWFaM7OUgEpEo', { api_host: 'https://ph.rivet.gg' });

Sentry.init({
	dsn: 'https://66a566505cfb4341732a3d350f2b87e2@o4504307129188352.ingest.sentry.io/4506435887366144',
	integrations: [new posthog.SentryIntegration(posthog, 'rivet-gg', 4506435887366144)]
});
