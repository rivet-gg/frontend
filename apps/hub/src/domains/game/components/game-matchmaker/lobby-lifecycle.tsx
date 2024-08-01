import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, WithTooltip, cn, formatDuration } from "@rivet-gg/components";
import { forwardRef } from "react";
import type { LobbySummary } from "../../queries";

const Separator = forwardRef<HTMLButtonElement, { isActive?: boolean }>(
  ({ isActive, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className="mx-1 md:p-2 md:mx-2 cursor-default"
        {...rest}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className={cn(isActive && "text-primary")}
        />
      </button>
    );
  },
);

interface LobbyLifecycleProps extends LobbySummary {}

export function LobbyLifecycle({
  createTs,
  startTs,
  readyTs,
  status,
  readableStatus,
}: LobbyLifecycleProps) {
  const stopTs = status.stopped?.stopTs;
  return (
    <div className="flex text-sm gap w-full md:justify-end relative">
      <div className="relative md:gap-0 gap-1 flex items-center">
        <WithTooltip
          content={<>Created at {createTs.toLocaleString()}</>}
          trigger={
            <button type="button" className="py-2 cursor-default">
              <Badge
                variant={
                  !readyTs && !startTs && !stopTs ? "default" : "outline"
                }
                className="border-primary"
              >
                Create
              </Badge>
            </button>
          }
        />

        {
          // server started, or it is going to start
          readyTs ||
          (!readyTs && !["failed", "closed"].includes(readableStatus)) ? (
            <>
              {readyTs ? (
                <>
                  <WithTooltip
                    content={
                      <>
                        Took{" "}
                        {formatDuration(
                          readyTs.getTime() - createTs.getTime(),
                          {
                            showSeconds: true,
                            showMilliseconds: true,
                          },
                        )}{" "}
                        to ready
                      </>
                    }
                    trigger={<Separator isActive />}
                  />
                  <WithTooltip
                    content={
                      <>
                        Ready at {readyTs.toLocaleString()} (
                        {formatDuration(
                          readyTs.getTime() - createTs.getTime(),
                          {
                            showSeconds: true,
                            showMilliseconds: true,
                          },
                        )}{" "}
                        to ready)
                      </>
                    }
                    trigger={
                      <button type="button" className="py-2 cursor-default">
                        <Badge
                          variant={!startTs && !stopTs ? "default" : "outline"}
                          className="border-primary cursor-default bg-card"
                        >
                          Ready
                        </Badge>
                      </button>
                    }
                  />
                </>
              ) : (
                <>
                  <Separator />
                  <Badge variant="outline" className="cursor-default">
                    Ready
                  </Badge>
                </>
              )}
            </>
          ) : null
        }

        {(startTs && readyTs) ||
        (startTs &&
          !readyTs &&
          !["failed", "closed"].includes(readableStatus)) ? (
          <>
            {readyTs ? (
              <>
                <WithTooltip
                  content={
                    <>
                      Took{" "}
                      {formatDuration(startTs.getTime() - readyTs.getTime(), {
                        showSeconds: true,
                        showMilliseconds: true,
                      })}{" "}
                      to start
                    </>
                  }
                  trigger={<Separator isActive />}
                />
                <WithTooltip
                  content={
                    <>
                      Started at {readyTs.toLocaleString()}
                      <br />
                      {formatDuration(startTs.getTime() - readyTs.getTime(), {
                        showSeconds: true,
                        showMilliseconds: true,
                      })}{" "}
                      to start,{" "}
                      {formatDuration(startTs.getTime() - createTs.getTime(), {
                        showSeconds: true,
                        showMilliseconds: true,
                      })}{" "}
                      since create
                    </>
                  }
                  trigger={
                    <button type="button" className="py-2 cursor-default">
                      <Badge
                        variant={stopTs ? "outline" : "default"}
                        className="border-primary cursor-default"
                      >
                        Start
                      </Badge>
                    </button>
                  }
                />
              </>
            ) : (
              <>
                <Separator />
                <Badge variant="outline" className="cursor-default">
                  Start
                </Badge>
              </>
            )}
          </>
        ) : (
          <>
            <Separator />
            <Badge variant="outline" className="cursor-default">
              Start
            </Badge>
          </>
        )}

        {stopTs ? (
          <>
            <WithTooltip
              content={
                <>
                  {readyTs ? (
                    <>
                      Took{" "}
                      {formatDuration(stopTs.getTime() - readyTs.getTime(), {
                        showSeconds: true,
                        showMilliseconds: true,
                      })}{" "}
                      to finish
                    </>
                  ) : null}
                  {!readyTs && startTs ? (
                    <>
                      Took{" "}
                      {formatDuration(stopTs.getTime() - startTs.getTime(), {
                        showSeconds: true,
                        showMilliseconds: true,
                      })}{" "}
                      to fail
                    </>
                  ) : null}
                  {!readyTs && !startTs ? (
                    <>
                      Took{" "}
                      {formatDuration(stopTs.getTime() - createTs.getTime(), {
                        showSeconds: true,
                        showMilliseconds: true,
                      })}{" "}
                      to fail
                    </>
                  ) : null}
                </>
              }
              trigger={<Separator isActive />}
            />
            <WithTooltip
              content={
                <>
                  {readableStatus === "failed" ? "Failed" : "Finished"} at{" "}
                  {stopTs.toLocaleString()}
                  <br />
                  {readyTs ? (
                    <>
                      {formatDuration(stopTs.getTime() - readyTs.getTime(), {
                        showSeconds: true,
                        showMilliseconds: true,
                      })}{" "}
                      to finish
                    </>
                  ) : null}
                  {!readyTs && startTs ? (
                    <>
                      {formatDuration(stopTs.getTime() - startTs.getTime(), {
                        showSeconds: true,
                        showMilliseconds: true,
                      })}{" "}
                      to fail
                    </>
                  ) : null}
                  {!readyTs && !startTs ? (
                    <>
                      {formatDuration(stopTs.getTime() - createTs.getTime(), {
                        showSeconds: true,
                        showMilliseconds: true,
                      })}{" "}
                      to fail
                    </>
                  ) : null}
                  ,{" "}
                  {formatDuration(stopTs.getTime() - createTs.getTime(), {
                    showSeconds: true,
                    showMilliseconds: true,
                  })}{" "}
                  since create
                </>
              }
              trigger={
                <button type="button" className="py-2 cursor-default">
                  <Badge>
                    {readableStatus === "failed" ? "Failed" : "Finish"}
                  </Badge>
                </button>
              }
            />
          </>
        ) : (
          <>
            <Separator />
            <Badge variant="outline" className="cursor-default">
              Finish
            </Badge>
          </>
        )}
      </div>
    </div>
  );
}
