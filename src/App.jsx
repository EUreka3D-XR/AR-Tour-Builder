import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MyThemeProvider from "@/providers/theme/MyThemeProvider";

import "@/config/translations/i18next-config.js";

import DefaultLayout from "./layouts/DefaultLayout";

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
        <QueryClientProvider client={queryClient}>
          <DefaultLayout />
        </QueryClientProvider>
      </BrowserRouter>
    </MyThemeProvider>
  );
}
