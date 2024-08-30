import {
  type IconPack,
  type IconProp,
  library,
} from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@rivet-gg/components";
import { motion } from "framer-motion";

const fasFab: IconPack = Object.fromEntries(
  Object.entries(fab).map(([iconName, icon]) => [
    iconName,
    { ...icon, prefix: "fas" },
  ]),
);

library.add(fasFab, fas);

const animationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

interface ModuleCardProps {
  id: string;
  name: string;
  description: string;
  status: string;
  icon: string;
  layoutAnimation?: boolean;
}

export function ModuleCard({
  id,
  name,
  icon,
  description,
  layoutAnimation = true,
}: ModuleCardProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card
          className="text-left hover:border-primary transition-colors"
          asChild
        >
          <motion.button
            type="button"
            className="h-full flex"
            {...(layoutAnimation
              ? { ...animationProps, layout: "position", layoutId: id }
              : {})}
          >
            <CardHeader className="max-w-full">
              <CardTitle>
                <FontAwesomeIcon
                  className="text-primary mb-3 block"
                  icon={icon as IconProp}
                />
                {name}
              </CardTitle>
              <CardDescription className="break-words">
                {description}
              </CardDescription>
            </CardHeader>
          </motion.button>
        </Card>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>{name} in OpenGB Docs</SheetTitle>
          <SheetDescription className="-mx-6">
            <iframe
              className="w-full h-screen"
              src={`https://opengb.dev/modules/${id}/overview`}
              title={name}
            />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
