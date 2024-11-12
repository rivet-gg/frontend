import * as ProjectCreateForm from "@/domains/project/forms/group-create-project-form";
import { convertStringToId } from "@/lib/utils";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
} from "@rivet-gg/components";
import { useNavigate } from "@tanstack/react-router";
import { useProjectCreateMutation } from "../../queries";

interface ContentProps {
  groupId: string;
}

export default function CreateGroupProjectDialogContent({
  groupId,
}: ContentProps) {
  const navigate = useNavigate();
  const { mutateAsync } = useProjectCreateMutation({
    onSuccess: (data) => {
      navigate({
        to: "/projects/$projectId",
        params: { projectId: data.gameId },
      });
    },
  });

  return (
    <>
      <ProjectCreateForm.Form
        onSubmit={async (values) => {
          await mutateAsync({
            developerGroupId: groupId,
            displayName: values.name,
            nameId: values.slug || convertStringToId(values.name),
          });
        }}
        defaultValues={{ name: "", slug: "" }}
      >
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <Flex gap="4" direction="col">
          <ProjectCreateForm.Name />
          <ProjectCreateForm.Slug />
        </Flex>
        <DialogFooter>
          <ProjectCreateForm.Submit type="submit">
            Create
          </ProjectCreateForm.Submit>
        </DialogFooter>
      </ProjectCreateForm.Form>
    </>
  );
}
