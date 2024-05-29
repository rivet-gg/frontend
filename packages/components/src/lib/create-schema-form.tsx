import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import {
  useForm,
  type DefaultValues,
  type UseFormReturn,
  type FieldValues,
  useFormState,
  useFormContext,
} from "react-hook-form";
import type z from "zod";
import { Form } from "../ui/form";
import { Button, type ButtonProps } from "../ui/button";

interface FormProps<FormValues extends FieldValues> {
  onSubmit?: SubmitHandler<FormValues>;
  defaultValues: DefaultValues<FormValues>;
  children: ReactNode;
}

type SubmitHandler<FormValues extends FieldValues> = (values: FormValues, form: UseFormReturn<FormValues>) => Promise<void> | void;

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
              return form.handleSubmit((values) => onSubmit?.(values, form))(
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
    Submit: ({onSubmit, ...props}: Omit<ButtonProps, "onSubmit"> & {onSubmit?: SubmitHandler<z.TypeOf<Schema>>}) => {
      const form = useFormContext<z.TypeOf<Schema>>();
      const { isSubmitting, isValidating } = useFormState<z.TypeOf<Schema>>();
      return (
        <Button
          type="submit"
          isLoading={isSubmitting || isValidating}
          onClick={onSubmit ? form.handleSubmit((values) => onSubmit(values, form)) : undefined}
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
