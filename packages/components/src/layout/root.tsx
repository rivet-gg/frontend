import type { PropsWithChildren } from "react";

function Root({ children }: PropsWithChildren) {
  return <div className="flex min-h-screen flex-col">{children}</div>;
}

function Main({ children }: PropsWithChildren) {
  return <main className="bg-muted/20 flex flex-1 flex-col">{children}</main>;
}

function Footer({ children }: PropsWithChildren) {
  return (
    <footer className="text-muted-foreground bg-muted/20 p-4 text-center text-sm">
      <div className="container">{children}</div>
    </footer>
  );
}

export { Root, Main, Footer };
