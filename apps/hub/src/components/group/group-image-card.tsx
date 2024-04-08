import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@rivet-gg/components";
import * as GroupImageForm from "@/forms/group/group-image-form";
import { useAvatarUploadMutation } from "@/queries/groups";

interface GroupImageCardProps {
  groupId: string;
}

export function GroupImageCard({ groupId }: GroupImageCardProps) {
  const { mutateAsync } = useAvatarUploadMutation(groupId);
  return (
    <GroupImageForm.Form
      onSubmit={async (values, form) => {
        try {
          await mutateAsync({ file: values.image });
        } catch {
          form.setError("image", {
            type: "manual",
            message: "An error occurred while uploading the image",
          });
        }
      }}
      defaultValues={{ image: undefined }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Team image</CardTitle>
        </CardHeader>
        <CardContent>
          <GroupImageForm.Image />
        </CardContent>
        <CardFooter>
          <GroupImageForm.Submit>Save</GroupImageForm.Submit>
        </CardFooter>
      </Card>
    </GroupImageForm.Form>
  );
}
