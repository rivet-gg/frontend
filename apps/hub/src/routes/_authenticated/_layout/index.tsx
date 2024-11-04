import { Intro } from "@/components/intro";
import { DeepDiveSection } from "@/components/sections/deep-dive-section";
import { FaqSection } from "@/components/sections/faq-section";
import { guardOssNewie } from "@/lib/guards";
import { H1, NarrowPage, Separator } from "@rivet-gg/components";
import { createFileRoute } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { LayoutGroup } from "framer-motion";
import { z } from "zod";

function IndexRoute() {
  return (
    <>
      <NarrowPage>
        <H1 className="mb-8">Welcome to Rivet</H1>

        <LayoutGroup>
          <Intro />
        </LayoutGroup>

        <Separator my="10" />

        <DeepDiveSection />

        <FaqSection />
      </NarrowPage>
    </>
  );
}

const searchSchema = z.object({
  newbie: z.coerce.boolean().optional(),
});

export const Route = createFileRoute("/_authenticated/_layout/")({
  validateSearch: zodSearchValidator(searchSchema),
  component: IndexRoute,
  beforeLoad: async ({ context: { queryClient, auth }, search }) => {
    if (search.newbie) {
      return;
    }

    await guardOssNewie({ queryClient, auth });
  },
});
