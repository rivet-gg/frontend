import type { Rivet } from "@rivet-gg/api";
import type { Rivet as RivetEe } from "@rivet-gg/api-ee";
import {
  Cloud,
  Cog,
  GitBranch,
  Home,
  KeyRound,
  Puzzle,
  Receipt,
  Swords,
} from "lucide-react";
import type { ReactNode } from "react";

type SubNavLink = {
  title: string;
  url: string;
  exact?: boolean;
  icon?: ReactNode;
};

export const buildGameSubNav = ({
  project,
  isOpenGbEnabled,
}: {
  project?: RivetEe.ee.opengb.Project;
  isOpenGbEnabled?: boolean;
}): SubNavLink[] => {
  const subNav: SubNavLink[] = [
    {
      title: "Overview",
      url: "/games/$gameId/",
      exact: true,
      icon: <Home />,
    },
  ];
  if (project && isOpenGbEnabled) {
    subNav.push({
      title: "Backend",
      url: "/games/$gameId/backend",
      icon: <Puzzle />,
    });
  }
  subNav.push(
    {
      title: "Tokens",
      url: "/games/$gameId/tokens",
      icon: <KeyRound />,
    },
    {
      title: "Billing",
      url: "/games/$gameId/billing",
      icon: <Receipt />,
    },
    {
      title: "Settings",
      url: "/games/$gameId/settings",
      icon: <Cog />,
    },
  );

  return subNav;
};

export const buildNamespaceSubNav = (config: Rivet.cloud.NamespaceConfig) => {
  const subNav: SubNavLink[] = [
    {
      title: "Overview",
      url: "/games/$gameId/namespaces/$namespaceId/",
      exact: true,
      icon: <Home />,
    },
    {
      title: "Versions",
      url: "/games/$gameId/namespaces/$namespaceId/versions/",
      icon: <GitBranch />,
    },
  ];

  if (config.matchmaker) {
    subNav.push({
      title: "Matchmaker",
      url: "/games/$gameId/namespaces/$namespaceId/matchmaker/",
      icon: <Swords />,
    });
  }

  if (config.cdn) {
    subNav.push({
      title: "CDN",
      url: "/games/$gameId/namespaces/$namespaceId/cdn/",
      icon: <Cloud />,
    });
  }

  // if (config.identity) {
  //   subNav.push({
  //     title: "Identity",
  //     url: "/games/$gameId/namespaces/$namespaceId/identity/",
  //   });
  // }

  // if (config.kv) {
  //   subNav.push({
  //     title: "KV",
  //     url: "/games/$gameId/namespaces/$namespaceId/kv/",
  //   });
  // }

  subNav.push({
    title: "Tokens",
    url: "/games/$gameId/namespaces/$namespaceId/tokens/",
    icon: <KeyRound />,
  });

  return subNav;
};
