import type {
  MakeRouteMatchUnion,
  StaticDataRouteOption,
} from "@tanstack/react-router";

export function computePageLayout(
  matches: MakeRouteMatchUnion[],
): StaticDataRouteOption["layout"] {
  let layout: StaticDataRouteOption["layout"] = "compact";

  for (const match of matches) {
    if (match.staticData.layout) {
      layout = match.staticData.layout;
    }
  }

  return layout;
}
