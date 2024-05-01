import { AssetImage } from "./asset-image";

export function FullscreenLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AssetImage className="animate-pulse" src="/logo/cream.svg" />
    </div>
  );
}
