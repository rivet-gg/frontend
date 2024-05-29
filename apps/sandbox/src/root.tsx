import { ConfigProvider, getConfig } from "@rivet-gg/components";
import { Header } from "@rivet-gg/components/header";
import { PageLayout, RootLayout } from "@rivet-gg/components/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { IndexPage } from "./index-page";

export const queryClient = new QueryClient();

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider value={getConfig()}>
        <RootLayout.Root>
          <Header
            breadcrumbs={<Header.NavItem data-active>Sandbox</Header.NavItem>}
          />
          <RootLayout.Main>
            <PageLayout.Root>
              <IndexPage />
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

export default Root;
