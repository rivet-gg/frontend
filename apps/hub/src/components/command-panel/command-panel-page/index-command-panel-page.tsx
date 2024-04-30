import { AllGamesGamesCommandGroup } from "../command-panel-groups/all-games-command-panel-group";
import { AllGroupsCommandGroup } from "../command-panel-groups/all-groups-command-panel-group";
import { RivetCommandGroup } from "../command-panel-groups/rivet-command-panel-group";
import { SuggestionsCommandGroup } from "../command-panel-groups/suggestions-command-panel-group";

export function IndexCommandPanelPage() {
  return (
    <>
      <SuggestionsCommandGroup />
      <RivetCommandGroup />
      <AllGroupsCommandGroup />
      <AllGamesGamesCommandGroup />
    </>
  );
}
