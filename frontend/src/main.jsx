import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App.jsx";
import "./index.css";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { MessageProvider } from "./hooks/useMessage.jsx";
import { ModalProvider } from "./hooks/useModal.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MessageProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </MessageProvider>
    </AuthProvider>
  </React.StrictMode>
);
