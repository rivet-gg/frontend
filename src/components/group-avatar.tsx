import { Rivet } from "@rivet-gg/api";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface GroupAvatarProps
  extends Pick<Rivet.group.Summary, "avatarUrl" | "displayName"> {}

export const GroupAvatar = ({ avatarUrl, displayName }: GroupAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>{displayName[0]}</AvatarFallback>
    </Avatar>
  );
};
