import { useForm, useFormContext } from "react-hook-form";
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
import { ReactNode } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

export const formSchema = z.object({
  otp: z.string().min(8).max(8),
});

export type FormValues = z.infer<typeof formSchema>;

interface OtpFormProps {
  children: ReactNode;
  onSubmit: (values: FormValues) => Promise<void> | void;
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="contents">
        {children}
      </form>
    </Form>
  );
};

const Code = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="otp"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Code</FormLabel>
          <FormControl>
            <InputOTP maxLength={8} {...field}>
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

OtpForm.Code = Code;
