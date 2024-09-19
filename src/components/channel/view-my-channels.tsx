import { UserToChannels } from "@/functions/user"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"
import { Button } from "../ui/button"
import { CircleCheck, CircleDot, Plus, PlusCircle } from "lucide-react"

export const ViewMyChannelsComponent = ({ myChannels }: { myChannels: UserToChannels[] }) => {
    const isOnline = true
    return (
        <>
            <div className="flex flex-col space-y-4 px-8">
                <Button className="w-full h-12 text-2xl font-mono font-bold" size="icon">
                    <PlusCircle />
                </Button>
                {myChannels.map(({ channel }) => (
                    <Link href={`/channel/${channel.cuid}`} key={channel.cuid} >
                        <Card>
                            <CardHeader >
                                <CardTitle >{channel.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex">
                                <div className="relative">
                                    <Avatar className="w-24 h-24">
                                        <AvatarFallback>{channel.name.slice(0, 2)}</AvatarFallback>
                                        <AvatarImage src={channel.profileUrl} />
                                    </Avatar>
                                    {isOnline && <CircleCheck fill='#4ade80' className="absolute -bottom-0 left-2" />}
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center text-emerald-200">
                                <CircleDot className="" />
                                <p className="px-2">2 online</p>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </>
    )
}