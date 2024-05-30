import {
  Badge,
  Dd,
  Dl,
  Dt,
  Flex,
  H4,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SmallText,
} from "@rivet-gg/components";
import { useState } from "react";
import { useInterval } from "react-use";
import * as stats from "simple-statistics";
import { useLobbyConnection } from "./lobby-connection-context";

function PingStatsPeriodSelect({
  onChange,
}: { onChange: (value: number) => void }) {
  const [statsRange, setStatsRange] = useState("5");

  const handleChange = (value: string) => {
    setStatsRange(value);
    onChange(Number.parseInt(value, 10));
  };

  return (
    <Select value={statsRange} onValueChange={handleChange}>
      <SelectTrigger className="max-w-40">
        <SelectValue placeholder="Select namespace" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">last 5 seconds</SelectItem>
        <SelectItem value="10">last 10 seconds</SelectItem>
        <SelectItem value="15">last 15 seconds</SelectItem>
        <SelectItem value="60">last 1 minute</SelectItem>
        <SelectItem value="300">last 5 minutes</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function LobbyConnectionPingStats() {
  const connection = useLobbyConnection();

  const [period, setPeriod] = useState(5);

  useInterval(
    () => {
      connection?.socket.current?.send(JSON.stringify(["ping", Date.now()]));
    },
    !connection?.connectionState ? null : 1_000,
  );

  if (!connection || !connection.connectionState) {
    return null;
  }

  const {
    state: { pings = [] },
  } = connection;

  let last5Seconds = pings.slice(-period);
  last5Seconds = last5Seconds.length ? last5Seconds : [0];

  return (
    <Flex gap="2" direction="col">
      <Flex items="start" justify="between">
        <H4>Ping</H4>
        <PingStatsPeriodSelect onChange={setPeriod} />
      </Flex>
      <Dl>
        <Dt>min</Dt>
        <Dd>
          <Badge variant="outline">
            {stats.min(last5Seconds).toFixed(0)}ms
          </Badge>
        </Dd>
        <Dt>max</Dt>
        <Dd>
          <Badge variant="outline">
            {stats.max(last5Seconds).toFixed(0)}ms
          </Badge>
        </Dd>
        <Dt>avg</Dt>
        <Dd>
          <Badge variant="outline">
            {stats.average(last5Seconds).toFixed(1)}ms
          </Badge>
        </Dd>
        <Dt>p95</Dt>
        <Dd>
          <Badge variant="outline">
            {stats.quantile(last5Seconds, 0.95).toFixed(1)}ms
          </Badge>
        </Dd>
        <Dt>p99</Dt>
        <Dd>
          <Badge variant="outline">
            {stats.quantile(last5Seconds, 0.99).toFixed(1)}ms
          </Badge>
        </Dd>
      </Dl>
    </Flex>
  );
}
