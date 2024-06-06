import * as FeedbackForm from "@/forms/feedback-form";
import type { DialogContentProps } from "@/hooks/use-dialog";
import { FEEDBACK_FORM_ID } from "@/lib/data/constants";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
} from "@rivet-gg/components";

import { usePostHog } from "posthog-js/react";

interface ContentProps extends DialogContentProps {}

export default function FeedbackDialogContent({ onClose }: ContentProps) {
  const posthog = usePostHog();

  return (
    <>
      <FeedbackForm.Form
        onSubmit={async (values) => {
          posthog.capture("survey sent", {
            $survey_id: FEEDBACK_FORM_ID,
            $survey_response: `${values.type}: ${values.feedback}`,
          });
          onClose?.();
        }}
        defaultValues={{ type: "bug", feedback: "" }}
      >
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
        </DialogHeader>
        <Flex gap="4" direction="col">
          <FeedbackForm.Type />
          <FeedbackForm.Feedback />
        </Flex>
        <DialogFooter>
          <FeedbackForm.Submit type="submit">Send</FeedbackForm.Submit>
        </DialogFooter>
      </FeedbackForm.Form>
    </>
  );
}
