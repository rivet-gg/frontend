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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  FormDescription,
} from "@rivet-gg/components";
import { rivetEeClient } from "@/queries/global";
import { convertStringToId } from "@/lib/utils";
import { validateAgainstApi } from "@/lib/async-validation";
import { Rivet as RivetEe } from "@rivet-gg/api-ee";

export const formSchema = z
  .object({
    name: z.string().max(25),
    slug: z.string().max(25).optional(),
    tier: z.union([
      z.literal(RivetEe.ee.opengb.Tier.Dedicated),
      z.literal(RivetEe.ee.opengb.Tier.Shared),
    ]),
    projectId: z.string(),
  })
  .superRefine(async (arg, ctx) => {
    const res = await rivetEeClient.ee.cloud.opengb.projects.envs.validate(
      arg.projectId,
      {
        displayName: arg.name,
        nameId: arg.slug || convertStringToId(arg.name),
      },
    );

    validateAgainstApi({
      group: "GAME_NAMESPACE",
      errors: res.errors,
    }).setSchemaIssues(ctx, {
      name: "display-name",
      slug: "name-id",
    });

    return z.NEVER;
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
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter a environment name..."
              maxLength={25}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const Slug = () => {
  const { control, watch } = useFormContext<FormValues>();

  const name = watch("name");

  return (
    <FormField
      control={control}
      name="slug"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Slug</FormLabel>
          <FormControl>
            <Input
              placeholder={name ? convertStringToId(name) : "Enter a slug..."}
              maxLength={25}
              {...field}
              onChange={(event) => {
                const value = event.target.value
                  .replace(/[\s-]+/g, "-")
                  .toLowerCase();
                field.onChange({ target: { value } });
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const Tier = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="tier"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tier</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={`${field.value}`}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select tier" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.entries(RivetEe.ee.opengb.Tier).map(([label, value]) => (
                <SelectItem key={value} value={`${value}`}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>This can't be changed later.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
