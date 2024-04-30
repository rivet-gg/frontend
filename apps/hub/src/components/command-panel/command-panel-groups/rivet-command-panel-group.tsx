import { CommandGroup, CommandItem } from "@rivet-gg/components";
import {
  BookText,
  MessageCircleHeart,
  MessageCircleQuestion,
} from "lucide-react";

export function RivetCommandGroup() {
  return (
    <CommandGroup heading="Rivet">
      <CommandItem
        onSelect={() => window.open("https://rivet.gg/docs", "_blank")}
      >
        <BookText />
        Docs
      </CommandItem>
      <CommandItem
        onSelect={() => window.open("https://rivet.gg/support", "_blank")}
      >
        <MessageCircleQuestion />
        Support
      </CommandItem>
      <CommandItem
        onSelect={() => window.open("https://rivet.gg/discord", "_blank")}
      >
        <MessageCircleHeart />
        Discord
      </CommandItem>
    </CommandGroup>
  );
}
