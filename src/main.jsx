import "./setup/setupYup";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

// import { makeServer } from "./api/mock/server";
import App from "./App.jsx";

// makeServer({ environment: "development" });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
