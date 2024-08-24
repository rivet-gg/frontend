import * as CreateDynamicServerForm from "@/domains/game/forms/create-dynamic-server-form";
import type { DialogContentProps } from "@/hooks/use-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
} from "@rivet-gg/components";
import { useCreateDynamicServerMutation } from "../../queries";

interface CreateDynamicServerDialogProps extends DialogContentProps {
  environmentId: string;
  gameId: string;
}

export default function CreateDynamicServerDialog({
  environmentId,
  gameId,
  onClose,
}: CreateDynamicServerDialogProps) {
  const { mutateAsync } = useCreateDynamicServerMutation({
    onSuccess: onClose,
  });

  return (
    <>
      <CreateDynamicServerForm.Form
        onSubmit={async (values) => {
          await mutateAsync({
            gameId,
            environmentId,
            datacenter: values.datacenter,
            tags: Object.fromEntries(
              values.tags?.split(",").map((tag) => tag.split("=")) ?? [],
            ),
            runtime: {
              build: values.runtime.build,
              arguments: values.runtime.arguments?.split(" "),
              environment: Object.fromEntries(
                values.runtime.environment?.map(({ key, value }) => [
                  key,
                  value,
                ]) ?? [],
              ),
            },
            resources: {
              cpu: values.resources.cpu,
              memory: values.resources.memory,
            },
            network: {
              mode: values.network.mode,
              ports: Object.fromEntries(
                values.network.ports?.map(
                  ({ name, protocol, internalPort, routing }) => [
                    name,
                    {
                      protocol,
                      internalPort,
                      routing: {
                        gameGuard: routing === "gameguard" ? {} : undefined,
                        host: routing === "host" ? {} : undefined,
                      },
                    },
                  ],
                ) ?? [],
              ),
            },
            lifecycle: {
              killTimeout: values.lifecycle.killTimeout,
            },
          });
        }}
        defaultValues={{
          datacenter: "",
          runtime: { build: "", arguments: "", environment: [] },
          network: { mode: "host" },
        }}
      >
        <DialogHeader>
          <DialogTitle>Create New Server</DialogTitle>
        </DialogHeader>
        <Flex gap="4" direction="col">
          <CreateDynamicServerForm.Datacenter
            environmentId={environmentId}
            gameId={gameId}
          />
          <CreateDynamicServerForm.Tags />
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="runtime">
              <AccordionTrigger>Runtime</AccordionTrigger>
              <AccordionContent className="px-2">
                <Flex gap="4" direction="col">
                  <CreateDynamicServerForm.Build
                    environmentId={environmentId}
                    gameId={gameId}
                  />
                  <CreateDynamicServerForm.Arguments />
                  <CreateDynamicServerForm.Environment />
                </Flex>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="network">
              <AccordionTrigger>Network</AccordionTrigger>
              <AccordionContent className="px-2">
                <Flex gap="4" direction="col">
                  <CreateDynamicServerForm.NetworkMode />
                  <CreateDynamicServerForm.Ports />
                </Flex>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="resources">
              <AccordionTrigger>Resources</AccordionTrigger>
              <AccordionContent className="px-2">
                <Flex gap="4" direction="col">
                  <CreateDynamicServerForm.ResourcesCpu />
                  <CreateDynamicServerForm.ResourcesMemory />
                </Flex>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="lifecycle">
              <AccordionTrigger>Lifecycle</AccordionTrigger>
              <AccordionContent className="px-2">
                <Flex gap="4" direction="col">
                  <CreateDynamicServerForm.KillTimeout />
                </Flex>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Flex>
        <DialogFooter>
          <CreateDynamicServerForm.Submit type="submit">
            Create
          </CreateDynamicServerForm.Submit>
        </DialogFooter>
      </CreateDynamicServerForm.Form>
    </>
  );
}
