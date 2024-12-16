import * as GroupCreateForm from "@/domains/group/forms/group-create-form";
import { useGroupCreateMutation } from "@/domains/group/queries";
import { BillingProvider } from "@/domains/project/components/billing/billing-context";
import { BillingPlans } from "@/domains/project/components/billing/billing-plans";
import * as GroupCreateProjectForm from "@/domains/project/forms/group-create-project-form";
import {
  projectsByGroupQueryOptions,
  useProjectCreateMutation,
} from "@/domains/project/queries";
import { Rivet as RivetEe } from "@rivet-gg/api-ee";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Suspense, useState } from "react";

enum Step {
  CreateGroup = 0,
  CreateProject = 1,
  ChoosePlan = 2,
}

export function Intro({ initialStep }: { initialStep?: Step }) {
  const { mutateAsync, data: createdGroupResponse } = useGroupCreateMutation();
  const { mutateAsync: createProject, data: projectCreationData } =
    useProjectCreateMutation();

  const { data } = useSuspenseQuery(projectsByGroupQueryOptions());

  const project =
    data
      .flatMap((team) => team.projects)
      .find((project) => project.gameId === projectCreationData?.gameId) ||
    // biome-ignore lint/style/noNonNullAssertion: at this point user should have at least one project
    data.find((team) => team.projects.length > 0)!.projects[0]!;

  const [step, setStep] = useState<Step>(
    () => initialStep ?? (!project ? Step.CreateGroup : Step.CreateProject),
  );

  const groupId = createdGroupResponse?.groupId || project.developer.groupId;

  const navigate = useNavigate();

  if (step === Step.CreateProject) {
    return (
      <Card asChild className="max-w-xl mx-auto">
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
                setStep(Step.ChoosePlan);
              }}
            >
              <CardHeader>
                <CardTitle>Create Project</CardTitle>
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

  if (step === Step.ChoosePlan) {
    return (
      <Suspense
        fallback={
          <Card asChild>
            <motion.div
              layoutId="card"
              key="choose-plan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-24" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-48" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Skeleton className="w-[250px] h-[445px]" />
                  <Skeleton className="w-[250px] h-[445px]" />
                  <Skeleton className="w-[250px] h-[445px]" />
                  <Skeleton className="w-[250px] h-[445px]" />
                </div>
              </CardContent>
            </motion.div>
          </Card>
        }
      >
        <Card asChild>
          <motion.div
            layoutId="card"
            key="choose-plan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CardHeader>
              <CardTitle>Choose a Plan</CardTitle>
              <CardDescription>
                You've created a team! Now you can create projects and invite
                teammates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BillingProvider groupId={groupId} projectId={project.gameId}>
                <BillingPlans
                  projectId={project.gameId}
                  onChoosePlan={() => {
                    navigate({
                      to: "/projects/$projectNameId/environments/$environmentNameId",
                      params: {
                        projectNameId: project.nameId,
                        environmentNameId: "prod",
                      },
                    });
                  }}
                  config={{
                    [RivetEe.ee.billing.Plan.Trial]: {
                      cancelLabel: "Continue",
                      onCancel: () => {
                        navigate({
                          to: "/projects/$projectNameId/environments/$environmentNameId",
                          params: {
                            projectNameId: project.nameId,
                            environmentNameId: "prod",
                          },
                        });
                      },
                    },
                  }}
                />
              </BillingProvider>
            </CardContent>
          </motion.div>
        </Card>
      </Suspense>
    );
  }

  return (
    <Card asChild className="max-w-md mx-auto">
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
              <CardTitle>Create Team</CardTitle>
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
