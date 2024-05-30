import { H1 } from "@rivet-gg/components";
import { LobbyConfigurationCard } from "./lobby-configuration-card";
import { LobbyPreviewCard } from "./lobby-preview-card";

export function IndexPage() {
  return (
    <>
      <H1 mb="4">Sandbox</H1>
      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <LobbyConfigurationCard />
        <LobbyPreviewCard />
      </div>
    </>
  );
}
