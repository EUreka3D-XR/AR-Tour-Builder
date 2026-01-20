import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MyThemeProvider from "@/providers/theme/MyThemeProvider";

import "@/config/translations/i18next-config.js";

import { ConfirmationModal } from "./components/confirmation-modal/ConfirmationModal";
import { DialogOptionsModal } from "./components/dialog-options-modal/DialogOptionsModal";
import ErrorBoundary from "./components/error/ErrorBoundary";
import { GeneralProvider } from "./providers/general/GeneralProvider";
import EurekaRoutes from "./routes/EurekaRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App() {
  return (
    <MyThemeProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <GeneralProvider>
              <EurekaRoutes />
              <ConfirmationModal />
              <DialogOptionsModal />
            </GeneralProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </MyThemeProvider>
  );
}
