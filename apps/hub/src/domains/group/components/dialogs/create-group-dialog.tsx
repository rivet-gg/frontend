import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
} from "@rivet-gg/components";
import * as GroupCreateForm from "@/domains/group/forms/group-create-form";
import { useGroupCreateMutation } from "../../queries";
import { useNavigate } from "@tanstack/react-router";

export default function CreateGroupDialogContent() {
  const navigate = useNavigate();
  const { mutateAsync } = useGroupCreateMutation({
    onSuccess: (data) => {
      navigate({ to: "/teams/$groupId", params: { groupId: data.groupId } });
    },
  });

  return (
    <>
      <GroupCreateForm.Form
        onSubmit={async (values) => {
          await mutateAsync({
            displayName: values.name,
          });
        }}
        defaultValues={{ name: "" }}
      >
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
        </DialogHeader>
        <Flex gap="4" direction="col">
          <GroupCreateForm.Name />
        </Flex>
        <DialogFooter>
          <GroupCreateForm.Submit type="submit">Create</GroupCreateForm.Submit>
        </DialogFooter>
      </GroupCreateForm.Form>
    </>
  );
}
