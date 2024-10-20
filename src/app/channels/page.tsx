'use client'

import { AllocatedChannel } from "@/components/channel/allocated-channel"
import { UpsertChannelComponent } from "@/components/channel/upsert-channel"
import { ViewChannelsComponent } from "@/components/channel/view-channels"
import { ViewMyChannelsComponent } from "@/components/channel/view-my-channels"
import { Button } from "@/components/ui/button"
import { Input, InputWithSVG } from "@/components/ui/input"
import { Channel } from "@/functions/channel"
import { getMyHome } from "@/functions/user"
import { useQuery } from "@tanstack/react-query"
import { PackagePlus, Search } from "lucide-react"
import Link from "next/link"

export default function Channels() {

    const { data: myHome } = useQuery({ queryKey: ['my-home'], queryFn: getMyHome })

    const channels = myHome?.usersToChannels.map((userToChannel) => userToChannel.channel) ?? []

    return (
        <main className="flex-1 flex flex-col p-12 gap-y-6">




            <HandlerMyChannels channels={channels} />
{/* 
            {channels.length !== 0 &&
                <div className="flex flex-col">
                    {myHome?.usersToChannels && <ViewMyChannelsComponent myChannels={myHome?.usersToChannels} />}
                </div>
            } */}
        </main>
    )
}

export const HandlerMyChannels = ({ channels }: { channels: Channel[] }) => {
    return (
        <>
            {channels.length === 0 && <div className="flex flex-col gap-y-6">
                <p className="text-center">Nenhum canal conectado! Deseja adicionar um?</p>
                <Link href="/channel/bind">
                    <Button className="flex w-full">Adicionar novo canal<PackagePlus className="ml-1" /></Button>
                </Link>
            </div>}

            {channels.length > 0 && <>
                <InputWithSVG icon={Search} label="Pesquisar..." >
                    <Link href="/channel/bind">
                        <Button className="flex w-full">Adicionar novo canal<PackagePlus className="ml-1" /></Button>
                    </Link>
                </InputWithSVG>
                <ViewChannelsComponent channels={channels}/>
            </>}
        </>
    )
}