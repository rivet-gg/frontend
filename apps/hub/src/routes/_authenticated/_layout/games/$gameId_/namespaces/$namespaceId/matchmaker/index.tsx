import { createFileRoute, redirect } from "@tanstack/react-router";

function MatchmakerOverviewView() {
  return "overview";
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/namespaces/$namespaceId/matchmaker/",
)({
  staticData: {
    layout: "full",
  },
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/games/$gameId/namespaces/$namespaceId/matchmaker/lobbies",
      params: {
        gameId: params.gameId,
        namespaceId: params.namespaceId,
      },
    });
  },
  component: MatchmakerOverviewView,
});
