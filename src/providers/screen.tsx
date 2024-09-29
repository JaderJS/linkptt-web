import { ReactNode } from "react";
import { useReceiver } from "./receiver";
import { TouchInScreen } from "@/components/global/touch-in-screen";

export default function Screen({ children }: { children: ReactNode }) {
    const { enable, touchScreen } = useReceiver()

    return (
        <>
            <div
                className="flex-1 flex justify-center"
                onClick={() => touchScreen()}
                onKeyDown={(event)=>console.log(event)}
            >
                {enable ? children : <TouchInScreen />}
            </div>
        </>
    )
}