import { Link as LinkCmp } from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";

export function Feedback() {
  return (
    <LinkCmp asChild>
      <Link search={{ modal: "feedback" }}>Missing something? Spot a bug?</Link>
    </LinkCmp>
  );
}
