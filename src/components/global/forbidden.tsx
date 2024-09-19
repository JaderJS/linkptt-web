'use client'

import { useAuth } from "@/providers/user"

export const Forbidden = () => {
    const auth = useAuth()

    return (
        <>
            <p className="text-4xl font-mono font-bold">
                NOT AUTHORIZED
            </p>
        </>
    )
}