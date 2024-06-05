import { Badge, Flex } from "@rivet-gg/components";

interface NamespaceVersionTitleProps {
  namespace: string;
  version: string;
}

export function NamespaceVersionTitle({
  namespace,
  version,
}: NamespaceVersionTitleProps) {
  return (
    <Flex items="center">
      <span>{namespace}</span>
      <Badge ml="4">{version}</Badge>
    </Flex>
  );
}
