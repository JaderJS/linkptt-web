'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider, useAuth } from "./user"
import { NavBar } from "@/components/global/nav-bar"
import { SocketProvider } from "./socket"
import { ReceiverProvider, useReceiver } from "./receiver"
import { TransmitterProvider } from "./transmiter"
import Screen from "./screen"
import { usePathname } from "next/navigation"
import { checkIsPublicRoute } from "@/functions/global"
import { MessageProvider } from "./messager"

export default function Provider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    const pathname = usePathname()
    const isVisibleNavBar = checkIsPublicRoute(pathname)

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <SocketProvider>
                    <ReceiverProvider>
                        <TransmitterProvider>
                            <MessageProvider>
                                <Toaster />
                                {!isVisibleNavBar ? <NavBar /> : null}
                                <Screen>{children}</Screen>
                            </MessageProvider>
                        </TransmitterProvider>
                    </ReceiverProvider>
                </SocketProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}