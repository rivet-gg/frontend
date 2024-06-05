import { faSpinnerThird } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex } from "./flex";

export function DialogActivityIndicator() {
  return (
    <Flex direction="row" gap="2" items="center" justify="center" my="10">
      <FontAwesomeIcon
        icon={faSpinnerThird}
        className="mr-2 size-4 animate-spin"
      />
    </Flex>
  );
}
