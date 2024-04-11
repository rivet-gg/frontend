import { Flex } from "@rivet-gg/components";
import { Loader2 } from "lucide-react";

export function DialogActivityIndicator() {
  return (
    <Flex direction="row" gap="2" items="center" justify="center" my="10">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    </Flex>
  );
}
