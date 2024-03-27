import {
  UseFormReturn,
  useForm,
  useFormContext,
  useFormState,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { InputHTMLAttributes, ReactNode } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button, ButtonProps } from "../ui/button";

export const formSchema = z.object({
  otp: z.string().min(8).max(8),
});

export type FormValues = z.infer<typeof formSchema>;
export type FormSubmitHandler = (
  values: FormValues,
  form: UseFormReturn<FormValues>,
) => Promise<void>;

interface OtpFormProps {
  children: ReactNode;
  onSubmit: FormSubmitHandler;
}

export const OtpForm = ({ onSubmit, children }: OtpFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values, form))}
        className="contents"
      >
        {children}
      </form>
    </Form>
  );
};

const Code = (props: InputHTMLAttributes<HTMLInputElement>) => {
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

const Submit = (props: ButtonProps) => {
  const { isSubmitting } = useFormState<FormValues>();
  return <Button type="submit" disabled={isSubmitting} {...props} />;
};

OtpForm.Code = Code;
OtpForm.Submit = Submit;
