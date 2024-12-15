import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CodeFrame,
  CodeSource,
  DocsSheet,
  cn,
} from "@rivet-gg/components";
import {
  Icon,
  faActors,
  faArrowPointer,
  faArrowProgress,
  faChevronDoubleDown,
  faChevronRight,
  faCircleNodes,
  faCode,
  faCog,
  faDiagramNext,
  faGamepadAlt,
  faHandWave,
  faSparkles,
  faToolbox,
  faUpRightAndDownLeftFromCenter,
  faWifiSlash,
} from "@rivet-gg/icons";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { type ComponentProps, useState } from "react";
import installCli, {
  source as installCliSource,
} from "./onboarding/initial-setup-install-rivet-cli.sh?shiki&lang=bash";
import setupCli, {
  source as setupCliSource,
} from "./onboarding/initial-setup-setup-rivet-cli.sh?shiki&lang=bash";
import testCli, {
  source as testCliSource,
} from "./onboarding/initial-setup-test-rivet-cli.sh?shiki&lang=bash";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export function GetStarted() {
  const { scrollY } = useScroll();
  const [isScrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const isScrolledEnough = current > 100;
    setScrolled(isScrolledEnough);
  });
  return (
    <>
      <motion.div
        initial={{ y: 0, x: "-50%" }}
        animate={{ y: isScrolled ? 100 : 0, x: "-50%" }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
      >
        <Button
          onClick={() => {
            document
              .getElementById("getting-started")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          endIcon={<Icon icon={faChevronDoubleDown} />}
        >
          See more
        </Button>
      </motion.div>
      <Card className="max-w-xl mx-auto w-full my-6 ">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Initial setup</CardTitle>
          </div>
          <CardDescription>
            Start building your next project with Rivet. Follow these steps to
            get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <h3 className="font-semibold">1. Install</h3>
            <CodeFrame code={installCliSource} language="bash">
              <CodeSource>{installCli}</CodeSource>
            </CodeFrame>
          </div>
          <div>
            <h3 className="font-semibold">2. Setup</h3>
            <CodeFrame code={setupCliSource} language="bash">
              <CodeSource>{setupCli}</CodeSource>
            </CodeFrame>
          </div>
          <div>
            <h3 className="font-semibold">3. Test</h3>
            <CodeFrame code={testCliSource} language="bash">
              <CodeSource>{testCli}</CodeSource>
            </CodeFrame>
          </div>
        </CardContent>
      </Card>
      <Card
        id="getting-started"
        asChild
        className="max-w-xl w-full mx-auto my-6 scroll-mt-28"
      >
        <motion.div>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Learn how Rivet works and how you can customize it to suit your
              needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              className="grid md:grid-cols-3 gap-4"
            >
              <ExampleLink
                href="examples"
                title="Intro to Rivet"
                size="md"
                icon={faHandWave}
              />
              <ExampleLink
                href="examples"
                title="Initial Setup"
                size="md"
                icon={faToolbox}
              />
              <ExampleLink
                href="examples"
                title="Configuration"
                size="md"
                icon={faCog}
              />
            </motion.div>
          </CardContent>
        </motion.div>
      </Card>
      <Card asChild className="max-w-xl w-full mx-auto my-6">
        <motion.div>
          <CardHeader>
            <CardTitle>Examples</CardTitle>
            <CardDescription>
              Dive into our example projects to get a feel for how Rivet can
              help you build your next project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              className="grid md:grid-cols-3 gap-4"
            >
              <ExampleLink
                href="examples"
                title="Multiplayer Tools"
                size="md"
                icon={faArrowPointer}
              />
              <ExampleLink
                href="examples"
                title="Local-First Apps"
                size="md"
                icon={faWifiSlash}
              />
              <ExampleLink
                href="examples"
                title="AI Agents"
                size="md"
                icon={faSparkles}
              />
              <ExampleLink
                href="examples"
                title="Run User Code"
                size="md"
                icon={faCode}
              />
              <ExampleLink
                href="examples"
                title="Game Servers"
                size="md"
                icon={faGamepadAlt}
              />
            </motion.div>
          </CardContent>
        </motion.div>
      </Card>
      <Card asChild className="max-w-xl w-full mx-auto my-6">
        <motion.div>
          <CardHeader>
            <CardTitle>Build with Rivet</CardTitle>
            <CardDescription>
              Explore the possibilities of what you can build with Rivet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              className="grid md:grid-cols-2 gap-4"
            >
              <ExampleLink
                href="examples"
                title="What are Actors?"
                size="md"
                icon={faActors}
              />
              <ExampleLink
                href="examples"
                title="RPC"
                size="md"
                icon={faArrowProgress}
              />
              <ExampleLink
                href="examples"
                size="md"
                title="State"
                icon={faDiagramNext}
              />
              <ExampleLink
                href="https://rivet.gg/examples"
                title="Scaling & Concurrency"
                size="md"
                icon={faUpRightAndDownLeftFromCenter}
              />
              <ExampleLink
                href="https://rivet.gg/examples"
                size="md"
                title="Edge Networking"
                icon={faCircleNodes}
              />
            </motion.div>

            <div className="flex items-center justify-center">
              <Button
                asChild
                variant="link"
                endIcon={<Icon icon={faChevronRight} />}
                className="mt-4 mx-auto"
              >
                <motion.a
                  variants={linkVariants}
                  href="https://rivet.gg/examples"
                  target="_blank"
                  rel="noreferrer"
                >
                  More
                </motion.a>
              </Button>
            </div>
          </CardContent>
        </motion.div>
      </Card>
    </>
  );
}

const linkVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

interface ExampleLinkProps {
  title: string;
  description?: string;
  icon: ComponentProps<typeof Icon>["icon"];
  href: string;
  size?: "sm" | "md" | "lg";
}

function ExampleLink({
  title,
  description,
  icon,
  href,
  size = "lg",
}: ExampleLinkProps) {
  return (
    <DocsSheet path={href} title={title}>
      <Button variant="outline" asChild className="py-4 px-3">
        <motion.button
          key={title}
          type="button"
          variants={linkVariants}
          className={cn(
            "grid grid-cols-[40px,1fr] items-center h-auto max-h-none",
            {
              "grid-cols-[min-content,1fr]": size === "md",
              "grid-cols-[40px,1fr]": size === "lg",
            },
          )}
        >
          <div className="items-center justify-center flex">
            <Icon
              className={cn({
                "text-xl": size === "md",
                "text-3xl": size === "lg",
              })}
              icon={icon}
            />
          </div>
          <div className="ml-3 flex gap-0.5 flex-col text-left">
            <span className="font-semibold">{title}</span>
            {description ? (
              <span className="text-muted-foreground">{description} </span>
            ) : null}
          </div>
        </motion.button>
      </Button>
    </DocsSheet>
  );
}
