'use client'

import { ViewMyChannelsComponent } from "@/components/channel/view-my-channels"
import { getMyHome } from "@/functions/user"
import { useAuth } from "@/providers/user"
import { useQuery } from "@tanstack/react-query"

export default function Channels() {

    const { user } = useAuth()

    const { data } = useQuery({ queryKey: ['channels'], queryFn: getMyHome })
    console.log(data?.usersToChannels)

    return (
        <>
            {data?.usersToChannels && <ViewMyChannelsComponent myChannels={data?.usersToChannels} />}
        </>
    )
}