import { ChevronRight } from "lucide-react";
import { useContext } from "react";
import { MobileBreadcrumbsContext } from "./mobile-breadcrumbs";

export function Separator() {
  const isMobile = useContext(MobileBreadcrumbsContext);
  if (isMobile) return null;
  return <ChevronRight className="text-muted-foreground size-4" />;
}
