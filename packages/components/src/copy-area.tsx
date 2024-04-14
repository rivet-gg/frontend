import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Flex } from "./ui/flex";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface CopyAreaProps {
  value: string;
}

export function CopyArea({ value }: CopyAreaProps) {
  const handleClick = () => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
  };

  return (
    <Flex gap="2">
      <Input readOnly value={value} />
      <Button variant="secondary" size="icon" onClick={handleClick}>
        <Copy />
      </Button>
    </Flex>
  );
}
