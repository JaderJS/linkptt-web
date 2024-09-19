'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useQuery } from "@tanstack/react-query"
import { Crown, MessageSquareText, Mic, Signal, Wrench } from "lucide-react"
import { useState } from "react"

export default function Channel({ params }: { params: { cuid: string } }) {
    const [status, setStatus] = useState<'idle' | 'transmitting' | 'receiving'>('idle')
    // const {data}= useQuery()

    const chandeStatus = async () => {
        // await new Promise((resolve) => setTimeout(() => resolve, 500))
        setStatus('transmitting')
        setTimeout(() => { },)
        console.log('transmitting')
    }

    const isAdmin = true

    return (
        <main className="flex-1 flex w-full flex-col items-center justify-center">
            <Separator />
            <header className="w-full h-1/5 flex justify-between items-center px-12">
                <div className="relative">
                    <Avatar className="h-24 w-24">
                        <AvatarFallback>SI</AvatarFallback>
                    </Avatar>
                    {isAdmin && <Crown className="absolute bottom-0 left-1 text-yellow-300" />}
                </div>
                <span className="text-2xl font-mono font-bold">NOME DO CANAL</span>
                <div className="flex gap-x-2">
                    <Button size='icon'>
                        <MessageSquareText />
                    </Button>
                    <Button size='icon'>
                        <Wrench />
                    </Button>
                </div>
            </header>
            <Separator />
            <div className="flex-1 p-24 relative">
                <Card className="absolute -top-8 inset-x-0 flex justify-between items-center p-4">
                    <Avatar>
                        <AvatarFallback>SN</AvatarFallback>
                    </Avatar>
                    <p>Speaking...</p>
                    <span>00:00</span>
                </Card>
                <Button
                    onClick={chandeStatus}
                    data-status={status}
                    className="h-full aspect-square rounded-full border-2 border-orange-300 bg-primary-foreground data-[status=transmitting]:border-red-500" >
                    <Mic />
                </Button>
            </div>
            <Separator />
            <footer className="h-12 flex justify-around p-2 w-full">
                <Signal className="text-emerald-500" />
            </footer>
        </main>
    )
}