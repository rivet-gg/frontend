import { Page } from "@rivet-gg/components";
import { useParams } from "@tanstack/react-router";
import { ReactNode } from "react";
import { CurrentNamespaceVersionTitle } from "../components/current-namespace-version-title";

interface MatchmakerPageProps {
  children: ReactNode;
}

function NamespacePage({ children }: MatchmakerPageProps) {
  const params = useParams({
    from: "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId",
  });
  return (
    <Page title={<CurrentNamespaceVersionTitle {...params} />}>{children}</Page>
  );
}

export { NamespacePage as Root };
