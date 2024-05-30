import { json, jsonParseLinter } from "@codemirror/lang-json";
import { linter } from "@codemirror/lint";
import {
  CodeMirrorContainer,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  MultiSelectFormField,
  Switch,
  createSchemaForm,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { githubDark } from "@uiw/codemirror-theme-github";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { regionSelectionQueryOptions } from "../data/rivet";
import { jsonString } from "../lib/zod";

export const formSchema = z.object({
  region: z.array(z.string()).nonempty(),
  mode: z.array(z.string()).nonempty(),
  maxPlayers: z.coerce.number(),
  tags: jsonString,
  config: jsonString,
  public: z.coerce.boolean(),
});
export type FormValues = z.infer<typeof formSchema>;

const { Form, Submit, Reset } = createSchemaForm(formSchema);
export { Form, Submit, Reset };

export function RegionInput() {
  const { control } = useFormContext<FormValues>();
  const { data } = useSuspenseQuery(regionSelectionQueryOptions());
  return (
    <FormField
      control={control}
      name="region"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Region</FormLabel>
          <FormControl>
            <MultiSelectFormField
              options={data}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Choose a region"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function GameModeInput() {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="mode"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Game Mode</FormLabel>
          <FormControl>
            <MultiSelectFormField
              options={[
                { value: "custom", label: "Custom" },
                { value: "default", label: "Default" },
              ]}
              onValueChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Choose a game mode"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function MaxPlayersInput() {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="maxPlayers"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Max Players</FormLabel>
          <FormControl>
            <Input type="number" min={0} max={Math.max()} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function TagsInput() {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="tags"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <FormControl>
            <CodeMirrorContainer>
              <ReactCodeMirror
                extensions={[json(), linter(jsonParseLinter())]}
                theme={githubDark}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            </CodeMirrorContainer>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function PublicInput() {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="public"
      render={({ field }) => (
        <FormItem className="border flex rounded-md px-4 py-2 items-center justify-between space-y-0">
          <FormLabel>Is public?</FormLabel>
          <FormControl>
            <Switch onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
