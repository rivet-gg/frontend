import { ReactNode } from "react";
import { Page, PageProps } from "./page";
import { Slot } from "@radix-ui/react-slot";

export interface NarrowPageProps extends PageProps {
  title: string;
  children: ReactNode;
}

export const NarrowPage = (props: NarrowPageProps) => {
  return (
    <Slot className="max-w-screen-md mx-auto">
      <Page {...props} />
    </Slot>
  );
};
