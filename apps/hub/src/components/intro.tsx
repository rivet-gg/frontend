import * as GroupCreateForm from "@/domains/group/forms/group-create-form";
import { useGroupCreateMutation } from "@/domains/group/queries";
import * as GroupCreateProjectForm from "@/domains/project/forms/group-create-project-form";
import {
  projectsByGroupQueryOptions,
  useProjectCreateMutation,
} from "@/domains/project/queries";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";

enum Step {
  CreateGroup = 0,
  CreateProject = 1,
  LinkProject = 2,
}

export function Intro() {
  const { mutateAsync, data: createdGroupResponse } = useGroupCreateMutation();
  const { mutateAsync: createProject } = useProjectCreateMutation();

  const { data } = useSuspenseQuery(projectsByGroupQueryOptions());

  const [step, setStep] = useState<Step>(() =>
    data.length === 0 ? Step.CreateGroup : Step.LinkProject,
  );

  if (step === Step.LinkProject) {
    return (
      <Card asChild>
        <motion.div layoutId="card">
          <motion.div
            key="link-project"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CardHeader>
              <CardTitle>You're all set!</CardTitle>
              <CardDescription>
                You've created a project! Now you can link your project with
                project engine of choice and start building.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button asChild variant="outline">
                  <a
                    className="flex-1"
                    href="https://rivet.gg/docs/godot/tutorials/quickstart"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Godot
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    className="flex-1"
                    href="https://rivet.gg/docs/unity/tutorials/quickstart"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Unity
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    className="flex-1"
                    href="https://rivet.gg/docs/unreal/tutorials/quickstart"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Unreal Engine
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    className="flex-1"
                    href="https://rivet.gg/docs/html5/tutorials/quickstart"
                    target="_blank"
                    rel="noreferrer"
                  >
                    HTML5
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    className="flex-1"
                    href="https://rivet.gg/docs/custom/tutorials/quickstart"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Custom
                  </a>
                </Button>
              </div>
            </CardContent>
          </motion.div>
        </motion.div>
      </Card>
    );
  }

  if (step === Step.CreateProject) {
    return (
      <Card asChild>
        <motion.div layoutId="card">
          <motion.div
            key="create-project"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GroupCreateProjectForm.Form
              defaultValues={{ slug: "", name: "" }}
              onSubmit={async (values) => {
                await createProject({
                  displayName: values.name,
                  nameId: values.slug,
                  developerGroupId:
                    createdGroupResponse?.groupId || data[0].groupId,
                });
                setStep(Step.LinkProject);
              }}
            >
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>
                  You've created a team! Now you can create projects and invite
                  teammates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[auto_auto_min-content] items-center gap-4 ">
                  <GroupCreateProjectForm.Name className="contents space-y-0" />
                  <GroupCreateProjectForm.Slug className="contents space-y-0" />
                  <GroupCreateProjectForm.Submit
                    type="submit"
                    className="col-start-3 row-start-2"
                  >
                    Create
                  </GroupCreateProjectForm.Submit>
                </div>
              </CardContent>
            </GroupCreateProjectForm.Form>
          </motion.div>
        </motion.div>
      </Card>
    );
  }

  return (
    <Card>
      <motion.div layoutId="card">
        <motion.div
          key="create-group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <GroupCreateForm.Form
            onSubmit={async (values) => {
              await mutateAsync({
                displayName: values.name,
              });
              setStep(Step.CreateProject);
            }}
            defaultValues={{ name: "" }}
          >
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>
                Before you start, you need to create a team. This will allow you
                to create projects and invite teammates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-[auto_min-content] items-center gap-4 ">
                <GroupCreateForm.Name className="contents space-y-0" />
                <GroupCreateForm.Submit
                  type="submit"
                  className="col-start-2 row-start-2"
                >
                  Create
                </GroupCreateForm.Submit>
              </div>
            </CardContent>
          </GroupCreateForm.Form>
        </motion.div>
      </motion.div>
    </Card>
  );
}
