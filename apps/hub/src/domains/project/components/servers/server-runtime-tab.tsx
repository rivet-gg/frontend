import type { Rivet } from "@rivet-gg/api";
import {
  Code,
  CopyArea,
  Dd,
  Dl,
  Dt,
  Flex,
  Grid,
  ScrollArea,
  SmallText,
  formatDuration,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useId } from "react";
import { Fragment } from "react/jsx-runtime";
import { buildQueryOptions } from "../../queries";
import { ServerTags } from "./server-tags";

interface ServerRuntimeTabProps
  extends Omit<Rivet.servers.Server, "createTs" | "startTs" | "destroyTs"> {
  createTs: Date | undefined;
  startTs: Date | undefined;
  destroyTs: Date | undefined;
  projectId: string;
  environmentId: string;
}

export function ServerRuntimeTab({
  projectId,
  environmentId,
  lifecycle,
  runtime,
  resources,
}: ServerRuntimeTabProps) {
  const { data } = useSuspenseQuery(
    buildQueryOptions({ projectId, environmentId, buildId: runtime.build }),
  );

  const buildId = useId();

  return (
    <ScrollArea className="overflow-auto h-full px-4 my-2">
      <Flex gap="2" direction="col">
        <Dl>
          <Dt>Kill timeout</Dt>
          <Dd>{formatDuration(lifecycle.killTimeout || 0)}</Dd>
          <Dt>Resources</Dt>
          <Dd>
            {resources.cpu / 1000} CPU cores, {resources.memory} MB RAM
          </Dd>
          {data ? (
            <>
              <Dt id={buildId}>Build</Dt>
              <Dd />
              <div aria-describedby={buildId} className="col-span-2">
                <Dl className="ml-5">
                  <Dt>Image</Dt>
                  <Dd>{data.name}</Dd>
                  <Dt>Created At</Dt>
                  <Dd>{data.createdAt.toLocaleString()}</Dd>
                  <Dt>Tags</Dt>
                  <Dd>
                    {Object.keys(data.tags).length > 0 ? (
                      <ServerTags tags={data.tags} />
                    ) : (
                      "None"
                    )}
                  </Dd>
                </Dl>
              </div>
            </>
          ) : (
            <>
              <Dt>Build</Dt>
              <Dd>Unknown</Dd>
            </>
          )}
          <Dt>Arguments</Dt>
          <Dd>
            {runtime.arguments?.length === 0 ? (
              <SmallText>No arguments provided.</SmallText>
            ) : (
              <Code>{runtime.arguments?.join(" ")}</Code>
            )}
          </Dd>
          <Dt>Environment</Dt>
          <Dd>
            {Object.keys(runtime.environment || {}).length === 0 ? (
              <SmallText>No environment variables set.</SmallText>
            ) : (
              <Grid columns="2" gap="2">
                {Object.entries(runtime.environment || {}).map(
                  ([name, value]) => (
                    <Fragment key={name}>
                      <CopyArea variant="discrete" value={name} />
                      <CopyArea variant="discrete" value={value} />
                    </Fragment>
                  ),
                )}
              </Grid>
            )}
          </Dd>
        </Dl>
      </Flex>
    </ScrollArea>
  );
}
