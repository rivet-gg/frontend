import { useMutation } from "@tanstack/react-query";
import { rivetClient } from "./global";
import { Rivet } from "@rivet-gg/api";

export const useStartEmailVerificationMutation = () => {
  return useMutation({
    mutationFn: (data: Rivet.auth.identity.StartEmailVerificationRequest) =>
      rivetClient.auth.identity.email.startEmailVerification(data),
  });
};

export const useCompleteEmailVerificationMutation = (
  opts: {
    onSuccess?: (
      data: Rivet.auth.identity.CompleteEmailVerificationResponse,
    ) => void;
  } = {},
) => {
  return useMutation({
    mutationFn: (data: Rivet.auth.identity.CompleteEmailVerificationRequest) =>
      rivetClient.auth.identity.email.completeEmailVerification(data),
    ...opts,
  });
};
