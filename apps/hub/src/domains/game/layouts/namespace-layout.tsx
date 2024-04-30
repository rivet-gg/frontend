import { Page } from "@rivet-gg/components";
import { ReactNode } from "react";
import { CurrentNamespaceVersionTitle } from "../components/current-namespace-version-title";

interface MatchmakerPageProps {
  children: ReactNode;
  namespaceId: string;
  gameId: string;
}

function NamespacePage({ children, namespaceId, gameId }: MatchmakerPageProps) {
  return (
    <Page
      title={
        <CurrentNamespaceVersionTitle
          gameId={gameId}
          namespaceId={namespaceId}
        />
      }
    >
      {children}
    </Page>
  );
}

function EmptyRoot({ children }: { children: ReactNode }) {
  return <Page title="Unknown Namespace">{children}</Page>;
}

export { NamespacePage as Root, EmptyRoot };
