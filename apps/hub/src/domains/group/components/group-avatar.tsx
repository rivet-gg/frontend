import { Rivet } from "@rivet-gg/api";
import { Avatar, AvatarFallback, AvatarImage } from "@rivet-gg/components";

interface GroupAvatarProps
  extends Pick<Rivet.group.Summary, "avatarUrl" | "displayName"> {}

export function GroupAvatar({ avatarUrl, displayName }: GroupAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>{displayName[0]}</AvatarFallback>
    </Avatar>
  );
}
