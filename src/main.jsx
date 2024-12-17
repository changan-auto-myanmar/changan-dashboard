import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { ThemeProvider } from "@material-tailwind/react";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import "../public/css/tailwind.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
