import { ActorTags } from "@/domains/project/components/actors/actor-tags";
import { ProjectBuildsTableActions } from "@/domains/project/components/project-builds-table-actions";
import * as Layout from "@/domains/project/layouts/servers-layout";
import {
  projectBuildsQueryOptions,
  usePatchActorBuildTagsMutation,
} from "@/domains/project/queries";
import type { Rivet } from "@rivet-gg/api";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CopyButton,
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
              <TableHead>Id</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>
                <WithTooltip
                  content="Actors will be created with this build if a version is not explicitly specified."
                  trigger={
                    <span>
                      Current <Icon icon={faInfoCircle} />
                    </span>
                  }
                />
              </TableHead>
              <TableHead />
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
                <TableCell>
                  <WithTooltip
                    content={build.id}
                    trigger={
                      <CopyButton value={build.id}>
                        <button type="button">{build.id.split("-")[0]}</button>
                      </CopyButton>
                    }
                  />
                </TableCell>
                <TableCell>{build.createdAt.toLocaleString()}</TableCell>
                <TableCell>
                  <ActorTags {...build} excludeBuiltIn />
                </TableCell>
                <TableCell>
                  <ProjectBuildLatestButton
                    projectId={projectId}
                    environmentId={environmentId}
                    {...build}
                  />
                </TableCell>
                <TableCell>
                  <ProjectBuildsTableActions buildId={build.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

interface ProjectBuildLatestButtonProps extends Rivet.actor.Build {
  projectId: string;
  environmentId: string;
}

function ProjectBuildLatestButton({
  tags,
  id,
  projectId,
  environmentId,
}: ProjectBuildLatestButtonProps) {
  const { mutate, isPending } = usePatchActorBuildTagsMutation();

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
  "/_authenticated/_layout/projects/$projectId/environments/$environmentId/builds",
)({
  component: ProjectBuildsRoute,
  pendingComponent: Layout.Content.Skeleton,
});
