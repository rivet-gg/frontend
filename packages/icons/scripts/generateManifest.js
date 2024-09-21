// @ts-check
const fs = require("node:fs");
const { getPackageInfo } = require("local-pkg");

const icons = new Set();

function faCamelCase(str) {
  const [firstLetter, ...restLetters] = str.replace(/-./g, (g) =>
    g[1].toUpperCase(),
  );
  return `fa${[firstLetter.toUpperCase(), ...restLetters].join("")}`;
}

async function registerIcons(iconModuleName) {
  const info = await getPackageInfo(iconModuleName);

  if (!info) {
    console.error("Could not find package", iconModuleName);
    return;
  }

  const { rootPath } = info;

  const files = await fs.promises.readdir(rootPath);

  const iconFiles = files.filter(
    (file) => file.startsWith("fa") && file.endsWith(".js"),
  );

  const iconsModule = require(iconModuleName);

  const foundIcons = [];

  for (const iconFile of iconFiles) {
    const iconName = iconFile.replace(".js", "");
    const iconDefinition = iconsModule[iconName];

    const aliases = iconDefinition.icon?.[2].filter(
      (alias) => typeof alias === "string",
    );

    if (
      icons.has(iconDefinition.iconName) ||
      aliases.some((alias) => icons.has(alias))
    ) {
      continue;
    }

    foundIcons.push({ icon: iconName, aliases: aliases.map(faCamelCase) });
  }

  return {
    [iconModuleName]: { icons: foundIcons, prefix: iconsModule.prefix },
  };
}

async function generateManifest() {
  const manifest = {
    ...(await registerIcons("@fortawesome/free-solid-svg-icons")),
    ...(await registerIcons("@fortawesome/free-brands-svg-icons")),
    ...(await registerIcons("@fortawesome/pro-solid-svg-icons")),
  };

  fs.writeFileSync("./manifest.json", JSON.stringify(manifest));
}

generateManifest().catch(() => process.exit(1));
