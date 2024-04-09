import { useStartEmailVerificationMutation } from "@/domains/auth/queries";
import { FormValues as LoginFormValues } from "@/domains/auth/forms/login-form";
import { OtpStep } from "./otp-step";
import { EmailStep } from "./email-step";
import { OtpFormSubmitHandlerArgs, useOtpFormSubmitHandler } from "./hooks";

interface LoginViewProps {
  onSuccess: OtpFormSubmitHandlerArgs["onSuccess"];
}

export const LoginView = ({ onSuccess }: LoginViewProps) => {
  const {
    mutateAsync: startEmailVerif,
    data: emailVerifData,
    reset: resetEmailVerif,
    isSuccess,
  } = useStartEmailVerificationMutation();

  const handleOtpSubmit = useOtpFormSubmitHandler({
    verificationId: emailVerifData?.verificationId,
    onSuccess,
  });

  const handleEmailSubmit = async (values: LoginFormValues) => {
    await startEmailVerif({
      email: values.email,
      captcha: { turnstile: { clientResponse: values.captcha } },
    });
  };

  if (isSuccess) {
    return <OtpStep onSubmit={handleOtpSubmit} onCancel={resetEmailVerif} />;
  }

  return <EmailStep onSubmit={handleEmailSubmit} />;
};
