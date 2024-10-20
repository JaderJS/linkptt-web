import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { ButtonHTMLAttributes, ElementType, ReactNode } from "react"

interface NotificationActionsProps {
    children: ReactNode
}

export const NotificationActions = ({ children }: NotificationActionsProps) => {
    return (
        <div className="flex gap-2 self-center">
            {children}
        </div>
    )
}