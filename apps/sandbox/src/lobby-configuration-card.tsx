import {
  Card,
  CardHeader,
  CardTitle,
  Flex,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@rivet-gg/components";
import { CreateLobbyCard } from "./create-lobby-card";
import { FindLobbyCard } from "./find-lobby-card";

export function LobbyConfigurationCard() {
  return (
    <Card className="flex flex-col">
      <Tabs defaultValue="create" className="flex flex-col flex-1">
        <CardHeader>
          <Flex items="center" justify="between">
            <CardTitle>Configuration</CardTitle>
            <TabsList>
              <TabsTrigger value="create">Create lobby</TabsTrigger>
              <TabsTrigger value="find">Find lobby</TabsTrigger>
            </TabsList>
          </Flex>
        </CardHeader>
        <TabsContent
          value="create"
          className="flex-1 data-[state='active']:flex flex-col"
        >
          <CreateLobbyCard />
        </TabsContent>
        <TabsContent
          value="find"
          className="flex-1 data-[state='active']:flex flex-col"
        >
          <FindLobbyCard />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
