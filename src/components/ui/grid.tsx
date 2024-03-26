import { ReactNode } from "react";

const Grid = ({ children }: { columns: 4; children: ReactNode }) => {
  return <div className="grid grid-cols-4 gap-4">{children}</div>;
};

export { Grid };
