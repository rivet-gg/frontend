import { ReactNode } from "react";

interface CenteredContentProps {
  children: ReactNode;
}

export const CenteredContent = ({ children }: CenteredContentProps) => (
  <div className="flex justify-center items-center h-full flex-col gap-4 min-h-screen">
    {children}
  </div>
);
