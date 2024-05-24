import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: it should always be present
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
