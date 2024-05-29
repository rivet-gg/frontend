import { json, jsonParseLinter } from "@codemirror/lang-json";
import { linter } from "@codemirror/lint";
import {
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
import { regionQueryOptions, regionSelectionQueryOptions } from "../data/rivet";

export const formSchema = z.object({
  region: z.string().min(1, "Required"),
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
              onValueChange={() => {}}
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
      name="region"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Game Mode</FormLabel>
          <FormControl>
            <MultiSelectFormField
              options={[
                { value: "custom", label: "Custom" },
                { value: "default", label: "Default" },
              ]}
              onValueChange={() => {}}
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
            <ReactCodeMirror
              extensions={[json(), linter(jsonParseLinter())]}
              theme={githubDark}
              {...field}
            />
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
            <Switch {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function ConfigInput() {
  const { control } = useFormContext<FormValues>();
  return (
    <FormField
      control={control}
      name="config"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Config</FormLabel>
          <FormControl>
            <ReactCodeMirror
              extensions={[json(), linter(jsonParseLinter())]}
              theme={githubDark}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
