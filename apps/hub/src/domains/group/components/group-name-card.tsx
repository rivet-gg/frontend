import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@rivet-gg/components";
import * as GroupNameForm from "@/domains/group/forms/group-name-form";
import { groupGamesQueryOptions } from "@/domains/game/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGroupUpdateProfileMutation } from "@/domains/group/queries";

interface GroupNameCardProps {
  groupId: string;
}

export function GroupNameCard({ groupId }: GroupNameCardProps) {
  const { data } = useSuspenseQuery(groupGamesQueryOptions(groupId));
  const { mutateAsync } = useGroupUpdateProfileMutation();
  return (
    <GroupNameForm.Form
      onSubmit={(values) => {
        return mutateAsync({ groupId, displayName: values.name });
      }}
      defaultValues={{ name: data?.displayName }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Team Name</CardTitle>
          <CardDescription>
            Used to identify your team in various parts of the ecosystem.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GroupNameForm.Name />
        </CardContent>
        <CardFooter>
          <GroupNameForm.Submit>Save</GroupNameForm.Submit>
        </CardFooter>
      </Card>
    </GroupNameForm.Form>
  );
}
