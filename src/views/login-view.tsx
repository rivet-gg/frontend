import { LoginDialog } from "@/components/dialogs/LoginDialog";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/flex";
import * as Typography from "@/components/ui/typography";
import { useNavigate } from "@tanstack/react-router";

export const LoginView = () => {
  const navigate = useNavigate();

  return (
    <VStack>
      <Typography.H1>Rivet</Typography.H1>
      <LoginDialog
        onLogin={async () => {
          await navigate({ to: "/" });
        }}
        trigger={<Button>Register or Login</Button>}
      />
      <Typography.MutedText>
        By clicking Register or Login, you agree to the Rivet Terms of Service
        and Privacy Policy.
      </Typography.MutedText>
    </VStack>
  );
};
