import { Badge, cn } from "@rivet-gg/components";

function computeBadgeVariant(status: number) {
  if (status > 200 && status < 500) {
    return "warning";
  }
  if (status >= 500) {
    return "destructive";
  }
  return "outline";
}

interface ResponseStatusProps {
  status: number;
}
export const ResponseStatus = ({ status }: ResponseStatusProps) => {
  return (
    <Badge variant={computeBadgeVariant(status)}>
      {status} {status !== 200 ? "ERR" : "OK"}
    </Badge>
  );
};
