import { ElementType } from "react"

interface NotificationIconProps {
    icon: ElementType
}
export const NotificationIcon = ({ icon: Icon }: NotificationIconProps) => {
    return (
        <Icon className="w-6 h-6 text-linkptt-secondary mt-3 mr-3" />
    )
}