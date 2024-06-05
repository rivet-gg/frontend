import { useAuth } from "@/domains/auth/contexts/auth";
import { AllGamesGamesCommandGroup } from "../command-panel-groups/all-games-command-panel-group";
import { AllGroupsCommandGroup } from "../command-panel-groups/all-groups-command-panel-group";
import { RivetCommandGroup } from "../command-panel-groups/rivet-command-panel-group";
import { SuggestionsCommandGroup } from "../command-panel-groups/suggestions-command-panel-group";

export function IndexCommandPanelPage() {
  const auth = useAuth();
  return (
    <>
      <SuggestionsCommandGroup />
      <RivetCommandGroup />
      {auth.profile?.identity.isRegistered ? (
        <>
          <AllGroupsCommandGroup />
          <AllGamesGamesCommandGroup />
        </>
      ) : null}
    </>
  );
}
