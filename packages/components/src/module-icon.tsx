import {
  type IconPack,
  type IconProp,
  library,
} from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fasFab: IconPack = Object.fromEntries(
  Object.entries(fab).map(([iconName, icon]) => [
    iconName,
    { ...icon, prefix: "fas" },
  ]),
);

library.add(fasFab, fas);

interface ModuleIconProps {
  className?: string;
  icon: IconProp;
}

export function ModuleIcon({ className, icon }: ModuleIconProps) {
  return <FontAwesomeIcon icon={icon} className={className} />;
}
