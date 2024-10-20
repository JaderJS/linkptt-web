import { ReactNode } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { UserGetChannel } from "@/functions/channel"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface ViewUsersProps {
    children: ReactNode
    users?: UserGetChannel[]
}

export const ViewUsers = ({ children, users }: ViewUsersProps) => {


    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    {children}
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Usuários do canal</SheetTitle>
                        <SheetDescription>Aqui você pode ver todos os usuários vinculados a esse canal</SheetDescription>
                    </SheetHeader>
                    {users?.map((user) => (
                        <div data-isonline={user.isOnline} className="flex items-center justify-around border rounded-sm opacity-100 data-[isonline=false]:opacity-20" key={user.cuid}>
                            <Avatar>
                                <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                                <AvatarImage src={user.avatarUrl} />
                            </Avatar>
                            <p>{user.name}</p>
                            <p>{user.role}</p>
                        </div>
                    ))}
                </SheetContent>
            </Sheet>
        </>
    )
}
