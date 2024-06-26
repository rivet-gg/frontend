import { converEmojiToUriFriendlyString } from "@/lib/emoji";
import type { Rivet } from "@rivet-gg/api";
import { AssetImage, Flex, WithTooltip } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { gameRegionQueryOptions, gameRegionsQueryOptions } from "../queries";

const REGION_EMOJI: Record<string, string> = {
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
  atl: "🇺🇸", // Atlanta
  sfo: "🇺🇸", // San Francisco
  fra: "🇩🇪", // Frankfurt
  syd: "🇦🇺", // Sydney
  tok: "🇯🇵", // Tokyo
  mba: "🇮🇳", // Mumbai
  tor: "🇨🇦", // Toronto
  dca: "🇺🇸", // Washington DC
  dfw: "🇺🇸", // Dallas
  ewr: "🇺🇸", // Newark
  lon: "🇬🇧", // London
  sgp: "🇸🇬", // Singapore
  lax: "🇺🇸", // Los Angeles
  osa: "🇯🇵", // Osaka
  gru: "🇧🇷", // Sao Paulo
  bom: "🇮🇳", // Mumbai
  sin: "🇸🇬", // Singapore
};

const REGION_LABEL: Record<string, string> = {
  local: "Local",
  unknown: "Unknown",
  atlanta: "Atlanta, Georgia, USA",
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
  atl: "Atlanta, Georgia, USA",
  sfo: "San Francisco, California, USA",
  fra: "Frankfurt, Germany",
  syd: "Sydney, Australia",
  tok: "Tokyo, Japan",
  mba: "Mumbai, India",
  tor: "Toronto, Canada",
  dca: "Washington DC, USA",
  dfw: "Dallas, Texas, USA",
  ewr: "Newark, New Jersey, USA",
  lon: "London, UK",
  sgp: "Singapore",
  lax: "Los Angeles, California, USA",
  osa: "Osaka, Japan",
  gru: "Sao Paulo",
  bom: "Mumbai, India",
  sin: "Singapore",
};

interface LobbyRegionProps {
  regionId: string;
  gameId: string;
  showLabel?: boolean;
}

function getRegionKey(regionNameId: string | undefined) {
  // HACK: Remove prefix for old regions with format `lnd-atl`
  const regionIdSplit = (regionNameId || "").split("-");
  return regionIdSplit[regionIdSplit.length - 1];
}

function getRegionEmoji(regionKey: string | undefined = "") {
  const regionEmoji = REGION_EMOJI[regionKey] ?? REGION_EMOJI.unknown;
  return `/icons/emoji/${converEmojiToUriFriendlyString(regionEmoji)}.svg`;
}

export function LobbyRegion({ gameId, regionId, showLabel }: LobbyRegionProps) {
  const { data: region } = useSuspenseQuery(
    gameRegionQueryOptions({ gameId, regionId }),
  );

  const regionKey = getRegionKey(region?.regionNameId);

  return (
    <WithTooltip
      content={REGION_LABEL[regionKey] ?? REGION_LABEL.unknown}
      trigger={
        <Flex gap="2">
          <AssetImage className="w-5" src={getRegionEmoji(regionKey)} />
          {showLabel ? REGION_LABEL[regionKey] : null}
        </Flex>
      }
    />
  );
}

export function LobbyRegionIcon({
  regionNameId,
  className,
}: { regionNameId: string; className?: string }) {
  const regionKey = getRegionKey(regionNameId);
  return <AssetImage className={className} src={getRegionEmoji(regionKey)} />;
}

export function LobbyRegionName({ regionNameId }: { regionNameId: string }) {
  const regionKey = getRegionKey(regionNameId);
  return REGION_LABEL[regionKey] ?? REGION_LABEL.unknown;
}
