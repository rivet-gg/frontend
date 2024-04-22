import { UseFormReturn, useFormContext } from "react-hook-form";
import z from "zod";
import { createSchemaForm } from "@/lib/create-schema-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormMessage,
} from "@rivet-gg/components";
import { rivetClient } from "@/queries/global";
import { TraversableErrors, VALIDATION_ERRORS } from "@/lib/traversable-errors";
import { convertStringToId } from "@/lib/utils";

const LOBBY_COUNT_MAX = 32768 - 1;

export const formSchema = z.object({
  lobbyCountMax: z.coerce.number().min(1).max(LOBBY_COUNT_MAX),
  maxPlayers: z.coerce.number().min(1).max(LOBBY_COUNT_MAX),
});

export type FormValues = z.infer<typeof formSchema>;
export type SubmitHandler = (
  values: FormValues,
  form: UseFormReturn<FormValues>,
) => Promise<void>;

const { Form, Submit } = createSchemaForm(formSchema);
export { Form, Submit };

export const LobbyCountMax = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="lobbyCountMax"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Max lobby count</FormLabel>
          <FormControl>
            <Input placeholder="Enter a number..." type="number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const MaxPlayers = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="maxPlayers"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Max players</FormLabel>
          <FormControl>
            <Input placeholder="Enter a number..." type="number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
