import { APP_ROUTES } from "@/constants/app-routes"
import { checkIsPublicRoute } from "@/functions/global"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"
import { useAuth } from "./user"
import { Forbidden } from "@/components/global/forbidden"

export const PrivateRoutes = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth()
    const { push } = useRouter()
    const isAuth = !!user

    useEffect(() => {
        if (!isAuth) {
            push(APP_ROUTES.public.login)
        }
    }, [isAuth, push])

    return (
        <>
            {isAuth ? <Forbidden /> : children}
        </>
    )
}