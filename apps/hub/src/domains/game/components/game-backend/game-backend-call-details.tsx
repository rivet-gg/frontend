import { Badge, Dd, Dl, Dt } from "@rivet-gg/components";
import { Fragment } from "react";
import { ResponseStatus } from "../../data/response-status";
import type { BackendEvent } from "../../queries";

interface GameBackendCallDetailsProps extends BackendEvent {}

export function GameBackendCallDetails({
  eventTimestamp,
  event,
  outcome,
}: GameBackendCallDetailsProps) {
  return (
    <Dl>
      <Dt>Request</Dt>
      <Dd className="break-all">
        {event.request.method} {event.request.pathname}
      </Dd>
      <Dt>Status</Dt>
      <Dd>
        <ResponseStatus status={event.response.status} />
      </Dd>
      <Dt>Date</Dt>
      <Dd>{new Date(+eventTimestamp).toLocaleString()}</Dd>
      <Dt>Request Headers</Dt>
      <Dd>
        <div className="grid grid-cols-[minmax(auto,1fr)_minmax(auto,3fr)] gap-2 overflow-auto">
          {Object.entries(event.request.headers).map(([key, value]) => (
            <Fragment key={key}>
              <span>{key}</span>
              <span className="break-all">{value}</span>
            </Fragment>
          ))}
        </div>
      </Dd>
    </Dl>
  );
}
