import { useAuth } from "@/domains/auth/contexts/auth";
import { getConfig, useConfig } from "@rivet-gg/components";
import * as Sentry from "@sentry/browser";
import posthog from "posthog-js";
import { PostHogProvider, usePostHog } from "posthog-js/react";
import { type PropsWithChildren, useEffect } from "react";

const config = getConfig();
if (config.sentry?.dsn) {
  Sentry.init({
    dsn: config.sentry.dsn,
    integrations: [
      new posthog.SentryIntegration(
        posthog,
        "rivet-gg",
        Number.parseInt(config.sentry.projectId, 10),
      ),
    ],
  });
}

export function IdentifyUser() {
  const posthog = usePostHog();
  const { profile } = useAuth();

  useEffect(() => {
    const identity = profile?.identity;
    if (identity) {
      posthog.identify(`user:${identity.identityId}`, {
        name: identity.displayName,
        email: identity.linkedAccounts.find((x) => x.email)?.email?.email,
        avatar: identity.avatarUrl,
        isAdmin: identity.isAdmin,
      });
    }
  }, [posthog, profile]);

  return null;
}

export function ThirdPartyProviders({ children }: PropsWithChildren) {
  const config = useConfig();

  const posthog = config.posthog ? (
    <PostHogProvider
      apiKey={config.posthog.apiKey}
      options={{
        api_host: config.posthog.apiHost,
        debug: import.meta.env.DEV,
      }}
    >
      {children}
    </PostHogProvider>
  ) : null;

  return posthog;
}
