import * as GroupCreateGameForm from "@/domains/game/forms/group-create-game-form";
import {
  gamesQueryOptions,
  useGameCreateMutation,
} from "@/domains/game/queries";
import * as GroupCreateForm from "@/domains/group/forms/group-create-form";
import { useGroupCreateMutation } from "@/domains/group/queries";
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
  CreateGame = 1,
  LinkGame = 2,
}

export function Intro() {
  const { mutateAsync, data: createdGroupResponse } = useGroupCreateMutation();
  const { mutateAsync: createGame } = useGameCreateMutation();

  const { data } = useSuspenseQuery(gamesQueryOptions());

  const [step, setStep] = useState<Step>(() =>
    data.length === 0 ? Step.CreateGroup : Step.LinkGame,
  );

  if (step === Step.LinkGame) {
    return (
      <Card asChild>
        <motion.div layoutId="card">
          <motion.div
            key="link-game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CardHeader>
              <CardTitle>You're all set!</CardTitle>
              <CardDescription>
                You've created a game! Now you can link your game with game
                engine of choice and start building.
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

  if (step === Step.CreateGame) {
    return (
      <Card asChild>
        <motion.div layoutId="card">
          <motion.div
            key="create-game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GroupCreateGameForm.Form
              defaultValues={{ slug: "", name: "" }}
              onSubmit={async (values) => {
                await createGame({
                  displayName: values.name,
                  nameId: values.slug,
                  developerGroupId:
                    createdGroupResponse?.groupId || data[0].groupId,
                });
                setStep(Step.LinkGame);
              }}
            >
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>
                  You've created a team! Now you can create games and invite
                  teammates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[auto_auto_min-content] items-center gap-4 ">
                  <GroupCreateGameForm.Name className="contents space-y-0" />
                  <GroupCreateGameForm.Slug className="contents space-y-0" />
                  <GroupCreateGameForm.Submit
                    type="submit"
                    className="col-start-3 row-start-2"
                  >
                    Create
                  </GroupCreateGameForm.Submit>
                </div>
              </CardContent>
            </GroupCreateGameForm.Form>
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
              setStep(Step.CreateGame);
            }}
            defaultValues={{ name: "" }}
          >
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>
                Before you start, you need to create a team. This will allow you
                to create games and invite teammates.
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
