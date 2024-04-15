import { Button, ButtonProps, Form } from "@rivet-gg/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import {
  useForm,
  DefaultValues,
  UseFormReturn,
  FieldValues,
  useFormState,
  FormProvider,
} from "react-hook-form";
import z from "zod";

interface FormProps<FormValues extends FieldValues> {
  onSubmit: (
    values: FormValues,
    form: UseFormReturn<FormValues>,
  ) => Promise<void>;
  defaultValues: DefaultValues<FormValues> | DefaultValues<FormValues>;
  children: ReactNode;
}

export const createSchemaForm = <Schema extends z.ZodSchema>(
  schema: Schema,
) => {
  return {
    Form: ({
      defaultValues,
      children,
      onSubmit,
    }: FormProps<z.TypeOf<Schema>>) => {
      const form = useForm<z.TypeOf<Schema>>({
        resolver: zodResolver(schema),
        defaultValues,
      });

      return (
        <FormProvider {...form}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => onSubmit(values, form))}
              className="contents"
            >
              {children}
            </form>
          </Form>
        </FormProvider>
      );
    },
    Submit: (props: ButtonProps) => {
      const { isSubmitting, isValidating } = useFormState<z.TypeOf<Schema>>();
      return (
        <Button
          type="submit"
          isLoading={isSubmitting || isValidating}
          {...props}
        />
      );
    },
  };
};
