import * as LoginForm from "@/components/forms/login-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../card";
import { Flex } from "../flex";
import { MutedText } from "../typography";

interface EmailStepProps {
  onSubmit: LoginForm.SubmitHandler;
}

export const EmailStep = ({ onSubmit }: EmailStepProps) => {
  return (
    <LoginForm.Form defaultValues={{ email: "" }} onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Flex gap="4" direction="col">
            <LoginForm.Email />
            <LoginForm.Captcha />
            <MutedText>
              By clicking Continue, you agree to the Rivet Terms of Service and
              Privacy Policy.
            </MutedText>
          </Flex>
        </CardContent>
        <CardFooter>
          <LoginForm.Submit fullWidth>Continue</LoginForm.Submit>
        </CardFooter>
      </Card>
    </LoginForm.Form>
  );
};
