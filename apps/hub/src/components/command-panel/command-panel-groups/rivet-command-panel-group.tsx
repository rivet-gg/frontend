import {
  faBook,
  faComment,
  faLifeRing,
  faMessageHeart,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CommandGroup, CommandItem } from "@rivet-gg/components";
import { useNavigate } from "@tanstack/react-router";

export function RivetCommandGroup() {
  const navigate = useNavigate();
  return (
    <CommandGroup heading="Rivet">
      <CommandItem
        onSelect={() => window.open("https://rivet.gg/docs", "_blank")}
      >
        <FontAwesomeIcon icon={faBook} />
        Docs
      </CommandItem>

      <CommandItem onSelect={() => navigate({ search: { modal: "feedback" } })}>
        <FontAwesomeIcon icon={faComment} />
        Feedback
      </CommandItem>
      <CommandItem
        onSelect={() => window.open("https://rivet.gg/support", "_blank")}
      >
        <FontAwesomeIcon icon={faLifeRing} />
        Support
      </CommandItem>
      <CommandItem
        onSelect={() => window.open("https://rivet.gg/discord", "_blank")}
      >
        <FontAwesomeIcon icon={faMessageHeart} />
        Discord
      </CommandItem>
    </CommandGroup>
  );
}
