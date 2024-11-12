import { projectQueryOptions } from "@/domains/project/queries";
import { GuardEnterprise } from "@/lib/guards";
import { CommandGroup, CommandItem } from "@rivet-gg/components";
import { Icon, faCircleDollar, faCog, faHome, faKey } from "@rivet-gg/icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCommandPanelNavigation } from "../command-panel-navigation-provider";
import { EnvironmentsCommandPanelItems } from "../environments-command-panel-items";

interface ProjectCommandPanelPage {
  projectId: string;
}

export function ProjectCommandPanelPage({
  projectId,
}: ProjectCommandPanelPage) {
  const { data } = useSuspenseQuery(projectQueryOptions(projectId));

  const { navigate } = useCommandPanelNavigation();

  return (
    <>
      <CommandGroup heading={data.displayName}>
        <CommandItem
          onSelect={() => {
            navigate({ to: "/projects/$projectId", params: { projectId } });
          }}
        >
          <Icon icon={faHome} />
          Overview
        </CommandItem>
        <GuardEnterprise>
          <CommandItem
            onSelect={() => {
              navigate({
                to: "/projects/$projectId/billing",
                params: { projectId },
              });
            }}
          >
            <Icon icon={faCircleDollar} />
            Billing
          </CommandItem>
        </GuardEnterprise>
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/projects/$projectId/settings",
              params: { projectId },
            });
          }}
        >
          <Icon icon={faCog} />
          Settings
        </CommandItem>
      </CommandGroup>
      <CommandGroup heading="Environments">
        <EnvironmentsCommandPanelItems
          projectId={projectId}
          namespaces={data.namespaces}
        />
      </CommandGroup>
      <CommandGroup heading="Tokens">
        <CommandItem
          onSelect={() => {
            navigate({
              to: "/projects/$projectId",
              params: { projectId },
              search: { modal: "cloud-token" },
            });
          }}
        >
          <Icon icon={faKey} />
          Generate a cloud token
        </CommandItem>
      </CommandGroup>
    </>
  );
}
