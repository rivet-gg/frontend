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
import { Input } from "../ui/input";
import { ReactNode } from "react";

export const formSchema = z.object({
  email: z.string().email(),
});

export type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  children: ReactNode;
  onSubmit: (values: FormValues) => Promise<void> | void;
}

export const LoginForm = ({ onSubmit, children }: LoginFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
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

const Email = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="Enter your email here..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

LoginForm.Email = Email;
