import { faGear, faHome, faUsers } from "@fortawesome/pro-solid-svg-icons";

export const groupSubNav = [
  {
    title: "Overview",
    url: "/teams/$groupId/",
    exact: true,
    icon: faHome,
  },
  {
    title: "Members",
    url: "/teams/$groupId/members",
    icon: faUsers,
  },
  // {
  //   title: "Billing",
  //   url: "/teams/$groupId/billing",
  // },
  {
    title: "Settings",
    url: "/teams/$groupId/settings",
    icon: faGear,
  },
];
