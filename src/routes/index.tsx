import { Button } from "@/components/ui/button";
import { redirectUnauthorized } from "@/lib/guards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: ({ context }) => redirectUnauthorized(context),
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Button>Hello</Button>
    </div>
  );
}
