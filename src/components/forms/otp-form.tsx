import { UseFormReturn, useFormContext } from "react-hook-form";
import z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { InputHTMLAttributes } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { createSchemaForm } from "@/lib/create-schema-form";

export const formSchema = z.object({
  otp: z.string().min(8).max(8),
});

export type FormValues = z.infer<typeof formSchema>;
export type SubmitHandler = (
  values: FormValues,
  form: UseFormReturn<FormValues>,
) => Promise<void>;

const { Form, Submit } = createSchemaForm(formSchema);
export { Form, Submit };

export const Code = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="otp"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Code</FormLabel>
          <FormControl>
            <InputOTP
              {...props}
              {...field}
              maxLength={8}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
                <InputOTPSlot index={6} />
                <InputOTPSlot index={7} />
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
