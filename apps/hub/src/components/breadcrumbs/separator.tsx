import { ChevronRight } from "lucide-react";
import { MobileBreadcrumbsContext } from "./mobile-breadcrumbs";
import { useContext } from "react";

export function Separator() {
  const isMobile = useContext(MobileBreadcrumbsContext);
  if (isMobile) return null;
  return <ChevronRight className="text-muted-foreground size-4" />;
}
