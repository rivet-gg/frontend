import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Flex } from "./ui/flex";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { WithTooltip } from "./ui/tooltip";
import { useState } from "react";

interface CopyAreaProps {
  value: string;
  isConfidential?: boolean;
}

export function CopyArea({ value, isConfidential }: CopyAreaProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
  };

  return (
    <Flex gap="2">
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
        <Copy />
      </Button>
    </Flex>
  );
}
