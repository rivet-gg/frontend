import { ActorsListPreview } from "@/domains/project/components/actors/actors-list-preview";
import * as Layout from "@/domains/project/layouts/servers-layout";
import { projectActorsQueryOptions } from "@/domains/project/queries";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Flex,
  WithTooltip,
} from "@rivet-gg/components";
import { Icon, faRefresh } from "@rivet-gg/icons";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { z } from "zod";

function ProjectActorsRoute() {
  const { projectId, environmentId } = Route.useParams();
  const { data, refetch, isRefetching } = useSuspenseInfiniteQuery(
    projectActorsQueryOptions({ projectId, environmentId: environmentId }),
  );
  const { actorId } = Route.useSearch();

  return (
    <Card w="full" h="full" className="flex flex-col">
      <CardHeader className="border-b ">
        <CardTitle className="flex flex-row justify-between items-center">
          Actors
          <Flex gap="2">
            <WithTooltip
              content="Refresh"
              trigger={
                <Button
                  size="icon"
                  isLoading={isRefetching}
                  variant="outline"
                  onClick={() => refetch()}
                >
                  <Icon icon={faRefresh} />
                </Button>
              }
            />
          </Flex>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 w-full p-0">
        {data.length === 0 ? (
          <div className="flex items-center mx-auto flex-col gap-2 my-10">
            <span>No actors created.</span>
          </div>
        ) : (
          <ActorsListPreview
            projectId={projectId}
            environmentId={environmentId}
            actorId={actorId}
          />
        )}
      </CardContent>
    </Card>
  );
}

const searchSchema = z.object({
  actorId: z.string().optional(),
  tab: z.string().optional(),
});

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/environments/$environmentId/actors",
)({
  validateSearch: zodSearchValidator(searchSchema),
  staticData: {
    layout: "full",
  },
  component: ProjectActorsRoute,
  pendingComponent: Layout.Content.Skeleton,
});
