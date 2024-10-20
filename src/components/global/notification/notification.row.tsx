import { ReactNode } from "react"

interface NotificationRowProps {
    children: ReactNode
}

export const NotificationRow = ({ children }: NotificationRowProps) => {
    return (
        <div className="flex flex-shrink justify-between">
            {children}
        </div>
    )
}