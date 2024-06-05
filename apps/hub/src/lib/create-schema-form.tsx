import { Button, ButtonProps, Form } from "@rivet-gg/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import {
  useForm,
  DefaultValues,
  UseFormReturn,
  FieldValues,
  useFormState,
  useFormContext,
} from "react-hook-form";
import z from "zod";

interface FormProps<FormValues extends FieldValues> {
  onSubmit: (
    values: FormValues,
    form: UseFormReturn<FormValues>,
  ) => Promise<void>;
  defaultValues: DefaultValues<FormValues>;
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
        reValidateMode: "onSubmit",
        resolver: zodResolver(schema),
        defaultValues,
      });

      return (
        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.stopPropagation();
              return form.handleSubmit((values) => onSubmit(values, form))(
                event,
              );
            }}
            className="contents"
          >
            {children}
          </form>
        </Form>
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
    Reset: (props: ButtonProps) => {
      const { defaultValues, isDirty } = useFormState<z.TypeOf<Schema>>();
      const { reset } = useFormContext<z.TypeOf<Schema>>();
      return (
        <Button
          type="button"
          disabled={!isDirty}
          onClick={() => reset(defaultValues)}
          {...props}
        />
      );
    },
  };
};
