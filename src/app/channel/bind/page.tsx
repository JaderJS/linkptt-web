'use client'

import { Input, InputWithSVG } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import { topChannels } from "@/functions/channel"
import { Search } from "lucide-react"
import { ViewMyChannelsComponent } from "@/components/channel/view-my-channels"
import { ViewChannelsComponent } from "@/components/channel/view-channels"

export default function BindChannel() {

    const { data: topChannelsQuery } = useQuery({ queryKey: ['top-channels'], queryFn: topChannels })
    
    return (
        <>
            <main className="flex-1 flex flex-col justify-start p-12 gap-y-6">
                <InputWithSVG label="Pesquisar" icon={Search} onChange={(event) => { console.log(event.target.value) }} />
                <ViewChannelsComponent channels={topChannelsQuery?.channels} type="list"  />
            </main>
        </>
    )
}
