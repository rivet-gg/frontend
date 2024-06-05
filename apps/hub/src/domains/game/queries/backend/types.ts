import { z } from "zod";

function parseModuleCallUrl(url: string) {
  const [modulesLiteral, moduleName, scriptsLiteral, scriptName, callLiteral] =
    url.split("/").slice(1);

  if (
    modulesLiteral === "modules" &&
    scriptsLiteral === "scripts" &&
    callLiteral === "call"
  ) {
    return {
      moduleName,
      scriptName,
    };
  }

  return null;
}

export const BackendEvent = z
  .object({
    dispatchNamespace: z.string(),
    event: z.object({
      request: z.object({
        headers: z.record(z.string()),
        method: z.string(),
        url: z.string(),
      }),
      response: z.object({
        status: z.number(),
      }),
    }),
    eventTimestamp: z.string(),
    logs: z.array(
      z.object({
        level: z.string(),
        message: z.array(z.string()),
        timestamp: z.string(),
      }),
    ),
    outcome: z.string(),
    scriptName: z.string(),
    scriptVersion: z.object({
      id: z.string(),
    }),
  })
  .transform((data) => {
    const url = new URL(data.event.request.url);

    return {
      ...data,
      backendCall: parseModuleCallUrl(url.pathname),
      event: {
        ...data.event,
        request: {
          ...data.event.request,
          pathname: url.pathname,
        },
      },
      logTimestamps: data.logs.map((log) =>
        new Date(+log.timestamp).toISOString(),
      ),
    };
  });

export type BackendEvent = z.infer<typeof BackendEvent>;
