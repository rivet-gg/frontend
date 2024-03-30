import { FormSubmitHandler } from "@/components/forms/otp-form";
import { useAuth } from "@/contexts/auth";
import { useCompleteEmailVerificationMutation } from "@/queries/auth";
import { Rivet } from "@rivet-gg/api";
import { useCallback } from "react";

const RESPONSE_MAP = {
  [Rivet.auth.CompleteStatus.SwitchIdentity]: {
    type: Rivet.auth.CompleteStatus.SwitchIdentity,
  },
  [Rivet.auth.CompleteStatus.LinkedAccountAdded]: {
    type: Rivet.auth.CompleteStatus.LinkedAccountAdded,
  },
  [Rivet.auth.CompleteStatus.AlreadyComplete]: {
    type: "error",
    message: "This verification session has already been completed.",
  },
  [Rivet.auth.CompleteStatus.Expired]: {
    type: "error",
    message: "This verification session has expired. Please try again.",
  },
  [Rivet.auth.CompleteStatus.TooManyAttempts]: {
    type: "error",
    message: "Too many failed attempts. Try again later.",
  },
  [Rivet.auth.CompleteStatus.Incorrect]: {
    type: "error",
    message: "The verification code given is incorrect.",
  },
  default: {
    type: "error",
    message: "Unknown error",
  },
} as const;

export interface OtpFormSubmitHandlerArgs {
  verificationId: string | undefined;
  onSuccess: () => void;
}

export const useOtpFormSubmitHandler = ({
  onSuccess,
  verificationId,
}: OtpFormSubmitHandlerArgs) => {
  const { refreshToken } = useAuth();
  const { mutateAsync } = useCompleteEmailVerificationMutation();

  const callback: FormSubmitHandler = useCallback(
    async (values, form) => {
      if (!verificationId) {
        return form.setError("otp", {
          type: "manual",
          message: "Unknown error. Please try again.",
        });
      }
      try {
        const response = await mutateAsync({
          verificationId,
          code: values.otp,
        });

        const translatedResponse =
          RESPONSE_MAP[response.status] || RESPONSE_MAP.default;

        if (translatedResponse.type === "error") {
          return form.setError("otp", {
            type: "manual",
            message: translatedResponse.message,
          });
        }

        if (
          translatedResponse.type === Rivet.auth.CompleteStatus.SwitchIdentity
        ) {
          await refreshToken();
          return onSuccess();
        }

        return onSuccess();
      } catch {
        return form.setError("otp", {
          type: "manual",
          message: "Invalid verification code",
        });
      }
    },
    [refreshToken, mutateAsync, onSuccess, verificationId],
  );

  return callback;
};
