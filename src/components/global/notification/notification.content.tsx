import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface NotificationContentProps {
    text: string
    description?: string
    date?: Date
}

export const NotificationContent = ({ text, description, date }: NotificationContentProps) => {
    return (
        <div className="flex-1 flex flex-col items-center">
            <p className="leading-relaxed">{text}</p>
            <p className="leading-relaxed text-sm">{description}</p>
            {date && <div className="text-xs flex items-center">
                <span>{formatDistanceToNow(date, { locale: ptBR })}</span>
            </div>}
        </div>
    )
}