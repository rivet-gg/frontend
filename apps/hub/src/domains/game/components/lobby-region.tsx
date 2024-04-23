import { Flex, WithTooltip } from "@rivet-gg/components";
import { Rivet } from "@rivet-gg/api";
import { converEmojiToUriFriendlyString } from "@/lib/emoji";
import { config } from "@/lib/config";

const REGION_EMOJI = {
  local: "🏠",
  unknown: "❓",
  atlanta: "🇺🇸", // Atlanta
  san_francisco: "🇺🇸", // San Francisco
  frankfurt: "🇩🇪", // Frankfurt
  sydney: "🇦🇺", // Sydney
  tokyo: "🇯🇵", // Tokyo
  mumbai: "🇮🇳", // Mumbai
  toronto: "🇨🇦", // Toronto
  washington_dc: "🇺🇸", // Washington DC
  dallas: "🇺🇸", // Dallas
  new_york_city: "🇺🇸", // Newark
  london: "🇬🇧", // London
  singapore: "🇸🇬", // Singapore
  amsterdam: "🇳🇱", // Amsterdam
  chicago: "🇺🇸", // Chicago
  bangalore: "🇮🇳", // Bangalore
  paris: "🇫🇷", // Paris
  seattle: "🇺🇸", // Seattle
  stockholm: "🇸🇪", // Stockholm
  newark: "🇺🇸", // Newark
  sao_paulo: "🇧🇷", // Sao Paulo
  chennai: "🇮🇳", // Chennai
  osaka: "🇯🇵", // Osaka
  milan: "🇮🇹", // Milan
  miami: "🇺🇸", // Miami
  jakarta: "🇮🇩", // Jakarta
  los_angeles: "🇺🇸", // Los Angeles
} satisfies Record<Rivet.cloud.UniversalRegion, string>;

const REGION_LABEL = {
  local: "Local",
  unknown: "Unknown",
  atlanta: "Atlanta",
  san_francisco: "San Francisco",
  frankfurt: "Frankfurt",
  sydney: "Sydney",
  tokyo: "Tokyo",
  mumbai: "Mumbai",
  toronto: "Toronto",
  washington_dc: "Washington DC",
  dallas: "Dallas",
  new_york_city: "New York City",
  london: "London",
  singapore: "Singapore",
  amsterdam: "Amsterdam",
  chicago: "Chicago",
  bangalore: "Bangalore",
  paris: "Paris",
  seattle: "Seattle",
  stockholm: "Stockholm",
  newark: "Newark",
  sao_paulo: "Sao Paulo",
  chennai: "Chennai",
  osaka: "Osaka",
  milan: "Milan",
  miami: "Miami",
  jakarta: "Jakarta",
  los_angeles: "Los Angeles",
} satisfies Record<Rivet.cloud.UniversalRegion, string>;

interface LobbyRegionProps {
  region: Rivet.cloud.UniversalRegion;
  showLabel?: boolean;
}

function getRegionEmoji(regionId: Rivet.cloud.UniversalRegion) {
  const regionEmoji = REGION_EMOJI[regionId] ?? REGION_EMOJI.unknown;
  return `icons/emoji/${converEmojiToUriFriendlyString(regionEmoji)}.svg`;
}

export function LobbyRegion({ region, showLabel }: LobbyRegionProps) {
  return (
    <WithTooltip
      content={REGION_LABEL[region] ?? REGION_LABEL.unknown}
      trigger={
        <Flex gap="2">
          <img
            className="w-5"
            src={`${config.assetsUrl}${getRegionEmoji(region)}`}
          />
          {showLabel ? REGION_LABEL[region] : null}
        </Flex>
      }
    />
  );
}
