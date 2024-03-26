import { useAuth } from "@/auth";
import { LoginDialog } from "@/components/dialogs/LoginDialog";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/stack";
import * as Typography from "@/components/ui/typography";
import { useNavigate } from "@tanstack/react-router";

export const LoginView = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleOtpSubmit = async () => {
    auth.setUser("frog");
    await navigate({ to: "/" });
  };

  return (
    <VStack>
      <Typography.H1>Rivet</Typography.H1>
      <LoginDialog
        onOtpSubmit={handleOtpSubmit}
        trigger={<Button>Register or Login</Button>}
      />
      <Typography.Muted>
        By clicking Register or Login, you agree to the Rivet Terms of Service
        and Privacy Policy.
      </Typography.Muted>
    </VStack>
  );
};
