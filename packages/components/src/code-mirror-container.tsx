import type { PropsWithChildren } from "react";

export function CodeMirrorContainer({ children }: PropsWithChildren) {
  return <div className="border rounded-md overflow-hidden">{children}</div>;
}
