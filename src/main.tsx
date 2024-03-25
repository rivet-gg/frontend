import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";

// Register the router instance for type safety

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
