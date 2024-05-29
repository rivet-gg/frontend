import { Tabs, TabsContent, TabsList, TabsTrigger } from "@rivet-gg/components";
import { CreateLobbyCard } from "./create-lobby-card";
import { FindLobbyCard } from "./find-lobby-card";

export function LobbyConfigurationCard() {
  return (
    <Tabs defaultValue="create">
      <TabsList>
        <TabsTrigger value="create">Create lobby</TabsTrigger>
        <TabsTrigger value="find">Find lobby</TabsTrigger>
      </TabsList>
      <TabsContent value="create">
        <CreateLobbyCard />
      </TabsContent>
      <TabsContent value="find">
        <FindLobbyCard />
      </TabsContent>
    </Tabs>
  );
}
