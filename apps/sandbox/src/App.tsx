import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ConfigProvider,
  Flex,
  Form,
  FormField,
  Grid,
  H1,
  getConfig,
} from "@rivet-gg/components";
import { Header } from "@rivet-gg/components/header";
import { PageLayout, RootLayout } from "@rivet-gg/components/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as LobbyForm from "./form/lobby-form";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider value={getConfig()}>
        <RootLayout.Root>
          <Header breadcrumbs={<Header.NavItem>Sandbox</Header.NavItem>} />
          <RootLayout.Main>
            <PageLayout.Root>
              <H1 mb="4">Sandbox</H1>
              <Grid gap="4" columns="2">
                <LobbyForm.Form
                  onSubmit={async () => {}}
                  defaultValues={{ maxPlayers: 128, tags: "{}" }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Flex direction="col" gap="4">
                        <LobbyForm.RegionInput />
                        <LobbyForm.GameModeInput />
                        <LobbyForm.MaxPlayersInput />
                        <LobbyForm.TagsInput />
                        <LobbyForm.ConfigInput />
                        <LobbyForm.PublicInput />
                      </Flex>
                    </CardContent>

                    <CardFooter>
                      <LobbyForm.Submit>Submit</LobbyForm.Submit>
                    </CardFooter>
                  </Card>
                </LobbyForm.Form>
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                  </CardHeader>
                  <CardContent>Loading...</CardContent>
                </Card>
              </Grid>
            </PageLayout.Root>
          </RootLayout.Main>
          <RootLayout.Footer>
            &copy; {new Date().getFullYear()} Rivet Gaming, Inc. All rights
            reserved
          </RootLayout.Footer>
        </RootLayout.Root>
      </ConfigProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
