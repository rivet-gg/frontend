import { LoginDialog } from "@/components/dialogs/LoginDialog";
import { VHCenter } from "@/components/layouts/VHCenter";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export const LoginView = () => {
  return (
    <VHCenter>
      <Typography.H1>Rivet</Typography.H1>
      <LoginDialog trigger={<Button>Register or Login</Button>} />
      <Typography.Muted>
        By clicking Register or Login, you agree to the Rivet Terms of Service
        and Privacy Policy.
      </Typography.Muted>
    </VHCenter>
  );
};
