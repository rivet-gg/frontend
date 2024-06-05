import { faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionCard, type ActionCardProps } from "./action-card";

interface CtaCardProps extends Omit<ActionCardProps, "action"> {}

export const CtaCard = (props: CtaCardProps) => {
  return (
    <ActionCard
      {...props}
      action={<FontAwesomeIcon icon={faArrowRight} className="size-4" />}
    />
  );
};
