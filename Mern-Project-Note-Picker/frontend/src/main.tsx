import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import HttpMethodContextProvider from "./context/HttpProvider.tsx";
// import './index.css'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HttpMethodContextProvider>
      <App />
    </HttpMethodContextProvider>
  </StrictMode>
);
