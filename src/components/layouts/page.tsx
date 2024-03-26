import { ReactNode } from "react";

interface PageRootProps {
  children: ReactNode;
}

const PageRoot = ({ children }: PageRootProps) => (
  <div className="container">{children}</div>
);

export { PageRoot as Root };
