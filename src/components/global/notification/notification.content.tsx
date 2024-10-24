import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"

interface NotificationContentProps {
    text: string
    description?: string
    date?: Date
    href?: string
}

export const NotificationContent = ({ text, description, date, href = "#" }: NotificationContentProps) => {
    return (
        <Link href={href}>
            <div className="flex-1 flex flex-col items-center">
                <p className="leading-relaxed">{text}</p>
                <p className="leading-relaxed text-sm">{description}</p>
                {date && <div className="text-xs flex items-center">
                    <span>{formatDistanceToNow(date, { locale: ptBR })}</span>
                </div>}
            </div>
        </Link>
    )
}