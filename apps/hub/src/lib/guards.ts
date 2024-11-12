import {
  bootstrapQueryOptions,
  clusterQueryOptions,
} from "@/domains/auth/queries/bootstrap";
import { type QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";

export function GuardEnterprise({ children }: PropsWithChildren) {
  const { data: cluster } = useSuspenseQuery(clusterQueryOptions());

  if (cluster === "enterprise") {
    return children;
  }

  return null;
}

export async function guardEnterprise({
  queryClient,
}: { queryClient: QueryClient }) {
  const bootstrap = await queryClient.fetchQuery(bootstrapQueryOptions());

  if (bootstrap.cluster === "oss") {
    throw notFound();
  }
}
