'use client'

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getMyHome } from "@/functions/user"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Bell, Check, Dot, MountainIcon, X } from "lucide-react"
import { ReactNode } from "react"
import { NotificationRow } from "./notification.row"
import { NotificationContent } from "./notification.content"
import { NotificationActions } from "./notification.actions"
import { NotificationAction } from "./notification.action"
import { NotificationIcon } from "./notification.icon"
import { Separator } from "@/components/ui/separator"
import { getAllNotification, readOneNotification } from "@/functions/notification"
import { Button } from "@/components/ui/button"

export const NotificationRoot = () => {

    const { data } = useQuery({ queryKey: ['channels'], queryFn: () => getAllNotification({ page: 1, limit: 3 }) })
    const { mutate: readOneNotificationFn } = useMutation({ mutationFn: readOneNotification })


    return (
        <Popover>
            <PopoverTrigger>
                <div className="relative">
                    {(data?.total ?? 0) > 0 && <Dot className="absolute top-0 text-yellow-500 w-12 h-12" />}
                    <Bell />
                </div>
            </PopoverTrigger>
            <PopoverContent className="mr-12 flex flex-col gap-3 w-96">
                {data?.notifications.map((notification) => (
                    <NotificationRow key={notification.id}>
                        <NotificationIcon icon={MountainIcon} />
                        <NotificationContent text={notification.message.transcript} date={notification.createdAt} />
                        <NotificationActions>
                            <NotificationAction icon={Check} onClick={() => readOneNotificationFn(notification.id)} />
                        </NotificationActions>
                    </NotificationRow>
                ))}
                <Separator />
                <Button variant="link">Ler todos?</Button>

            </PopoverContent>
        </Popover>
    )
}