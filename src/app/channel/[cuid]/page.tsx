'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getChannel } from "@/functions/channel"
import { useReceiver } from "@/providers/receiver"
import { useTransmitter } from "@/providers/transmiter"
import { useQuery } from "@tanstack/react-query"
import { Crown, MessageSquareText, Mic, Signal, Wrench } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Channel({ params }: { params: { cuid: string } }) {
    const [status, setStatus] = useState<'idle' | 'transmitting' | 'receiving'>('idle')
    const { isReceiving, message, timer, touchScreen, latency } = useReceiver()
    const { start, stop } = useTransmitter()

    const { data: channel } = useQuery({ queryKey: ['channel', params.cuid], queryFn: () => getChannel(params.cuid) })

    const startRecording = () => {
        setStatus('transmitting')
        start({ cuid: params.cuid, type: 'channel' })

    }
    const stopRecording = () => {
        setStatus('idle')
        stop()
    }

    const isAdmin = true

    return (
        <main className="flex w-full flex-col items-center justify-center" onClick={() => touchScreen()}>
            <Separator />
            <header className="w-full h-1/5 flex justify-between items-center px-12">
                <div className="relative">
                    <Avatar className="h-24 w-24">
                        <AvatarFallback>{channel?.channel.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        <AvatarImage src={channel?.channel.profileUrl} />
                    </Avatar>
                    {isAdmin && <Crown className="absolute bottom-0 left-1 text-yellow-300" />}
                </div>
                <div className="flex flex-col justify-center items-center">
                    <span className="text-2xl font-mono font-bold">{channel?.channel.name}</span>
                    <span className="text-muted-foreground">{params.cuid}</span>
                </div>
                <div className="flex gap-x-2">
                    <Link href={`/channel/${params.cuid}/messages`}>
                        <Button size='icon' className="hover:bg-linkptt">
                            <MessageSquareText />
                        </Button>
                    </Link>
                    <Button size='icon' className="hover:bg-linkptt">
                        <Wrench />
                    </Button>
                </div>
            </header>
            <Separator />
            <div className="flex-1 p-24 relative">
                {isReceiving && <>
                    <Card className="absolute -top-8 inset-x-0 flex justify-between items-center p-4">
                        <Avatar>
                            <AvatarFallback>SN</AvatarFallback>
                            <AvatarImage src={message?.user.avatarUrl} />
                        </Avatar>
                        <p>{message?.user.email}</p>
                        <p>{message?.msg}</p>
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
                    data-[status=transmitting]:border-red-500"
                >
                    <Mic className="w-10 h-10" />
                </Button>
            </div>
            <Separator />
            <footer className="h-24 flex justify-around p-2 w-full">
                <span className="flex items-center justify-center">
                    <Signal className="text-emerald-500" />
                    <p className="text-xs text-muted-foreground">{latency}ms</p>
                </span>
            </footer>
        </main>
    )
}