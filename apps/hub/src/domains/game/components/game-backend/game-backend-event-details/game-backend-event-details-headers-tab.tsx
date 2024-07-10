import type { BackendEvent } from "@/domains/game/queries";
import { CopyArea, Grid, ScrollArea } from "@rivet-gg/components";
import { Fragment } from "react/jsx-runtime";

interface GameBackendEventDetailsHeadersProps {
  event: BackendEvent["event"];
}

export function GameBackendEventDetailsHeadersTab({
  event,
}: GameBackendEventDetailsHeadersProps) {
  return (
    <ScrollArea className="overflow-auto h-full">
      <Grid columns="2" gap="2" px="4" my="4">
        {Object.entries(event.request.headers).map(([name, value]) => (
          <Fragment key={name}>
            <CopyArea variant="discrete" value={name} />
            <CopyArea variant="discrete" value={value} />
          </Fragment>
        ))}
      </Grid>
    </ScrollArea>
  );
}
