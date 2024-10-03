import { gamesQueryOptions } from "@/domains/game/queries";
import * as GroupCreateForm from "@/domains/group/forms/group-create-form";
import { useGroupCreateMutation } from "@/domains/group/queries";
import { useDialog } from "@/hooks/use-dialog";
import { ls } from "@/lib/ls";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CtaCard,
  Flex,
  Grid,
  H1,
  H2,
  Link,
  NarrowPage,
  Strong,
  Ul,
  safeAsync,
} from "@rivet-gg/components";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { z } from "zod";

function Modals() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  const CreateGroupGameDialog = useDialog.CreateGame.Dialog;
  const CreateGroupDialog = useDialog.CreateGroup.Dialog;

  if (!search || !("modal" in search)) {
    return;
  }

  const { groupId, modal } = search;

  const handleonOpenChange = (value: boolean) => {
    if (!value) {
      navigate({ search: { modal: undefined } });
    }
  };

  return (
    <>
      <CreateGroupGameDialog
        groupId={groupId}
        onSuccess={async (data) =>
          await navigate({
            to: "/games/$gameId",
            params: { gameId: data.gameId },
          })
        }
        dialogProps={{
          open: modal === "create-game",
          onOpenChange: handleonOpenChange,
        }}
      />
      <CreateGroupDialog
        onSuccess={async (data) =>
          await navigate({
            to: "/teams/$groupId",
            params: { groupId: data.groupId },
          })
        }
        dialogProps={{
          open: modal === "create-group",
          onOpenChange: handleonOpenChange,
        }}
      />
    </>
  );
}

function Form() {
  const navigate = useNavigate();
  const { mutateAsync } = useGroupCreateMutation();
  return (
    <Card>
      <GroupCreateForm.Form
        onSubmit={async (values) => {
          const response = await mutateAsync({
            displayName: values.name,
          });
          await navigate({
            to: "/teams/$groupId",
            params: { groupId: response.groupId },
          });
        }}
        defaultValues={{ name: "" }}
      >
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
          <CardDescription>
            Before you start, you need to create a team. This will allow you to
            create games and invite teammates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Flex gap="4" direction="col">
            <GroupCreateForm.Name />
          </Flex>
        </CardContent>
        <CardFooter>
          <GroupCreateForm.Submit type="submit">Create</GroupCreateForm.Submit>
        </CardFooter>
      </GroupCreateForm.Form>
    </Card>
  );
}

function IndexRoute() {
  return (
    <>
      <Modals />
      <NarrowPage>
        <H1>Welcome</H1>
        <p>
          Rivet is a multiplayer tooling that provides a suite of tools to help
          you build and deploy multiplayer games. Scalable, secure and reliable
          infrastructure for dynamic servers, DDoS mitigation, managed WebSocket
          SSL & TCP+TLS termination, streamlined DevOps for teams, unified
          logging & monitoring & analytics, and no downtime deploys with easy
          rollbacks.
        </p>

        <Form />

        <H2 mt="4">Deep dive</H2>
        <Grid columns={{ initial: "1", md: "2" }} gap="4">
          <a
            href="https://github.com/rivet-gg/examples"
            target="_blank"
            rel="noreferrer"
          >
            <CtaCard title="Quick start" className="h-full">
              Use one of our example repositories to quickly get started with
              Rivet.
            </CtaCard>
          </a>
          <a href="https://rivet.gg/docs" target="_blank" rel="noreferrer">
            <CtaCard title="React the docs" className="h-full">
              Learn more about Rivet by reading our documentation, which covers
              Rivet integrations with most popular engines, multiplayer concepts
              and more.
            </CtaCard>
          </a>
          <a href="https://rivet.gg/discord" target="_blank" rel="noreferrer">
            <CtaCard title="Discord" className="h-full">
              Join our Discord community to chat with other Rivet users and
              developers. Get help, share your projects, and more.
            </CtaCard>
          </a>
          <a
            href="https://github.com/rivet-gg"
            target="_blank"
            rel="noreferrer"
          >
            <CtaCard title="GitHub" className="h-full">
              Rivet is open-source. Check out our GitHub repositories to
              contribute, report bugs, and request features.
            </CtaCard>
          </a>
        </Grid>

        <H2 mt="4">Frequently Asked Questions</H2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Rivet?</AccordionTrigger>
            <AccordionContent>
              <p>
                Rivet is a multiplayert tooling that provides a suite of tools
                to help you build and deploy multiplayer games. Rivet provides a
                scalable, secure, and reliable infrastructure for:
              </p>
              <Ul>
                <li>Dynamic Servers for auto-scaling game lobbies </li>
                <li>
                  DDoS mitigation and managed WebSocket SSL & TCP+TLS
                  termination
                </li>
                <li>Streamlined DevOps for teams</li>
                <li>Unified logging & monitoring & analytics</li>
                <li>No downtime deploys with easy rollbacks</li>
              </Ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What Game Engines are supported?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Rivet supports all major game engines including Unity, Unreal
                Engine, Godot. It also provides SDKs for popular languages like
                C#, C++, and JavaScript, so you can use Rivet with any game
                engine even if it's your own custom engine.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is Rivet open-source?</AccordionTrigger>
            <AccordionContent>
              <p>
                <Strong>Yes, Rivet is open-source.</Strong>You can find our
                repositories on{" "}
                <Link href="https://rivet.gg" target="_blank" rel="noreferrer">
                  GitHub
                </Link>
                . We welcome contributions, bug reports, and feature requests
                from the community.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Is Rivet free?</AccordionTrigger>
            <AccordionContent>
              <p>
                <Strong>Yes, Rivet is free.</Strong> You can use Rivet for free
                with no limits on the number of players. We offer premium
                support plans for teams that require additional support. For
                more information,
                <Link
                  href="https://rivet.gg/pricing"
                  target="_blank"
                  rel="noreferrer"
                >
                  please visit our pricing page
                </Link>
                .
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </NarrowPage>
    </>
  );
}

const searchSchema = z.object({
  modal: z.enum(["create-game", "create-group"]).optional().catch(undefined),
  groupId: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/_authenticated/_layout/")({
  validateSearch: zodSearchValidator(searchSchema),
  component: IndexRoute,
  beforeLoad: async ({ context: { queryClient } }) => {
    const [response] = await safeAsync(
      queryClient.fetchQuery(gamesQueryOptions()),
    );

    if (response && response.games.length > 0) {
      const lastTeam = ls.get("rivet-lastteam");
      if (lastTeam) {
        throw redirect({
          to: "/teams/$groupId",
          params: { groupId: lastTeam },
        });
      }
      throw redirect({
        to: "/teams/$groupId",
        params: { groupId: response.groups[0].groupId },
      });
    }
  },
});
