import { createSchemaForm } from "@/lib/create-schema-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Slider,
} from "@rivet-gg/components";
import { type UseFormReturn, useFormContext } from "react-hook-form";
import z from "zod";

export const AUTOSCALING_VALUE_MAP = [
  { value: 0.25, memory: 1, vcpu: 0.25 },
  { value: 0.5, memory: 2, vcpu: 0.5 },
  { value: 1, memory: 4, vcpu: 1 },
  { value: 2, memory: 8, vcpu: 2 },
  { value: 3, memory: 12, vcpu: 3 },
  { value: 4, memory: 16, vcpu: 4 },
  { value: 5, memory: 20, vcpu: 5 },
  { value: 6, memory: 24, vcpu: 6 },
  { value: 7, memory: 28, vcpu: 7 },
  { value: 8, memory: 32, vcpu: 8 },
];

export const formSchema = z.object({
  autoscalling: z.object({
    min: z.coerce.number().min(0).max(AUTOSCALING_VALUE_MAP.length),
    max: z.coerce.number().min(0).max(AUTOSCALING_VALUE_MAP.length),
  }),
});

export type FormValues = z.infer<typeof formSchema>;
export type SubmitHandler = (
  values: FormValues,
  form: UseFormReturn<FormValues>,
) => Promise<void>;

const { Form, Submit } = createSchemaForm(formSchema);
export { Form, Submit };

export const Autoscaling = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="autoscalling"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Autoscaling</FormLabel>
          <FormControl>
            <Slider
              {...field}
              step={1}
              min={0}
              max={AUTOSCALING_VALUE_MAP.length}
              value={[field.value.min, field.value.max]}
              defaultValue={[field.value.min, field.value.max]}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
