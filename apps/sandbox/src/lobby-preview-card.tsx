import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Flex,
} from "@rivet-gg/components";
import { LobbyConnectionBadge } from "./lobby-connection-badge";
import { LobbyConnectionProvider } from "./lobby-connection-context";
import { LobbyConnectionPingBadge } from "./lobby-connection-ping-badge";
import { LobbyConnectionPreview } from "./lobby-connection-preview";

export function LobbyPreviewCard() {
  return (
    <LobbyConnectionProvider>
      <Card className="flex flex-col">
        <CardHeader>
          <Flex items="center" justify="between">
            <CardTitle>Preview</CardTitle>
            <Flex gap="2">
              <LobbyConnectionPingBadge />
              <LobbyConnectionBadge />
            </Flex>
          </Flex>
        </CardHeader>
        <CardContent className="flex-1">
          <LobbyConnectionPreview />
        </CardContent>
      </Card>
    </LobbyConnectionProvider>
  );
}
