import { ReactNode } from "react";

interface VHCenterProps {
  children: ReactNode;
}

export const VHCenter = ({ children }: VHCenterProps) => (
  <div className="flex justify-center items-center h-full flex-col gap-4 min-h-screen">
    {children}
  </div>
);
