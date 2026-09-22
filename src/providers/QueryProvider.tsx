import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { AppState, Platform } from "react-native";

type QueryProviderProps = {
  children: ReactNode;
};

export default function QueryProvider({ children }: QueryProviderProps) {
  useEffect(() => {
    if (Platform.OS === "web") {
      return;
    }

    return focusManager.setEventListener((handleFocus) => {
      const subscription = AppState.addEventListener("change", (state) => {
        handleFocus(state === "active");
      });

      return () => subscription.remove();
    });
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            gcTime: 5 * 60_000,
            retry: 1,
            refetchOnReconnect: true,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
