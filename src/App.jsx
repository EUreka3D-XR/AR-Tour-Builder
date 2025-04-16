import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MyThemeProvider from "@/src/providers/theme/MyThemeProvider";

import "@/src/config/translations/i18next-config.js";

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
          <></>
        </QueryClientProvider>
      </BrowserRouter>
    </MyThemeProvider>
  );
}
