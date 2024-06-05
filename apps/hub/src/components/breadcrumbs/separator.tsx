import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { MobileBreadcrumbsContext } from "./mobile-breadcrumbs";

export function Separator() {
  const isMobile = useContext(MobileBreadcrumbsContext);
  if (isMobile) return null;
  return (
    <FontAwesomeIcon
      icon={faChevronRight}
      className="text-muted-foreground size-4"
    />
  );
}
