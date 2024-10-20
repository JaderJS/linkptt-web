'use client'

import { ViewUsers } from "@/components/channel/view-users"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getChannel, getChannel_ } from "@/functions/channel"
import { useReceiver } from "@/providers/receiver"
import { useTransmitter } from "@/providers/transmiter"
import { useAuth } from "@/providers/user"
import { useQuery } from "@tanstack/react-query"
import { Crown, MessageSquareText, Mic, Signal, User, Wrench } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Channel({ params }: { params: { cuid: string } }) {
    const { user } = useAuth()
    const [status, setStatus] = useState<'idle' | 'transmitting' | 'receiving'>('idle')
    const { isReceiving, message, timer, touchScreen, latency, notification } = useReceiver()
    const { start, stop } = useTransmitter()

    // const { data: channel } = useQuery({ queryKey: ['channel', params.cuid], queryFn: () => getChannel(params.cuid) })
    const { data: channel_ } = useQuery({ queryKey: ['channel_', params.cuid], queryFn: () => getChannel_(params.cuid) })

    // console.log("CHANNEL", channel_)

    const startRecording = () => {
        setStatus('transmitting')
        start({ cuid: params.cuid, type: 'channel' })
    }

    const stopRecording = () => {
        setStatus('idle')
        stop()
    }

    const isAdmin = channel_?.channel.owner.cuid === user?.cuid

    return (
        <main className="flex w-full flex-col items-center justify-center" onClick={() => touchScreen()}>
            <Separator />
            <header className="w-full h-1/5 flex justify-between items-center px-12">
                <div className="relative">
                    <Avatar className="h-24 w-24">
                        <AvatarFallback>{channel_?.channel.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        <AvatarImage src={channel_?.channel.profileUrl} />
                    </Avatar>
                    {isAdmin && <Crown className="absolute bottom-0 left-1 text-yellow-300" />}
                </div>
                <div className="flex flex-col justify-center items-center">
                    <span className="text-2xl font-mono font-bold">{channel_?.channel.name}</span>
                    <span className="text-muted-foreground">{params.cuid}</span>
                </div>
                <div className="flex gap-x-2">
                    <Link href={`/channel/${params.cuid}/messages`}>
                        <Button size='icon' variant="ghost">
                            <MessageSquareText />
                        </Button>
                    </Link>
                    <Button size='icon' variant="ghost">
                        <Wrench />
                    </Button>
                    <ViewUsers users={channel_?.users}>
                        <Button size='icon' variant="ghost">
                            <User />
                        </Button>
                    </ViewUsers>
                </div>
            </header>
            <Separator />
            <div className="flex-1 p-24 relative">
                {isReceiving && <>
                    <Card className="absolute -top-8 inset-x-0 flex justify-between items-center p-4">
                        <Avatar>
                            <AvatarFallback>SN</AvatarFallback>
                            <AvatarImage src={notification?.user.avatarUrl} />
                        </Avatar>
                        <p>{notification?.user.email}</p>
                        <p>{notification?.msg}</p>
                        <span>{timer}</span>
                    </Card>
                </>}
                <Button
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onMouseLeave={stopRecording}
                    data-status={status}
                    className="h-full 
                    hover:border-2     
                    aspect-square 
                    rounded-full 
                    border-linkptt
                    animated-background
                    bg-linkptt
                    bg-gradient-to-tl from-pink-500 via-[#f58611]
                    hover:bg-linkptt-secondary
                    data-[status=transmitting]:border-red-500
                     data-[status=transmitting]:border-4
                    "
                >
                    <Mic className="w-10 h-10" />
                </Button>
            </div>
            <Separator />
            <footer className="h-24 flex justify-around p-2 w-full">
                <span className="flex items-center justify-around">
                    <p>{channel_?._count.onlineUsers} online</p>
                    <Signal className="text-emerald-500" />
                    <p className="text-xs text-muted-foreground">{latency}ms</p>
                </span>
            </footer>
        </main>
    )
}