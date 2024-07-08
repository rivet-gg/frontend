import { createContext, useContext } from "react";

declare global {
  namespace RivetApp {
    interface Config {
      apiUrl: string;
      assetsUrl: string;
    }
  }
}

export const ConfigContext = createContext<RivetApp.Config>({
  apiUrl: "",
  assetsUrl: "",
} as RivetApp.Config);
export const useConfig = () => useContext(ConfigContext);
export const ConfigProvider = ConfigContext.Provider;

const getApiEndpoint = (apiEndpoint: string) => {
  if (apiEndpoint == "__AUTO__") {
    if (location.hostname.startsWith("hub.")) {
      // Connect to the corresponding API endpoint
      return "https://" + location.hostname.replace("hub.", "api.");
    } else {
      // Default to staging servers for all other endpoints
      return "https://api.staging2.gameinc.io";
    }
  }
  return apiEndpoint;
};

export const getConfig = (): RivetApp.Config => {
  const el = document.getElementById("RIVET_CONFIG");
  if (!el) {
    throw new Error("Config element not found");
  }

  const parsed = JSON.parse(el.textContent || "");

  return {
    ...parsed,
    apiUrl: getApiEndpoint(parsed.apiUrl),
  };
};
