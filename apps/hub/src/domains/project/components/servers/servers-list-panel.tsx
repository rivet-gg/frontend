import type { Rivet } from "@rivet-gg/api";
import {
  Badge,
  Button,
  RelativeTime,
  ScrollArea,
  SmallText,
  WithTooltip,
} from "@rivet-gg/components";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { projectServersQueryOptions } from "../../queries";
import { ServerDatacenter } from "./server-datacenter";
import { ServerStatusIndicator } from "./server-status-indicator";
import { ServerTags } from "./server-tags";

interface ServersListPanelProps {
  projectId: string;
  environmentId: string;
  serverId: string | undefined;
}

export function ServersListPanel({
  serverId,
  projectId,
  environmentId,
}: ServersListPanelProps) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      projectServersQueryOptions({ projectId, environmentId }),
    );
  return (
    <ScrollArea className="overflow-auto h-full truncate min-w-0">
      <div className="grid grid-cols-[2rem_min-content_min-content_minmax(1.5rem,3fr)_minmax(min-content,1fr)_minmax(min-content,1fr)] items-center justify-center gap-x-4 gap-y-4 p-4">
        <div className="grid grid-cols-subgrid col-span-full font-bold">
          <div />
          <div>Region</div>
          <div>ID</div>
          <div>Tags</div>
          <div>Created</div>
          <div>Destroyed</div>
        </div>
        <>
          {data.map((server) => (
            <ServerRow
              key={server.id}
              server={server}
              projectId={projectId}
              environmentId={environmentId}
              isCurrent={serverId === server.id}
            />
          ))}
          {hasNextPage ? (
            <div className="col-span-full flex w-full justify-center">
              <Button
                variant="outline"
                mx="4"
                isLoading={isFetchingNextPage}
                onClick={() => fetchNextPage()}
              >
                Load more
              </Button>
            </div>
          ) : (
            <SmallText className="text-muted-foreground text-center col-span-full">
              {data.length === 0
                ? "No servers found"
                : "No more servers to load"}
            </SmallText>
          )}
        </>
      </div>
    </ScrollArea>
  );
}

function ServerRow({
  server,
  projectId,
  environmentId,
  isCurrent,
}: {
  server: Rivet.servers.Server;
  isCurrent?: boolean;
  projectId: string;
  environmentId: string;
}) {
  return (
    <Button
      className="h-auto grid grid-cols-subgrid col-span-full py-2 px-0 group"
      variant={isCurrent ? "secondary" : "outline"}
      asChild
    >
      <Link
        to="."
        search={{ serverId: server.id }}
        className="min-w-0 flex-wrap gap-2"
      >
        <div className="w-full flex justify-center">
          <ServerStatusIndicator {...server} />
        </div>
        <Badge variant="outline">
          <ServerDatacenter
            showLabel="abbreviated"
            projectId={projectId}
            environmentId={environmentId}
            datacenterId={server.datacenter}
          />
        </Badge>
        <SmallText>{server.id.split("-")[0]}</SmallText>
        <WithTooltip
          trigger={
            <div className="relative overflow-r-gradient">
              <ServerTags
                className="flex-nowrap empty:block overflow-hidden"
                {...server}
              />
            </div>
          }
          content={
            <>
              <p className="pb-2 font-bold text-xs">Tags</p>
              <ServerTags className="empty:block" {...server} />
            </>
          }
        />
        <SmallText className="mx-1">
          <WithTooltip
            trigger={<RelativeTime time={new Date(server.createdAt)} />}
            content={new Date(server.createdAt).toLocaleString()}
          />
        </SmallText>

        <SmallText className="mx-1">
          {server.destroyedAt ? (
            <WithTooltip
              trigger={<RelativeTime time={new Date(server.destroyedAt)} />}
              content={new Date(server.destroyedAt).toLocaleString()}
            />
          ) : (
            <span>-</span>
          )}
        </SmallText>
      </Link>
    </Button>
  );
}
