import * as GroupImageForm from "@/domains/game/forms/game-logo-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@rivet-gg/components";
import { useGameLogoUploadMutation } from "../queries";

interface GameLogoSettingsCardProps {
  gameId: string;
}

export function GameLogoSettingsCard({ gameId }: GameLogoSettingsCardProps) {
  const { mutateAsync } = useGameLogoUploadMutation(gameId);
  return (
    <GroupImageForm.Form
      onSubmit={async (values, form) => {
        try {
          await mutateAsync({ file: values.logo });
        } catch {
          form.setError("logo", {
            type: "manual",
            message: "An error occurred while uploading the image",
          });
        }
      }}
      defaultValues={{ logo: undefined }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Game Logo</CardTitle>
        </CardHeader>
        <CardContent>
          <GroupImageForm.Logo />
        </CardContent>
        <CardFooter>
          <GroupImageForm.Submit>Save</GroupImageForm.Submit>
        </CardFooter>
      </Card>
    </GroupImageForm.Form>
  );
}
