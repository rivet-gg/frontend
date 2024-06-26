import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  type DateRange,
  Flex,
  RangeDatePicker,
  Skeleton,
  Text,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { subMonths } from "date-fns";
import { Suspense, useState } from "react";
import { gameQueryOptions, groupBillingUsageQueryOptions } from "../../queries";
import { UsageChart } from "./charts/usage-chart";

interface BillingUsageProps {
  groupId: string;
  startTs: Date;
  endTs: Date;
}

function BillingUsage({ groupId, startTs, endTs }: BillingUsageProps) {
  const f = useSuspenseQuery(
    groupBillingUsageQueryOptions({
      groupId,
      startTs,
      endTs,
    }),
  );
  return <UsageChart />;
}

interface GameBillingUsageProps {
  gameId: string;
}

const today = new Date();
const lastMonth = subMonths(today, 1);

export function GameBillingUsage({ gameId }: GameBillingUsageProps) {
  const {
    data: { developerGroupId: groupId },
  } = useSuspenseQuery(gameQueryOptions(gameId));

  const [date, setDate] = useState<DateRange | undefined>({
    from: lastMonth,
    to: today,
  });

  return (
    <Card>
      <CardHeader>
        <Flex justify="between" items="center">
          <CardTitle>Usage</CardTitle>
          <RangeDatePicker date={date} onDateChange={setDate} />
        </Flex>
      </CardHeader>
      <CardContent>
        {date?.from && date?.to ? (
          <Suspense fallback={<Skeleton className="h-80 w-full" />}>
            <BillingUsage
              groupId={groupId}
              startTs={date?.from}
              endTs={date?.to}
            />
          </Suspense>
        ) : (
          <Text>Please select a date range</Text>
        )}
      </CardContent>
    </Card>
  );
}
