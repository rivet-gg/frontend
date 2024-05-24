import { PropsWithChildren, useEffect } from "react";
import { PostHogProvider, usePostHog } from "posthog-js/react";
import { useConfig } from "@rivet-gg/components";
import { useAuth } from "@/domains/auth/contexts/auth";

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
