import { useConfig } from "./lib/config";

export function AssetImage(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
) {
  const { assetsUrl } = useConfig();
  return (
    <img
      {...props}
      src={`${props.src?.includes("http") ? "" : assetsUrl}${props.src}`}
    />
  );
}
