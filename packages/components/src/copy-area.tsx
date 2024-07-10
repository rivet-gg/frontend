import { faCopy } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "./lib/utils";
import { Button } from "./ui/button";
import { Flex } from "./ui/flex";
import { Input } from "./ui/input";
import { WithTooltip } from "./ui/tooltip";

interface CopyAreaProps {
  className?: string;
  value: string;
  isConfidential?: boolean;
  variant?: "default" | "discrete";
}

export function CopyArea({
  value,
  className,
  isConfidential,
  variant = "default",
}: CopyAreaProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
  };

  if (variant === "discrete") {
    return (
      <Button
        className={cn("font-mono", className)}
        variant="outline"
        onClick={handleClick}
        type="button"
        endIcon={
          <FontAwesomeIcon
            className="group-hover/button:opacity-100 opacity-0 transition-opacity"
            icon={faCopy}
          />
        }
      >
        <span className="flex-1 text-left truncate">{value}</span>
      </Button>
    );
  }

  return (
    <Flex gap="2" className={cn(className)}>
      {isConfidential ? (
        <WithTooltip
          content="Click to reveal"
          trigger={
            <Input
              readOnly
              value={value}
              onFocus={() => setIsRevealed(true)}
              onBlur={() => setIsRevealed(false)}
              className="font-mono"
              type={isRevealed ? "text" : "password"}
            />
          }
        />
      ) : (
        <Input readOnly value={value} className="font-mono" type="text" />
      )}

      <Button variant="secondary" size="icon" onClick={handleClick}>
        <FontAwesomeIcon icon={faCopy} />
      </Button>
    </Flex>
  );
}
