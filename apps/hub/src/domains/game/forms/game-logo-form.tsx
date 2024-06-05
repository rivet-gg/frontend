import { createSchemaForm } from "@/lib/create-schema-form";
import {
  FileInput,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  fileSize,
} from "@rivet-gg/components";
import { type UseFormReturn, useFormContext } from "react-hook-form";
import z from "zod";

const allowedTypes = ["image/png", "image/jpeg"];

export const formSchema = z.object({
  logo: z
    .custom<File>()
    .refine(
      (file) => file.size <= fileSize.megabytes(2),
      "File size should be less than 2MB.",
    )
    .refine(
      (file) => allowedTypes.includes(file.type),
      `File type should be one of ${allowedTypes.join(", ")}`,
    ),
});

export type FormValues = z.infer<typeof formSchema>;
export type SubmitHandler = (
  values: FormValues,
  form: UseFormReturn<FormValues>,
) => Promise<void>;

const { Form, Submit } = createSchemaForm(formSchema);
export { Form, Submit };

export const Logo = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="logo"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Logo</FormLabel>
          <FormControl>
            <FileInput<FormValues>
              name="logo"
              field={field}
              accept={allowedTypes.join(", ")}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
