import { useFeatureFlag } from "@/hooks/use-feature-flag";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Link,
} from "@rivet-gg/components";
import { Gem, X } from "lucide-react";
import { usePostHog } from "posthog-js/react";

export function UpgradedHubAlert() {
  const posthog = usePostHog();
  const isEnabled = useFeatureFlag("hub-upgraded-alert");

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="container py-4">
      <Alert>
        <Gem className="size-5" />
        <AlertTitle>The Rivet Hub has been upgraded.</AlertTitle>
        <AlertDescription>
          Want to switch back? Visit the old hub{" "}
          <Link href="https://old.rivet.gg">here</Link>.
        </AlertDescription>
        <div className="absolute top-4 right-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              posthog.setPersonProperties({
                hubUpgradedAlertDismissed: true,
              });
            }}
          >
            <X />
          </Button>
        </div>
      </Alert>
    </div>
  );
}
