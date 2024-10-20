import { ReactNode } from "react"
import { useReceiver } from "./receiver"
import { TouchInScreen } from "@/components/global/touch-in-screen"
import { usePathname } from "next/navigation"
import { checkIsPublicRoute } from "@/functions/global"

export default function Screen({ children }: { children: ReactNode }) {
    const { enable, touchScreen } = useReceiver()
    const pathname = usePathname()
    const isVisibleNavBar = checkIsPublicRoute(pathname)

    return (
        <>
            <div
                className="flex-1 flex justify-center"
                onClick={() => touchScreen()}
            >
                {!isVisibleNavBar ?
                    <>{enable ? children : <TouchInScreen />}</>
                    : children}
            </div>
        </>
    )
}