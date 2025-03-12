import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "./context/SidebarContext.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/App/Store.js";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </SidebarProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
