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
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/forms/LoginForm";
import { OtpForm } from "@/components/forms/OtpForm";

interface LoginDialogProps {
  trigger: ReactNode;
}

export const LoginDialog = ({ trigger }: LoginDialogProps) => {
  const [formState, setFormState] = useState<"email" | "otp">("email");
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        {formState === "otp" ? (
          <OtpForm onSubmit={() => {}}>
            <DialogHeader>
              <DialogTitle>Welcome to Rivet!</DialogTitle>
              <DialogDescription>
                Check your email for a verification code from hello@rivet.gg and
                paste it into the area below.
              </DialogDescription>
            </DialogHeader>
            <OtpForm.Code />
            <DialogFooter>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
              <Button type="submit">Continue</Button>
            </DialogFooter>
          </OtpForm>
        ) : (
          <LoginForm
            onSubmit={() => {
              setFormState("otp");
            }}
          >
            <DialogHeader>
              <DialogTitle>Welcome to Rivet!</DialogTitle>
              <DialogDescription>
                Enter your email below to register a Rivet account or login to
                an existing account.
              </DialogDescription>
            </DialogHeader>
            <LoginForm.Email />
            <DialogFooter>
              <Button type="submit">Continue</Button>
            </DialogFooter>
          </LoginForm>
        )}
      </DialogContent>
    </Dialog>
  );
};
