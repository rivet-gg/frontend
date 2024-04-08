import { Tabs, TabsList, TabsTrigger } from "@rivet-gg/components";
import { useNavigate } from "@tanstack/react-router";

type Tabs = "overview" | "members" | "billing" | "settings";

interface GroupPageTabsProps {
  currentTab: Tabs;
  groupId: string;
}

export function GroupPageTabs({ currentTab, groupId }: GroupPageTabsProps) {
  const navigate = useNavigate();

  const handleValueChange = (value: string) => {
    if (value === "overview") {
      return navigate({ to: `/teams/$groupId`, params: { groupId } });
    }
    if (value === "members") {
      return navigate({ to: `/teams/$groupId/members`, params: { groupId } });
    }
    if (value === "billing") {
      return navigate({ to: `/teams/$groupId/billing`, params: { groupId } });
    }
    if (value === "settings") {
      return navigate({ to: `/teams/$groupId/settings`, params: { groupId } });
    }
  };

  return (
    <Tabs defaultValue={currentTab} onValueChange={handleValueChange} mb="4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
