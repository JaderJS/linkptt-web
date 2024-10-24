import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ElementType } from "react"

interface NotificationIconProps {
    icon: ElementType
    src?: string
}
export const NotificationIcon = ({ icon: Icon, src }: NotificationIconProps) => {
    return (
        <>
            {!src && <Icon className="w-6 h-6 text-linkptt-secondary mt-3 mr-3" />}
            {!!src && <Avatar>
                <AvatarFallback>NM</AvatarFallback>
                <AvatarImage src={src}/>
            </Avatar>}
        </>
    )
}