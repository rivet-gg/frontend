import { useMutationState } from "@tanstack/react-query";
import {
  type MutableRefObject,
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { z } from "zod";
import {
  type LobbyMutationState,
  useCreateLobbyMutation,
  useFindLobbyMutation,
} from "./data/rivet";

const LobbyConnectionContext = createContext<{
  state: State;
  connectionState: "open" | "closed" | "unknown";
  socket: MutableRefObject<WebSocket | null>;
  mutationState: LobbyMutationState | undefined;
} | null>(null);

export const useLobbyConnection = () => useContext(LobbyConnectionContext);

export function computeLobbyWebsocketUrl(
  state: LobbyMutationState | undefined,
) {
  if (state?.data) {
    const port = state.data.lobby.ports.default;
    const proto = port.isTls ? "wss" : "ws";
    return `${proto}://${port.host}/?token=${state.data.lobby.player.token}`;
  }

  return null;
}

const MessageData = z.union([
  z.object({
    type: z.literal("init"),
    data: z.object({ forwardedFor: z.string() }),
  }),
  z.object({
    type: z.literal("state"),
    data: z.object({
      lobbyConfig: z.object({}).catchall(z.any()).nullable(),
      lobbyTags: z.object({}).catchall(z.any()).nullable(),
      scores: z.record(z.number()),
    }),
  }),
  z.object({
    type: z.literal("pong"),
    data: z.number(),
  }),
  z.object({
    type: z.literal("stats"),
    data: z.object({
      memory: z.object({}).catchall(z.any()),
    }),
  }),
]);

interface State {
  forwardedFor?: string;
  lobbyConfig?: Record<string, unknown> | null;
  lobbyTags?: Record<string, unknown> | null;
  leaderboard?: Record<string, number>;
  pings?: number[];
  stats?: {
    memory: Record<string, string>;
  };
}

function messageReducer(state: State, message: z.infer<typeof MessageData>) {
  if (message.type === "init") {
    return {
      forwardedFor: message.data.forwardedFor,
    };
  }
  if (message.type === "state") {
    return {
      ...state,
      lobbyConfig: message.data.lobbyConfig,
      lobbyTags: message.data.lobbyTags,
      leaderboard: message.data.scores,
    };
  }
  if (message.type === "pong") {
    return {
      ...state,
      pings: [...(state.pings || []), Date.now() - message.data],
    };
  }
  if (message.type === "stats") {
    return {
      ...state,
      stats: message.data,
    };
  }

  return state;
}

function useWebsocket(url: string | null) {
  const socket = useRef<WebSocket | null>(null);
  const [connectionState, setConnectionState] = useState<
    "open" | "closed" | "unknown"
  >("unknown");
  const [state, dispatch] = useReducer(messageReducer, {} as never);

  useEffect(() => {
    const close = () => {
      if (!socket.current) return;
      socket.current.close();
      setConnectionState("closed");
    };

    if (!url) return close;

    setConnectionState("unknown");
    const ws = new WebSocket(url);
    socket.current = ws;

    ws.addEventListener("open", () => {
      setConnectionState("open");
    });

    ws.addEventListener("close", () => {
      setConnectionState("closed");
    });

    ws.addEventListener("error", (event) => {
      console.error(event);
      setConnectionState("closed");
    });

    ws.addEventListener("message", (event) => {
      const [eventType, data] = JSON.parse(event.data as string);
      const result = MessageData.safeParse({ type: eventType, data });
      if (!result.success) {
        return console.error(result.error.errors);
      }
      dispatch(result.data);
    });

    return close;
  }, [url]);

  return { socket, connectionState, state } as const;
}

export function LobbyConnectionProvider({ children }: PropsWithChildren) {
  const mutationStates = useMutationState({
    filters: {
      predicate(mutation) {
        if (!mutation.options.mutationKey) return false;
        return [
          useFindLobbyMutation.MUTATION_KEY,
          useCreateLobbyMutation.MUTATION_KEY,
        ].includes(mutation.options.mutationKey);
      },
    },
  });

  const recentMutationState = mutationStates[mutationStates.length - 1] as
    | LobbyMutationState
    | undefined;

  const { state, connectionState, socket } = useWebsocket(
    computeLobbyWebsocketUrl(recentMutationState),
  );

  return (
    <LobbyConnectionContext.Provider
      value={{
        state,
        connectionState,
        socket,
        mutationState: recentMutationState,
      }}
    >
      {children}
    </LobbyConnectionContext.Provider>
  );
}
