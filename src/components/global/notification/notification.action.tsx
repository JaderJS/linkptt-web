import { Button } from "@/components/ui/button"
import { ButtonHTMLAttributes, ElementType, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface NotificationActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ElementType
}

export const NotificationAction = forwardRef<HTMLButtonElement, NotificationActionProps>(({ icon:Icon, className, ...props }, ref) => (
    <Button ref={ref} {...props} variant="ghost" size="icon" className={cn(className)}>
        <Icon className="w-6 h-6" />
    </Button>
))

