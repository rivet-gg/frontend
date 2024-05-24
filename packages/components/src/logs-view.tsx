import type { Virtualizer } from "@tanstack/react-virtual";
import { ListEnd } from "lucide-react";
import {
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "./lib/utils";
import { Skeleton } from "./ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Toggle } from "./ui/toggle";
import { VirtualScrollArea } from "./virtual-scroll-area";

export function Root({ children }: PropsWithChildren) {
  return <div className="mt-4">{children}</div>;
}

export function Content({ children }: PropsWithChildren) {
  return <div className="my-4 flex gap-4">{children}</div>;
}

export function LogsArea({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "h-72 rounded-lg border w-full flex px-4 py-2 gap-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Sidebar({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

interface LogRowProps {
  timestamp?: string;
  line?: string;
}

function LogRow({ timestamp, line }: LogRowProps) {
  return (
    <div className="text-nowrap">
      <span className="text-muted-foreground my-1 mr-2 font-mono text-sm">
        {timestamp}
      </span>
      <span className="my-1 font-mono text-sm">
        {line ? window.atob(line) : null}
      </span>
    </div>
  );
}

interface LogsViewProps {
  timestamps: string[];
  lines: string[];
  logType: "std_out" | "std_err";
  onLogTypeChange: (logType: "std_out" | "std_err") => void;
  sidebar?: ReactNode;
}

export function LogsView({
  sidebar,
  timestamps,
  lines,
  logType,
  onLogTypeChange,
}: LogsViewProps) {
  const [follow, setFollow] = useState(true);
  const isEmpty = lines.length === 0 || timestamps.length === 0;

  const ref = useRef<Virtualizer<HTMLDivElement, Element>>(null);

  useLayoutEffect(
    () => {
      if (follow) {
        ref.current?.scrollToIndex(timestamps.length - 1, { align: "start" });
      }
    },
    // we aware of this rule, but we do not need to react to changes of follow state
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timestamps, follow],
  );

  const handleChange = useCallback(
    (instance: Virtualizer<HTMLDivElement, Element>) => {
      if (instance.scrollDirection === "backward") {
        setFollow(false);
      }
      const isAtBottom = instance.range?.endIndex === timestamps.length - 1;
      if (isAtBottom) {
        setFollow(true);
      }
    },
    [timestamps],
  );

  return (
    <Root>
      <Tabs
        value={logType}
        onValueChange={(value) =>
          onLogTypeChange(value as "std_out" | "std_err")
        }
      >
        <TabsList>
          <TabsTrigger value="std_out">stdout</TabsTrigger>
          <TabsTrigger value="std_err">stderr</TabsTrigger>
        </TabsList>
      </Tabs>
      <Content>
        <LogsArea>
          {isEmpty ? (
            <div className="text-muted-foreground py-8 text-center self-center w-full">
              <p>No logs available</p>
              <p>Logs older than 48 hours will not show up here.</p>
            </div>
          ) : (
            <VirtualScrollArea
              virtualizerRef={ref}
              onChange={handleChange}
              getRowData={(index) => ({
                timestamp: timestamps[index],
                line: lines[index],
              })}
              count={timestamps.length}
              paddingStart={8}
              paddingEnd={8}
              estimateSize={() => 24}
              className="w-full"
              row={<LogRow />}
            />
          )}
        </LogsArea>
        <Sidebar>
          {sidebar}
          <Toggle
            onPressedChange={setFollow}
            pressed={isEmpty ? false : follow}
            disabled={isEmpty}
            variant="outline"
            aria-label="Toggle follow logs"
          >
            <ListEnd className="h-4 w-4" />
          </Toggle>
        </Sidebar>
      </Content>
    </Root>
  );
}

LogsView.Skeleton = function LogsViewSkeleton() {
  return (
    <Root>
      <Skeleton className="w-36 h-10" />
      <Content>
        <LogsArea className="flex-col">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
        </LogsArea>
        <Sidebar>
          <Skeleton className="w-11 h-11" />
          <Skeleton className="w-11 h-11" />
        </Sidebar>
      </Content>
    </Root>
  );
};
