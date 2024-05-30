import { json } from "@codemirror/lang-json";
import { CodeMirrorContainer, Flex, H4 } from "@rivet-gg/components";
import { githubDark } from "@uiw/codemirror-theme-github";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useLobbyConnection } from "./lobby-connection-context";

export const JsonPreview = ({ value }: { value: unknown }) => {
  return (
    <CodeMirrorContainer>
      <ReactCodeMirror
        readOnly
        extensions={[json()]}
        theme={githubDark}
        value={JSON.stringify(value, null, 2)}
      />
    </CodeMirrorContainer>
  );
};

export function LobbyConnectionCustomConfig() {
  const connection = useLobbyConnection();
  if (!connection || !connection.connectionState) {
    return null;
  }

  const {
    state: { lobbyConfig, lobbyTags },
  } = connection;

  return (
    <>
      <Flex gap="2" direction="col">
        <H4>Config</H4>
        <JsonPreview value={lobbyConfig} />
      </Flex>
      <Flex gap="2" direction="col">
        <H4>Tags</H4>
        <JsonPreview value={lobbyTags} />
      </Flex>
    </>
  );
}
