'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider, useAuth } from "./user"
import { NavBar } from "@/components/global/nav-bar"
import { ThemeProvider } from "./theme"
import { SocketProvider } from "./socket"
import { ReceiverProvider, useReceiver } from "./receiver"
import { TransmitterProvider } from "./transmiter"
import Screen from "./screen"

export default function Provider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <SocketProvider>
                    <ReceiverProvider>
                        <TransmitterProvider>
                            <Toaster />
                            <NavBar />
                            <Screen>{children}</Screen>
                        </TransmitterProvider>
                    </ReceiverProvider>
                </SocketProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}