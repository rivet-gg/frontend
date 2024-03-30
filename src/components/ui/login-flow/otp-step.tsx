import * as OtpForm from "@/components/forms/otp-form";
import { Button } from "../button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../card";
import { Flex } from "../flex";

interface OtpStepProps {
  onSubmit: OtpForm.SubmitHandler;
  onCancel: () => void;
}

export const OtpStep = ({ onSubmit, onCancel }: OtpStepProps) => {
  return (
    <OtpForm.Form defaultValues={{ otp: "" }} onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Rivet!</CardTitle>
          <CardDescription>
            Check your email for a verification code from hello@rivet.gg and
            paste it into the area below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OtpForm.Code autoFocus />
        </CardContent>
        <CardFooter>
          <Flex gap="4">
            <Button type="button" onClick={onCancel} variant="secondary">
              Cancel
            </Button>
            <OtpForm.Submit>Continue</OtpForm.Submit>
          </Flex>
        </CardFooter>
      </Card>
    </OtpForm.Form>
  );
};
