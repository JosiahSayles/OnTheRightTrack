import App from "./App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import AuthProvider from "./components/Auth/AuthContext";
import { ApiProvider } from "./components/API/APIContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ApiProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApiProvider>
    </AuthProvider>
  </StrictMode>,
);
