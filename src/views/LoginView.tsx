import { CenteredContent } from "@/components/layouts/CenteredContent";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export const LoginView = () => {
  return (
    <CenteredContent>
      <Typography.h1>Welcome to Rivet!</Typography.h1>
      <Button>Register or Login</Button>
      <Typography.muted>
        By clicking Register or Login, you agree to the Rivet Terms of Service
        and Privacy Policy.
      </Typography.muted>
    </CenteredContent>
  );
};
