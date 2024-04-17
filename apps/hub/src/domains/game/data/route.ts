import { Rivet } from "@rivet-gg/api";

export const gameSubNav = [
  {
    title: "Overview",
    url: "/games/$gameId/",
    exact: true,
  },
  {
    title: "Backend",
    url: "/games/$gameId/backend",
  },
  {
    title: "Tokens",
    url: "/games/$gameId/tokens",
  },
  {
    title: "Billing",
    url: "/games/$gameId/billing",
  },
  {
    title: "Settings",
    url: "/games/$gameId/settings",
  },
];

export const buildNamespaceSubNav = (config: Rivet.cloud.NamespaceConfig) => {
  const subNav: { title: string; url: string; exact?: boolean }[] = [
    {
      title: "Overview",
      url: `/games/$gameId/namespaces/$namespaceId/`,
      exact: true,
    },
    {
      title: "Versions",
      url: `/games/$gameId/namespaces/$namespaceId/versions/`,
    },
  ];

  if (config.matchmaker) {
    subNav.push({
      title: "Matchmaker",
      url: "/games/$gameId/namespaces/$namespaceId/matchmaker/",
    });
  }

  if (config.cdn) {
    subNav.push({
      title: "CDN",
      url: "/games/$gameId/namespaces/$namespaceId/cdn/",
    });
  }

  if (config.identity) {
    subNav.push({
      title: "Identity",
      url: "/games/$gameId/namespaces/$namespaceId/identity/",
    });
  }

  if (config.kv) {
    subNav.push({
      title: "KV",
      url: "/games/$gameId/namespaces/$namespaceId/kv/",
    });
  }

  subNav.push({
    title: "Tokens",
    url: "/games/$gameId/namespaces/$namespaceId/tokens/",
  });

  return subNav;
};
