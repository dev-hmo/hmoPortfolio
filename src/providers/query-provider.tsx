"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

// ===========================================================================
// TanStack Query Provider
// Enterprise-grade defaults: stale times, retry policies, GC intervals
// ===========================================================================

export function QueryProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        /** Data is fresh for 5 minutes — reduces unnecessary refetches */
                        staleTime: 5 * 60 * 1000,
                        /** Keep unused cache for 30 minutes before garbage collection */
                        gcTime: 30 * 60 * 1000,
                        /** Retry failed requests up to 2 times with exponential backoff */
                        retry: 2,
                        /** Don't refetch on window focus for static portfolio data */
                        refetchOnWindowFocus: false,
                        /** Don't refetch on reconnect for static data */
                        refetchOnReconnect: false,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}
