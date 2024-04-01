import { ReactNode } from "react";

interface PageRootProps {
  children: ReactNode;
}

const PageRoot = ({ children }: PageRootProps) => (
  <div className="container pt-4">{children}</div>
);

export { PageRoot as Root };
