import { LoginFlow } from "@/components/ui/login-flow/login-flow";
import { useNavigate } from "@tanstack/react-router";

export function LoginView() {
  const navigate = useNavigate();

  return (
    <LoginFlow
      onSuccess={async () => {
        await navigate({ to: "/" });
      }}
    />
  );
}
