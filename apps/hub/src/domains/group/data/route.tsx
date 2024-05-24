import { Cog, Home, Users } from "lucide-react";

export const groupSubNav = [
  {
    title: "Overview",
    url: "/teams/$groupId/",
    exact: true,
    icon: <Home />,
  },
  {
    title: "Members",
    url: "/teams/$groupId/members",
    icon: <Users />,
  },
  // {
  //   title: "Billing",
  //   url: "/teams/$groupId/billing",
  // },
  {
    title: "Settings",
    url: "/teams/$groupId/settings",
    icon: <Cog />,
  },
];
