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
import { getAllNotification, readAllNotification, readOneNotification } from "@/functions/notification"
import { Button } from "@/components/ui/button"

export const NotificationRoot = () => {

    const { data, refetch } = useQuery({ queryKey: ['channels'], queryFn: () => getAllNotification({ page: 1, limit: 5 }) })
    const { mutate: readOneNotificationFn } = useMutation({ mutationFn: readOneNotification, onSuccess: () => refetch() })
    const { mutate: readAllNotificationFn } = useMutation({ mutationFn: readAllNotification, onSuccess: () => refetch() })

    console.log(data)
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
                        <NotificationIcon icon={MountainIcon} src={notification.message.toChannel.profileUrl} />
                        <NotificationContent text={notification.message.text || notification.message.toChannel.name} date={notification.createdAt} />
                        <NotificationActions>
                            <NotificationAction icon={Check} onClick={() => readOneNotificationFn(notification.id)} />
                        </NotificationActions>
                    </NotificationRow>
                ))}

                {data?.notifications.length === 0 && <>
                    <p className="text-center">Nenhuma notificação</p>
                </>}
                {(data?.notifications.length ?? 0) > 0 && <>
                    <Separator />
                    <Button className="text-xs" variant="link" onClick={() => readAllNotificationFn()}>Ler todos?</Button>
                </>}

            </PopoverContent>
        </Popover>
    )
}