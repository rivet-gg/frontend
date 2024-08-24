import { createSchemaForm } from "@/lib/create-schema-form";
import { findDuplicated } from "@/lib/utils";
import { faPlus, faTrash } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rivet } from "@rivet-gg/api";
import {
  Button,
  Code,
  Flex,
  FormControl,
  FormDescription,
  FormField,
  FormFieldContext,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@rivet-gg/components";
import {
  type UseFormReturn,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import z from "zod";
import { GameServerBuildSelect } from "../components/game-servers/game-server-build-select";
import { GameServerDatacenterSelect } from "../components/game-servers/game-server-datacenter-select";
import { GameServerNetworkModeSelect } from "../components/game-servers/game-server-network-mode-select";
import { GameServerNetworkProtocolSelect } from "../components/game-servers/game-server-network-protocol-select";

export const formSchema = z.object({
  datacenter: z.string().min(1, "Server datacenter is required"),
  runtime: z.object({
    build: z.string().min(1, "Server build is required"),
    arguments: z.string().optional(),
    environment: z
      .array(
        z.object({
          key: z.string().min(1, "Name is required"),
          value: z.string().min(1, "Value is required"),
        }),
      )
      .refine(
        (data) => findDuplicated(data, "key").length === 0,
        (data) => ({
          message: "Names must be unique",
          path: [findDuplicated(data, "key")[0], "key"],
        }),
      )
      .optional(),
  }),
  tags: z.string().optional(),
  network: z.object({
    mode: z.nativeEnum(Rivet.servers.NetworkMode),
    ports: z
      .array(
        z.object({
          name: z.string().min(1, "Port name is required"),
          protocol: z.nativeEnum(Rivet.servers.PortProtocol),
          internalPort: z.coerce
            .number()
            .int("Invalid port number")
            .min(1, "Invalid port number")
            .max(65535, "Invalid port number")
            .safe("Invalid port number")
            .optional(),
          routing: z
            .enum(["host", "gameguard", "none"])
            .or(z.string().min(1, "Routing is required"))
            .optional(),
        }),
      )
      .refine(
        (data) => findDuplicated(data, "name").length === 0,
        (data) => ({
          message: "Port names must be unique",
          path: [findDuplicated(data, "name")[0], "name"],
        }),
      )
      .optional(),
  }),
  resources: z.object({
    cpu: z.coerce
      .number({
        message: "Amount of CPU milicores is required",
      })
      .min(1)
      .int("Invalid number of CPU milicores")
      .safe("Invalid number of CPU milicores")
      .positive("Invalid number of CPU milicores"),
    memory: z.coerce
      .number({
        message: "Memory is required",
      })
      .min(1)
      .positive("Invalid amount of memory")
      .int("Invalid amount of memory")
      .safe("Invalid amount of memory"),
  }),
  lifecycle: z.object({
    killTimeout: z.coerce
      .number()
      .min(1)
      .positive("Invalid kill timeout")
      .int("Invalid kill timeout")
      .safe("Invalid kill timeout")
      .optional(),
  }),
});

export type FormValues = z.infer<typeof formSchema>;
export type SubmitHandler = (
  values: FormValues,
  form: UseFormReturn<FormValues>,
) => Promise<void>;

const { Form, Submit } = createSchemaForm(formSchema);
export { Form, Submit };

export const Datacenter = ({
  gameId,
  environmentId,
}: { gameId: string; environmentId: string }) => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="datacenter"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Datacenter</FormLabel>
          <FormControl>
            <GameServerDatacenterSelect
              gameId={gameId}
              environmentId={environmentId}
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={`${field.value}`}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const Build = ({
  gameId,
  environmentId,
}: { gameId: string; environmentId: string }) => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="runtime.build"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Build</FormLabel>
          <FormControl>
            <GameServerBuildSelect
              gameId={gameId}
              environmentId={environmentId}
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={`${field.value}`}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const Arguments = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="runtime.arguments"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Arguments</FormLabel>
          <FormControl>
            <Input
              {...field}
              className="font-mono"
              placeholder="--map=as_snow"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export const Tags = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="tags"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <Input
              {...field}
              className="font-mono"
              placeholder="tag1=value1,tag2=value2"
            />
          </FormControl>
          <FormDescription>
            Tags are key-value pairs that can be used to filter servers in the
            API. Add tags in the format <Code>key=value</Code> separated by
            commas.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const Environment = () => {
  const { control, register } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    name: "runtime.environment",
    control,
  });
  return (
    <Flex direction="col">
      <FormLabel>Environment</FormLabel>
      <FormControl>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Value</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell className="align-top">
                  <FormFieldContext.Provider
                    value={{ name: `runtime.environment.${index}.key` }}
                  >
                    <FormItem flex="1">
                      <FormControl>
                        <Input
                          className="font-mono"
                          placeholder="NO_CLIP"
                          {...register(`runtime.environment.${index}.key`)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormFieldContext.Provider>
                </TableCell>
                <TableCell className="align-top">
                  <FormFieldContext.Provider
                    value={{ name: `runtime.environment.${index}.value` }}
                  >
                    <FormItem flex="1">
                      <FormControl>
                        <Input
                          className="font-mono"
                          placeholder="1"
                          {...register(`runtime.environment.${index}.value`)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormFieldContext.Provider>
                </TableCell>
                <TableCell className="align-top">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="align-top">
              <TableCell colSpan={3} className="text-center">
                <Button
                  type="button"
                  variant="outline"
                  endIcon={<FontAwesomeIcon icon={faPlus} />}
                  onClick={() => append({ key: "", value: "" })}
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </FormControl>
    </Flex>
  );
};

export const NetworkMode = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="network.mode"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Mode</FormLabel>
          <FormControl>
            <GameServerNetworkModeSelect
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={`${field.value}`}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const Ports = () => {
  const { control, register, setValue } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    name: "network.ports",
    control,
  });
  return (
    <Flex direction="col">
      <FormLabel>Ports</FormLabel>
      <FormControl>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Port</TableHead>
              <TableHead>Internal port</TableHead>
              <TableHead>Protocol</TableHead>
              <TableHead>Routing</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => {
              return (
                <TableRow key={field.id}>
                  <TableCell className="align-top">
                    <FormFieldContext.Provider
                      value={{ name: `network.ports.${index}.name` }}
                    >
                      <FormItem flex="1">
                        <FormControl>
                          <Input
                            placeholder="Game"
                            {...register(`network.ports.${index}.name`)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormFieldContext.Provider>
                  </TableCell>
                  <TableCell className="align-top">
                    <FormFieldContext.Provider
                      value={{ name: `network.ports.${index}.internalPort` }}
                    >
                      <FormItem flex="1">
                        <FormControl>
                          <Input
                            className="font-mono"
                            placeholder="3000"
                            type="number"
                            {...register(`network.ports.${index}.internalPort`)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormFieldContext.Provider>
                  </TableCell>
                  <TableCell className="align-top">
                    <FormFieldContext.Provider
                      value={{ name: `network.ports.${index}.protocol` }}
                    >
                      <FormItem flex="1">
                        <FormControl>
                          <GameServerNetworkProtocolSelect
                            {...register(`network.ports.${index}.protocol`)}
                            onValueChange={(value) =>
                              setValue(`network.ports.${index}.protocol`, value)
                            }
                            defaultValue={`${field.protocol}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormFieldContext.Provider>
                  </TableCell>
                  <TableCell className="align-top">
                    <Select
                      {...register(`network.ports.${index}.routing`)}
                      onValueChange={(value) =>
                        setValue(`network.ports.${index}.routing`, value)
                      }
                      defaultValue={`${field.routing}`}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select network mode..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="gameguard">Game Guard</SelectItem>
                        <SelectItem value="host">Host</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="align-top">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                <Button
                  type="button"
                  variant="outline"
                  endIcon={<FontAwesomeIcon icon={faPlus} />}
                  onClick={() =>
                    append({ name: "", protocol: "tcp", routing: "none" })
                  }
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </FormControl>
    </Flex>
  );
};

export const ResourcesCpu = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="resources.cpu"
      render={({ field }) => (
        <FormItem>
          <FormLabel>CPU</FormLabel>
          <FormControl>
            <Input {...field} type="number" placeholder="125" />
          </FormControl>
          <FormDescription>
            The number of CPU cores in millicores, or 1/1000 of a core. For
            example, 1/8 of a core would be 125 millicores, and 1 core would be
            1000 millicores.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export const ResourcesMemory = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="resources.memory"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Memory</FormLabel>
          <FormControl>
            <Input {...field} type="number" placeholder="1024" />
          </FormControl>
          <FormDescription>The amount of memory in megabytes.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export const KillTimeout = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="lifecycle.killTimeout"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Kill timeout</FormLabel>
          <FormControl>
            <Input {...field} type="number" placeholder="12000" />
          </FormControl>
          <FormDescription>
            The duration to wait for in milliseconds before killing the server.
            This should be set to a safe default, and can be overridden during a
            DELETE request if needed.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
