'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider, useAuth } from "./user"
import { NavBar } from "@/components/global/nav-bar"
import { ThemeProvider } from "./theme"

export default function Provider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Toaster />
                <NavBar />
                {children}
            </AuthProvider>
        </QueryClientProvider>
    )
}