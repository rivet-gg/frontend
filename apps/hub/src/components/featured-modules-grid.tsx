import { Grid, H2 } from "@rivet-gg/components";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import OpenGBMeta from "../../vendor/opengb-modules-meta.json";
import { ModuleCard } from "./module-card";

const FEATURED_MODULES = ["lobbies", "friends", "analytics"];

interface FeaturesModulesGridProps {
  footer?: ReactNode;
}

export function FeaturesModulesGrid({ footer }: FeaturesModulesGridProps) {
  const modules = OpenGBMeta.categories
    .flatMap((category) => category.modules)
    .filter((module) => FEATURED_MODULES.includes(module.id));

  return (
    <motion.section
      className="mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <H2 className="my-4 text-base">Extend your game with modules</H2>

      <Grid
        columns={{ initial: "1", sm: "3" }}
        gap="4"
        items="start"
        className="my-4"
      >
        {modules.map((module) => (
          <ModuleCard key={module.id} layoutAnimation={false} {...module} />
        ))}
      </Grid>
      {footer}
    </motion.section>
  );
}

export default FeaturesModulesGrid;
