import { ModuleCard } from "@/components/module-card";
import { faBellConcierge, faUpload } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
  Grid,
  H1,
  H2,
  Input,
  Lead,
  SidebarNavigation,
  SidebarPage,
  cn,
} from "@rivet-gg/components";
import { Link, createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { LayoutGroup, motion } from "framer-motion";
import OpenGBMeta from "../../../../../../../../vendor/opengb-modules-meta.json";

function GameIdModules() {
  const navigate = useNavigate();
  const search = Route.useSearch({ select: (s) => s.search || "" });

  const categories = OpenGBMeta.categories
    .map((category) => {
      const modules = category.modules.filter(
        (module) =>
          module.name.toLowerCase().includes(search.toLowerCase()) ||
          module.description.toLowerCase().includes(search.toLowerCase()),
      );
      return { ...category, modules };
    })
    .filter((category) => category.modules.length > 0);

  return (
    <>
      <section className="flex flex-col gap-4 my-8">
        <H1 className="text-center">Find a module</H1>
        <Lead className="text-center">
          Add features to your game with modules.
        </Lead>

        <Input asChild className="max-w-lg mx-auto">
          <Flex items="center">
            <FontAwesomeIcon
              icon="magnifying-glass"
              className="text-muted-foreground mr-2"
            />
            <input
              value={search}
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  return navigate({ search: {} });
                }
                if (search.length === 0) {
                  navigate({ search: { search: e.target.value } });
                } else {
                  navigate({
                    search: { search: e.target.value },
                    replace: true,
                  });
                }
              }}
              placeholder="Search..."
              className="bg-transparent border-transparent h-full w-full placeholder:text-muted-foreground focus-visible:outline-none"
            />
          </Flex>
        </Input>
      </section>
      <SidebarPage
        sidebar={
          <SidebarNavigation>
            {OpenGBMeta.categories.map((category) => (
              <Link
                key={category.slug}
                hash={category.slug}
                className={cn(
                  "data-active:text-foreground data-active:font-semibold transition-opacity",
                  categories.find((c) => c.slug === category.slug)
                    ? "text-foreground"
                    : "opacity-50",
                )}
              >
                {category.name}
              </Link>
            ))}
          </SidebarNavigation>
        }
      >
        <div>
          <LayoutGroup>
            {categories.length === 0 ? (
              <Card className="w-1/2" asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CardHeader className="text-left">
                    <CardTitle>
                      <FontAwesomeIcon
                        icon="sad-tear"
                        className="text-2xl mr-2"
                      />
                      No modules found
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    Don't worry, OpenGB is created with extensibility in mind.
                    If you can't find a module that fits your needs, you can
                    request a new module or create your own.
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button
                      asChild
                      startIcon={<FontAwesomeIcon icon={faBellConcierge} />}
                    >
                      <a
                        href="https://b8v8449klvp.typeform.com/to/kpcSBpuP"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Request Module
                      </a>
                    </Button>
                    <Button
                      asChild
                      startIcon={<FontAwesomeIcon icon={faUpload} />}
                    >
                      <a
                        href="https://opengb.dev/docs/build/publish"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Publish Module
                      </a>
                    </Button>
                  </CardFooter>
                </motion.div>
              </Card>
            ) : null}
            {categories.map((category) => (
              <motion.section
                layout="position"
                layoutId={category.slug}
                key={category.slug}
                className="mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <H2 id={category.slug}>{category.name}</H2>
                <p className="text-muted-foreground mb-6 mt-2">
                  {category.description}
                </p>
                <Grid columns={{ initial: "1", sm: "3" }} gap="4" items="start">
                  {category.modules.map((module) => (
                    <ModuleCard key={module.id} {...module} />
                  ))}
                </Grid>
              </motion.section>
            ))}
          </LayoutGroup>
        </div>
      </SidebarPage>
    </>
  );
}

export const Route = createLazyFileRoute(
  "/_authenticated/_layout/games/$gameId/environments/$namespaceId/modules",
)({
  component: GameIdModules,
});
