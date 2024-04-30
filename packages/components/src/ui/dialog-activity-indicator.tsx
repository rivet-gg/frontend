import { Loader2 } from "lucide-react";
import { Flex } from "./flex";

export function DialogActivityIndicator() {
  return (
    <Flex direction="row" gap="2" items="center" justify="center" my="10">
      <Loader2 className="mr-2 size-4 animate-spin" />
    </Flex>
  );
}
