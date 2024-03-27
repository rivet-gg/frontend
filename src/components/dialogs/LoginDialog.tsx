import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { Text } from "../ui/typography";
import { Button } from "@/components/ui/button";
import {
  FormValues as LoginFormValus,
  LoginForm,
} from "@/components/forms/LoginForm";
import {
  OtpForm,
  FormSubmitHandler as OtpFormSubmitHandler,
} from "@/components/forms/OtpForm";
import Turnstile from "react-turnstile";
import { useSuspenseQuery } from "@tanstack/react-query";
import { bootstrapQueryOptions } from "@/queries/bootstrap";
import { Rivet } from "@rivet-gg/api";
import {
  useCompleteEmailVerificationMutation,
  useStartEmailVerificationMutation,
} from "@/queries/auth";
import { useAuth } from "@/contexts/auth";

interface OtpStepProps {
  onComplete: OtpFormSubmitHandler;
}

const OtpStep = ({ onComplete }: OtpStepProps) => {
  return (
    <OtpForm onSubmit={onComplete}>
      <DialogHeader>
        <DialogTitle>Welcome to Rivet!</DialogTitle>
        <DialogDescription>
          Check your email for a verification code from hello@rivet.gg and paste
          it into the area below.
        </DialogDescription>
      </DialogHeader>
      <OtpForm.Code autoFocus />
      <DialogFooter>
        <Button type="button" variant="secondary">
          Cancel
        </Button>
        <OtpForm.Submit>Continue</OtpForm.Submit>
      </DialogFooter>
    </OtpForm>
  );
};

interface CaptchaStepProps {
  captcha: Rivet.cloud.BootstrapCaptcha;
  onComplete: (token: string) => void;
}

const CaptchaStep = ({ captcha, onComplete }: CaptchaStepProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Welcome to Rivet!</DialogTitle>
        <DialogDescription>Let's check if you're a robot.</DialogDescription>
      </DialogHeader>
      {captcha.turnstile ? (
        <Turnstile sitekey={captcha.turnstile.siteKey} onVerify={onComplete} />
      ) : (
        <Text>There was an error loading the captcha.</Text>
      )}
    </>
  );
};

interface EmailStepProps {
  onComplete: (values: LoginFormValus) => void;
}

const EmailStep = ({ onComplete }: EmailStepProps) => {
  return (
    <LoginForm onSubmit={onComplete}>
      <DialogHeader>
        <DialogTitle>Welcome to Rivet!</DialogTitle>
        <DialogDescription>
          Enter your email below to register a Rivet account or login to an
          existing account.
        </DialogDescription>
      </DialogHeader>
      <LoginForm.Email />
      <DialogFooter>
        <Button type="submit">Continue</Button>
      </DialogFooter>
    </LoginForm>
  );
};

interface FormState {
  state: "email" | "captcha" | "otp";
  email?: string;
  token?: string;
}

interface LoginDialogProps {
  trigger: ReactNode;
  onLogin: () => void;
}

export const LoginDialog = ({ trigger, onLogin }: LoginDialogProps) => {
  const auth = useAuth();
  const { data: bootstrapData } = useSuspenseQuery(bootstrapQueryOptions());
  const { mutate: startEmailVerif, data: emailVerifData } =
    useStartEmailVerificationMutation();
  const { mutateAsync: completeEmailVerif } =
    useCompleteEmailVerificationMutation({ onSuccess: onLogin });

  const [{ state, ...data }, setFormState] = useState<FormState>({
    state: "email",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        {state === "otp" ? (
          <OtpStep
            onComplete={async (values, form) => {
              try {
                const response = await completeEmailVerif({
                  code: values.otp,
                  verificationId: emailVerifData!.verificationId!,
                });

                if (
                  response.status === Rivet.auth.CompleteStatus.SwitchIdentity
                ) {
                  await auth.refreshToken();
                  return onLogin();
                }

                if (
                  response.status ===
                  Rivet.auth.CompleteStatus.LinkedAccountAdded
                ) {
                  return onLogin();
                }

                if (
                  response.status == Rivet.auth.CompleteStatus.AlreadyComplete
                ) {
                  return form.setError("otp", {
                    type: "manual",
                    message:
                      "This verification session has already been completed.",
                  });
                } else if (
                  response.status == Rivet.auth.CompleteStatus.Expired
                ) {
                  return form.setError("otp", {
                    type: "manual",
                    message:
                      "This verification session has expired. Please try again.",
                  });
                } else if (
                  response.status == Rivet.auth.CompleteStatus.TooManyAttempts
                ) {
                  return form.setError("otp", {
                    type: "manual",
                    message: "Too many failed attempts. Try again later.",
                  });
                } else if (
                  response.status == Rivet.auth.CompleteStatus.Incorrect
                ) {
                  return form.setError("otp", {
                    type: "manual",
                    message: "The verification code given is incorrect.",
                  });
                } else {
                  return form.setError("otp", {
                    type: "manual",
                    message: "Unknown error",
                  });
                }
              } catch (error) {
                form.setError("otp", {
                  type: "manual",
                  message: "Invalid code",
                });
              }
            }}
          />
        ) : null}
        {state === "captcha" ? (
          <CaptchaStep
            captcha={bootstrapData.captcha}
            onComplete={(token) => {
              startEmailVerif({
                email: data.email!,
                ...(token
                  ? { captcha: { turnstile: { clientResponse: token } } }
                  : {}),
              });
              setFormState((oldState) => ({
                ...oldState,
                state: "otp",
                token,
              }));
            }}
          />
        ) : null}
        {state === "email" ? (
          <EmailStep
            onComplete={(values) => {
              setFormState({
                state: bootstrapData.captcha ? "captcha" : "otp",
                email: values.email,
              });
            }}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};
