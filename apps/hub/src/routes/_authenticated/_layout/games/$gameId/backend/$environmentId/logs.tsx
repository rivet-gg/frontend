import { GameBackendCallDetails } from "@/domains/game/components/game-backend/game-backend-call-details";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dd,
  Dl,
  Dt,
  Flex,
  Grid,
  LogsView,
  SmallText,
  Strong,
  Text,
} from "@rivet-gg/components";
import { createFileRoute } from "@tanstack/react-router";

function GameBackendEnvironmentIdLogsRoute() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex gap="4">
          <Flex direction="col" gap="4">
            <Button variant="secondary">
              <Flex gap="2" items="center">
                <Badge variant="outline">200 OK</Badge>
                <Badge>CALL</Badge> my_module.my_script
                <SmallText>1:23 PM</SmallText>
              </Flex>
            </Button>
            <Button variant="outline">
              <Flex gap="2" items="center">
                <Badge variant="outline">200 OK</Badge>
                <Badge>CALL</Badge> my_module.my_script
                <SmallText>1:23 PM</SmallText>
              </Flex>
            </Button>
          </Flex>
          <div className="border-l h-full pl-4 flex-1">
            <Dl w="1/2">
              <Dt>Module</Dt>
              <Dd>my_module</Dd>
              <Dt>Script</Dt>
              <Dd>my_script</Dd>
            </Dl>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Advanced</AccordionTrigger>
                <AccordionContent>
                  <GameBackendCallDetails />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <LogsView timestamps={[]} lines={[]} showFollowToggle={false} />
          </div>
        </Flex>
      </CardContent>
    </Card>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/backend/$environmentId/logs",
)({
  // TODO: add beforeLoad hook
  component: GameBackendEnvironmentIdLogsRoute,
});
