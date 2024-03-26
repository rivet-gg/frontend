import { ReactNode } from "react";

interface PageWizardRootProps {
  children: ReactNode;
}

const PageWizardRoot = ({ children }: PageWizardRootProps) => (
  <div className="flex flex-1 items-center justify-center">
    <div className="max-w-sm">{children}</div>
  </div>
);

export { PageWizardRoot as Root };
