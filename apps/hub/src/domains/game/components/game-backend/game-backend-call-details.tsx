import { Badge, Dd, Dl, Dt } from "@rivet-gg/components";

export function GameBackendCallDetails() {
  return (
    <Dl>
      <Dt>Request</Dt>
      <Dd>POST /modules/my_module/scripts/my_script/call</Dd>
      <Dt>Status</Dt>
      <Dd>
        <Badge variant="outline">200 OK</Badge>
      </Dd>
      <Dt>Date</Dt>
      <Dd>{new Date().toLocaleString()}</Dd>
      <Dt>Request Headers</Dt>
      <Dd>
        <div className="grid grid-cols-[repeat(2,max-content)] gap-2">
          <span>Content-Type</span>
          <span>application/json</span>

          <span>Authorization</span>
          <span>Bearer 123456</span>
        </div>
      </Dd>
    </Dl>
  );
}
