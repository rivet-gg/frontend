import type { Rivet } from "@rivet-gg/api";

import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faChessKnight,
  faCircleDollar,
  faCodeBranch,
  faGear,
  faGlobe,
  faHome,
  faKey,
  faPuzzle,
} from "@fortawesome/pro-solid-svg-icons";

type SubNavLink = {
  title: string;
  url: string;
  exact?: boolean;
  icon?: IconProp;
};

export const buildGameSubNav = ({
  isOpenGbEnabled,
}: {
  isOpenGbEnabled?: boolean;
}): SubNavLink[] => {
  const subNav: SubNavLink[] = [
    {
      title: "Overview",
      url: "/games/$gameId/",
      exact: true,
      icon: faHome,
    },
  ];
  if (isOpenGbEnabled) {
    subNav.push({
      title: "Backend",
      url: "/games/$gameId/backend",
      icon: faPuzzle,
    });
  }
  subNav.push(
    {
      title: "Tokens",
      url: "/games/$gameId/tokens",
      icon: faKey,
    },
    {
      title: "Billing",
      url: "/games/$gameId/billing",
      icon: faCircleDollar,
    },
    {
      title: "Settings",
      url: "/games/$gameId/settings",
      icon: faGear,
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
      icon: faHome,
    },
    {
      title: "Versions",
      url: "/games/$gameId/namespaces/$namespaceId/versions/",
      icon: faCodeBranch,
    },
  ];

  if (config.matchmaker) {
    subNav.push({
      title: "Lobbies",
      url: "/games/$gameId/namespaces/$namespaceId/lobbies/",
      icon: faChessKnight,
    });
  }

  if (config.cdn) {
    subNav.push({
      title: "CDN",
      url: "/games/$gameId/namespaces/$namespaceId/cdn/",
      icon: faGlobe,
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
    icon: faKey,
  });

  return subNav;
};
