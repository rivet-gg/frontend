import type { Rivet } from "@rivet-gg/api";
import { Flex, Progress, SmallText, WithTooltip } from "@rivet-gg/components";
import { filesize } from "filesize";

interface LobbyMetricsProps extends Rivet.cloud.SvcMetrics {
  lobbyId: string;
}

export function LobbyMetrics({
  allocatedMemory,
  memory,
  cpu,
}: LobbyMetricsProps) {
  const currentMemory = memory[memory.length - 1];
  const memoryPercentage = (currentMemory / (allocatedMemory || 1)) * 100;

  const cpuPercentage = cpu[cpu.length - 1] * 100;
  return (
    <Flex gap="2">
      <WithTooltip
        trigger={
          <Flex direction="col" gap="2" className="min-w-20">
            <SmallText>Memory</SmallText>
            <Progress className="h-2" value={memoryPercentage} />
          </Flex>
        }
        content={
          <>
            {filesize(currentMemory)} / {filesize(allocatedMemory || 1)} (
            {memoryPercentage.toFixed(2)}%)
          </>
        }
      />

      <WithTooltip
        trigger={
          <Flex direction="col" gap="2" className="min-w-20">
            <SmallText>CPU</SmallText>
            <Progress className="h-2" value={cpu[cpu.length - 1] * 100} />
          </Flex>
        }
        content={<>{cpuPercentage.toFixed(2)}%</>}
      />
    </Flex>
  );
}
