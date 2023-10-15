import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppointmentsContextProvider } from "./context/AppointmentContext";
import { AuthContextProvider } from "./context/AuthContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ToastContainer } from "react-toastify"; // Import the ToastContainer component
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppointmentsContextProvider>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </AppointmentsContextProvider>
    </AuthContextProvider>
    {/* Render the ToastContainer */}
    <ToastContainer />
  </React.StrictMode>
);
