import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import "./index.css";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import AppError from "./components/app-error.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <AppError />
        <App />
      </TooltipProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
