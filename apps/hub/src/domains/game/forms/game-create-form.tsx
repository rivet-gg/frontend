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

export const formSchema = z
  .object({
    name: z.string().max(25),
    slug: z.string().max(25).optional(),
  })
  .superRefine(async (arg, ctx) => {
    const res = await rivetClient.cloud.games.games.validateGame({
      displayName: arg.name,
      nameId: arg.slug || convertStringToId(arg.name),
    });
    const errors = new TraversableErrors(VALIDATION_ERRORS.GAME_NAMESPACE);
    errors.load(res.errors.map((e) => e.path));

    if (!errors.isEmpty()) {
      const displayNameErrors = errors.findFormatted("display-name");
      if (displayNameErrors.length > 0) {
        ctx.addIssue({
          path: ["name"],
          code: z.ZodIssueCode.custom,
          message: displayNameErrors[0] || "",
        });
      }

      const nameIdErrors = errors.findFormatted("name-id");
      if (nameIdErrors.length > 0) {
        ctx.addIssue({
          path: ["slug"],
          code: z.ZodIssueCode.custom,
          message: nameIdErrors[0] || "",
        });
      }
    }

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
              placeholder="Enter a game name..."
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
