'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { getMyMessages } from "@/functions/channel"
import { useAuth } from "@/providers/user"
import { useQuery } from "@tanstack/react-query"
import { formatDistanceToNow as toNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
export default function Messages({ params }: { params: { cuid: string } }) {
    const { user } = useAuth()
    const { data } = useQuery({ queryKey: ['messages', params.cuid], queryFn: () => getMyMessages(params.cuid) })

    return (
        <>
            <main className="flex-1 p-24 flex flex-col gap-12">
                {data?.channel.messages.map((msg) => (
                    <Card key={msg.id} className={`w-[600px] ${user?.cuid === msg.from.cuid ? 'ml-auto text-right' : 'mr-auto text-left'}`}>
                        <CardHeader>
                            <p>De: {msg.from.name}</p>
                        </CardHeader>
                        <CardContent>
                            <audio controls>
                                <source src={msg.pathUrl} />
                            </audio>
                        </CardContent>
                        <CardFooter>
                            {toNow(msg.createdAt, { locale: ptBR })}
                        </CardFooter>
                    </Card>
                ))}
            </main>
        </>
    )
}