import { ServersListPreview } from "@/domains/project/components/servers/servers-list-preview";
import * as Layout from "@/domains/project/layouts/servers-layout";
import { projectServersQueryOptions } from "@/domains/project/queries";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Flex,
  WithTooltip,
} from "@rivet-gg/components";
import { Icon, faPlus, faRefresh } from "@rivet-gg/icons";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { z } from "zod";

function ProjectServersRoute() {
  const { projectId, environmentId } = Route.useParams();
  const { data, refetch, isRefetching } = useSuspenseInfiniteQuery(
    projectServersQueryOptions({ projectId, environmentId: environmentId }),
  );
  const { serverId } = Route.useSearch();

  return (
    <Card w="full" h="full" className="flex flex-col">
      <CardHeader className="border-b ">
        <CardTitle className="flex flex-row justify-between items-center">
          Servers
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
            <WithTooltip
              content="Create a new server"
              trigger={
                <Button
                  asChild
                  size="icon"
                  variant="outline"
                  onClick={() => refetch()}
                >
                  <Link
                    to="."
                    search={{
                      modal: "create-server",
                    }}
                  >
                    <Icon icon={faPlus} />
                  </Link>
                </Button>
              }
            />
          </Flex>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 w-full p-0">
        {data.length === 0 ? (
          <div className="flex items-center mx-auto flex-col gap-2 my-10">
            <span>No servers created.</span>
            <span className="text-xs">
              Servers are created & destroyed automatically as players connect &
              disconnect.
            </span>
          </div>
        ) : (
          <ServersListPreview
            projectId={projectId}
            environmentId={environmentId}
            serverId={serverId}
          />
        )}
      </CardContent>
    </Card>
  );
}

const searchSchema = z.object({
  serverId: z.string().optional(),
});

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/environments/$environmentId/servers",
)({
  validateSearch: zodSearchValidator(searchSchema),
  staticData: {
    layout: "full",
  },
  component: ProjectServersRoute,
  pendingComponent: Layout.Content.Skeleton,
});
