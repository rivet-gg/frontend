import { Flex } from "@/components/ui/flex";
import { useSuspenseQuery } from "@tanstack/react-query";
import { groupGamesQueryOptions } from "@/queries/games";
import { Page } from "@/components/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GroupIndexViewProps {
  groupId: string;
}

export function GroupIndexView({ groupId }: GroupIndexViewProps) {
  const { data } = useSuspenseQuery(groupGamesQueryOptions(groupId));

  return (
    <Page title={data.displayName}>
      <Flex direction="row" gap="4">
        <Flex w="2/3" direction="row">
          <Card>
            <CardHeader>
              <CardTitle>Games</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </Flex>
        <Flex w="1/3" direction="row">
          <Card>
            <CardHeader>
              <CardTitle>Members</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </Flex>
      </Flex>
    </Page>
  );
}
