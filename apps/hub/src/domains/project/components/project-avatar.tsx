import type { Rivet } from "@rivet-gg/api";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  type AvatarProps,
} from "@rivet-gg/components";

interface ProjectAvatarProps
  extends Pick<Rivet.game.Summary, "logoUrl" | "displayName">,
    AvatarProps {}

export function ProjectAvatar({
  logoUrl,
  displayName,
  ...props
}: ProjectAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarImage src={logoUrl} />
      <AvatarFallback>{displayName[0]}</AvatarFallback>
    </Avatar>
  );
}
