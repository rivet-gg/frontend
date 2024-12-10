import type { Rivet } from "@rivet-gg/api";
import {
  Button,
  RelativeTime,
  ScrollArea,
  SmallText,
  WithTooltip,
} from "@rivet-gg/components";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { projectActorsQueryOptions } from "../../queries";
import { ActorRegion } from "./actor-region";
import { ActorStatusIndicator, getActorStatus } from "./actor-status-indicator";
import { ActorTags } from "./actor-tags";

interface ActorsListPanelProps {
  projectId: string;
  environmentId: string;
  actorId: string | undefined;
}

export function ActorsListPanel({
  actorId,
  projectId,
  environmentId,
}: ActorsListPanelProps) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      projectActorsQueryOptions({ projectId, environmentId }),
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
          {data.map((actor) => (
            <ActorRow
              key={actor.id}
              actor={actor}
              projectId={projectId}
              environmentId={environmentId}
              isCurrent={actorId === actor.id}
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
            <SmallText className="text-muted-foreground text-center col-span-full my-4">
              {data.length === 0
                ? "No actors found."
                : "No more actors to load."}
            </SmallText>
          )}
        </>
      </div>
    </ScrollArea>
  );
}

function ActorRow({
  actor,
  projectId,
  environmentId,
  isCurrent,
}: {
  actor: Rivet.actor.Actor;
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
        search={{
          actorId: actor.id,
          tab: getActorStatus(actor) === "crashed" ? "error" : "output",
        }}
        className="min-w-0 flex-wrap gap-2"
      >
        <div className="w-full flex justify-center">
          <ActorStatusIndicator {...actor} />
        </div>
        <SmallText className="font-semibold">
          <ActorRegion
            showLabel="abbreviated"
            projectId={projectId}
            environmentId={environmentId}
            regionId={actor.region}
          />
        </SmallText>
        <SmallText>{actor.id.split("-")[0]}</SmallText>
        <WithTooltip
          trigger={
            <div className="relative overflow-r-gradient">
              <ActorTags
                className="flex-nowrap empty:block overflow-hidden"
                truncate={false}
                {...actor}
              />
            </div>
          }
          content={
            <>
              <p className="pb-2 font-bold text-xs">Tags</p>
              <ActorTags className="empty:block" truncate={false} {...actor} />
            </>
          }
        />
        <SmallText className="mx-1">
          <WithTooltip
            trigger={<RelativeTime time={new Date(actor.createdAt)} />}
            content={new Date(actor.createdAt).toLocaleString()}
          />
        </SmallText>

        <SmallText className="mx-1">
          {actor.destroyedAt ? (
            <WithTooltip
              trigger={<RelativeTime time={new Date(actor.destroyedAt)} />}
              content={new Date(actor.destroyedAt).toLocaleString()}
            />
          ) : (
            <span>-</span>
          )}
        </SmallText>
      </Link>
    </Button>
  );
}
