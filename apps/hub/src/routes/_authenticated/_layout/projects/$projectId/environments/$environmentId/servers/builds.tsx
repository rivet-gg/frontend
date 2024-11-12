import { ServerTags } from "@/domains/project/components/servers/server-tags";
import * as Layout from "@/domains/project/layouts/servers-layout";
import {
  projectBuildsQueryOptions,
  usePatchBuildTagsMutation,
} from "@/domains/project/queries";
import type { Rivet } from "@rivet-gg/api";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  WithTooltip,
} from "@rivet-gg/components";
import { Icon, faCheckCircle, faInfoCircle, faRefresh } from "@rivet-gg/icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

function ProjectBuildsRoute() {
  const { projectId, environmentId } = Route.useParams();
  const {
    data: builds,
    isRefetching,
    refetch,
  } = useSuspenseQuery(
    projectBuildsQueryOptions({ projectId, environmentId: environmentId }),
  );

  return (
    <Card w="full">
      <CardHeader>
        <Flex items="center" gap="4" justify="between">
          <CardTitle>Builds</CardTitle>
          <Button
            size="icon"
            isLoading={isRefetching}
            variant="outline"
            onClick={() => refetch()}
          >
            <Icon icon={faRefresh} />
          </Button>
        </Flex>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>
                <WithTooltip
                  content="Servers will be created with this build if a version is not explicitly specified."
                  trigger={
                    <span>
                      Current <Icon icon={faInfoCircle} />
                    </span>
                  }
                />
              </TableHead>
              <TableHead>
                <WithTooltip
                  content="Determines if project servers can be created with this build."
                  trigger={
                    <span>
                      Enabled <Icon icon={faInfoCircle} />
                    </span>
                  }
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {builds.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Text className="text-center">There's no builds yet.</Text>
                </TableCell>
              </TableRow>
            ) : null}
            {builds.map((build) => (
              <TableRow key={build.id}>
                <TableCell>{build.name}</TableCell>
                <TableCell>{build.createdAt.toLocaleString()}</TableCell>
                <TableCell>
                  <ServerTags {...build} excludeBuiltIn />
                </TableCell>
                <TableCell>
                  <ProjectBuildLatestButton
                    projectId={projectId}
                    environmentId={environmentId}
                    {...build}
                  />
                </TableCell>
                <TableCell>
                  <ProjectBuildEnabledButton
                    projectId={projectId}
                    environmentId={environmentId}
                    {...build}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

interface ProjectBuildActionButtonProps extends Rivet.servers.Build {
  projectId: string;
  environmentId: string;
}

function ProjectBuildEnabledButton({
  tags,
  id,
  projectId,
  environmentId,
}: ProjectBuildActionButtonProps) {
  const { mutate, isPending } = usePatchBuildTagsMutation();
  if (tags.enabled === "true") {
    return (
      <Button
        variant="outline"
        size="sm"
        isLoading={isPending}
        onClick={() => {
          mutate({
            buildId: id,
            projectId,
            environmentId,
            tags: { enabled: null },
          });
        }}
      >
        Disable
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      isLoading={isPending}
      onClick={() => {
        mutate({
          buildId: id,
          projectId,
          environmentId,
          tags: { enabled: "true" },
        });
      }}
    >
      Enable
    </Button>
  );
}

function ProjectBuildLatestButton({
  tags,
  id,
  projectId,
  environmentId,
}: ProjectBuildActionButtonProps) {
  const { mutate, isPending } = usePatchBuildTagsMutation();

  if (tags.current !== "true") {
    return (
      <Button
        variant="outline"
        size="sm"
        isLoading={isPending}
        onClick={() => {
          mutate({
            buildId: id,
            projectId,
            environmentId,
            tags: { current: "true" },
            exclusiveTags: ["current"],
          });
        }}
      >
        Make current
      </Button>
    );
  }

  return <Icon icon={faCheckCircle} className="fill-primary" />;
}

export const Route = createFileRoute(
  "/_authenticated/_layout/projects/$projectId/environments/$environmentId/servers/builds",
)({
  component: ProjectBuildsRoute,
  pendingComponent: Layout.Content.Skeleton,
});
