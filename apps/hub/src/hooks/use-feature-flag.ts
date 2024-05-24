import { useFeatureFlagEnabled } from "posthog-js/react";

// eslint-disable-next-line @typescript-eslint/ban-types
type Flag = "hub-opengb-backend" | (string & {});

export const useFeatureFlag = (flag: Flag) => {
  return useFeatureFlagEnabled(flag);
};
