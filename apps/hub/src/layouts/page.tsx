import { Skeleton } from "@rivet-gg/components";
import type { ReactNode } from "react";

interface PageRootProps {
  children: ReactNode;
}

const PageRoot = ({ children }: PageRootProps) => (
  <div className="container pt-4">{children}</div>
);

const PageRootSkeleton = () => {
  return (
    <div className="container pt-4">
      <Skeleton className="my-8 h-12 w-1/3" />
      <div className="mb-4 flex flex-row gap-4">
        <Skeleton className="h-64 w-2/3" />
        <Skeleton className="h-64 w-1/3" />
      </div>
      <Skeleton className="mb-4 h-64 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
};

PageRoot.Skeleton = PageRootSkeleton;

export { PageRoot as Root };
