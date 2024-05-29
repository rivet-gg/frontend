import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  createSchemaForm,
} from "@rivet-gg/components";
import { type UseFormReturn, useFormContext } from "react-hook-form";
import z from "zod";

// FIXME
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PROTOCOL_REGEX = /^\w+:/;
// FIXME
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DOMAIN_REGEX =
  /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/;

export const formSchema = z.object({
  name: z.string(),
  // .regex(PROTOCOL_REGEX, "Do not include web protocol in domain")
  // .regex(DOMAIN_REGEX, "Invalid domain"),
});

export type FormValues = z.infer<typeof formSchema>;
export type SubmitHandler = (
  values: FormValues,
  form: UseFormReturn<FormValues>,
) => Promise<void>;

const { Form, Submit } = createSchemaForm(formSchema);
export { Form, Submit };

export const Name = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Domain name</FormLabel>
          <FormControl>
            <Input placeholder="Enter a domain name..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
