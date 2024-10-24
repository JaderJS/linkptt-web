'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { getAllMessagesByChannel, getChannel, ResponseGetMyMessages } from "@/functions/channel"
import { useAuth } from "@/providers/user"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { formatDistanceToNow as toNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Crown, SendHorizonal, Wrench } from "lucide-react"

import { Input } from "@/components/ui/input"
import { useTransmitter } from "@/providers/transmiter"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useMessage } from "@/providers/messager"


export default function Messages({ params }: { params: { cuid: string } }) {
    const { user } = useAuth()
    const { sendMessage } = useMessage()
    const { data, refetch } = useQuery({
        queryKey: ['messages', params.cuid],
        queryFn: () => getAllMessagesByChannel(params.cuid),
        staleTime: 0,
    })

    console.log(data)

    const form = useForm<{ text: string }>()

    const submit = (data: { text: string }) => {
        if (data.text === "") {
            toast.warning("Insira um texto para enviar")
            return
        }
        sendMessage({ cuid: params.cuid, text: data.text, type: 'channel' })
        form.setValue('text', "")
        refetch()
    }

    return (
        <>
            <main className="flex-1 flex flex-col gap-12">
                <Separator />
                <ScrollArea className="h-[620px] flex rounded-md border">
                    {data?.messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-center gap-x-4 px-12 py-2 w-[600px] ${user?.cuid === msg.from.cuid ? 'ml-auto text-right justify-end' : 'mr-auto text-left justify-start '}`}
                        >
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Avatar>
                                        <AvatarFallback>{msg.from.name.slice(0, 2)}</AvatarFallback>
                                        <AvatarImage src={msg.from.avatarUrl} />
                                    </Avatar>
                                </HoverCardTrigger>
                                <HoverCardContent className="flex w-40">
                                    <p>{msg.from.name}</p>
                                </HoverCardContent>
                            </HoverCard>
                            {msg.pathUrl !== "" && <audio controls>
                                <source src={msg.pathUrl} />
                            </audio>}
                            <p className="text-xs flex-1 text-left">{msg.transcript}</p>
                            <p className="text-muted-foreground text-xs">
                                {toNow(msg.createdAt, { locale: ptBR })}
                            </p>
                        </div>
                    ))}
                </ScrollArea>
                <div className="flex gap-x-2 px-2">
                    <Input {...form.register('text')} />
                    <Button onClick={form.handleSubmit(submit)} size="icon" variant="outline">
                        <SendHorizonal />
                    </Button>
                </div>
            </main>
        </>
    )
}