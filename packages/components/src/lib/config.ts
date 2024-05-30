import { createContext, useContext } from "react";

interface Config {
  apiUrl: string;
  assetsUrl: string;
  identityToken?: string;
  posthog?: {
    apiHost: string;
    apiKey: string;
  };
}

export const ConfigContext = createContext<Config>({
  apiUrl: "",
  assetsUrl: "",
});
export const useConfig = () => useContext(ConfigContext);
export const ConfigProvider = ConfigContext.Provider;

export const getConfig = (): Config => {
  const el = document.getElementById("RIVET_CONFIG");
  if (!el) {
    throw new Error("Config element not found");
  }
  return JSON.parse(el.textContent || "");
};
