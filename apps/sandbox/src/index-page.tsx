import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Flex,
  Grid,
  H1,
} from "@rivet-gg/components";
import { LobbyConfigurationCard } from "./lobby-configuration-card";

export function IndexPage() {
  return (
    <>
      <H1 mb="4">Sandbox</H1>

      <Grid gap="4" columns="2">
        <LobbyConfigurationCard />

        <Card>
          <CardHeader>
            <Flex items="center" justify="between">
              <CardTitle>Preview</CardTitle>
              <Badge variant="destructive">Not connected</Badge>
            </Flex>
          </CardHeader>
          <CardContent>Not connected to lobby.</CardContent>
        </Card>
      </Grid>
    </>
  );
}
