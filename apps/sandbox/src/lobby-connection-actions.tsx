import {
  Button,
  Flex,
  Grid,
  H4,
  Input,
  SmallText,
  Switch,
} from "@rivet-gg/components";
import { type MouseEventHandler, useRef } from "react";
import { useLobbyConnection } from "./lobby-connection-context";

function LogAction() {
  const connection = useLobbyConnection();
  const ref = useRef<HTMLInputElement>(null);

  const handleLog: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (ref.current === null || ref.current.value.trim() === "") return;
    const logtype = event.currentTarget.dataset.logtype || "stdout";
    connection?.socket.current?.send(
      JSON.stringify(["log", { [logtype]: ref.current?.value }]),
    );
    ref.current.value = "";
  };

  return (
    <Flex gap="4" className="border rounded-md p-4">
      <Input ref={ref} placeholder="Log message" />
      <Button variant="outline" data-logtype="stdout" onClick={handleLog}>
        &gt; std out
      </Button>
      <Button variant="outline" data-logtype="stderr" onClick={handleLog}>
        &gt; std err
      </Button>
    </Flex>
  );
}

function ScoreAction() {
  const connection = useLobbyConnection();
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    connection?.socket.current?.send(JSON.stringify(["score", null]));
  };
  return (
    <Flex gap="4" items="center" className="border rounded-md p-4">
      <Button variant="outline" data-logtype="stdout" onClick={handleClick}>
        Score
      </Button>
      <SmallText>
        Clicking this button should increment a value in Scores preview.
      </SmallText>
    </Flex>
  );
}

function CloseAction() {
  const connection = useLobbyConnection();
  const handleCheckedChange = (value: boolean) => {
    connection?.socket.current?.send(
      JSON.stringify(["set-closed", value ? 1 : 0]),
    );
  };
  return (
    <Flex gap="4" items="center" className="border rounded-md p-4">
      <Switch onCheckedChange={handleCheckedChange} />
      <SmallText>Is closed? (i.e. does not accept new connections)</SmallText>
    </Flex>
  );
}

function ExitAction() {
  const connection = useLobbyConnection();
  const ref = useRef<HTMLInputElement>(null);

  const handleExit: MouseEventHandler<HTMLButtonElement> = () => {
    if (ref.current === null || ref.current.value.trim() === "") return;
    connection?.socket.current?.send(
      JSON.stringify(["force-exit", ref.current?.value]),
    );
    ref.current.value = "";
  };

  return (
    <Flex gap="4" className="border rounded-md p-4">
      <Input ref={ref} placeholder="Exit code" type="number" />
      <Button variant="outline" data-logtype="stdout" onClick={handleExit}>
        &gt; Force Exit
      </Button>
    </Flex>
  );
}

export function LobbyConnectionActions() {
  return (
    <Flex className="col-span-2" direction="col" gap="2">
      <H4>Actions</H4>

      <Grid columns="2" gap="4">
        <LogAction />
        <ExitAction />
        <ScoreAction />
        <CloseAction />
      </Grid>
    </Flex>
  );
}
