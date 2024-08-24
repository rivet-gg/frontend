import { useFeatureFlagEnabled } from "posthog-js/react";

export type FeatureFlag =
  | "hub-opengb-backend"
  | "hub-upgraded-alert"
  | "hub-lobbies-v2"
  | "hub-dynamic-server-creation"
  | (string & {});

export const useFeatureFlag = (flag: FeatureFlag) => {
  return useFeatureFlagEnabled(flag);
};
