import { CheckCircle, MenuIcon, MountainIcon, X } from "lucide-react"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "../ui/sheet"
import { Menubar, MenubarMenu, MenubarTrigger, MenubarItem, MenubarContent, MenubarSeparator } from "../ui/menubar"
import Link from "next/link"
import { useAuth } from "@/providers/user"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useRouter } from "next/navigation"
import { useSocket } from "@/providers/socket"
import { useReceiver } from "@/providers/receiver"
import { Notification } from "./notification"
import { ModeToggle } from "./toggle-theme"


export const NavBar = () => {

    const { user, logout } = useAuth()
    const { push } = useRouter()
    const { enable } = useReceiver()
    const { isConnected } = useSocket()

    return (

        <header className="flex h-24  w-full shrink-0 items-center px-4 md:px-6">
            <Sheet>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle menu navigation</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
                        <MountainIcon className="h-6 w-6" />
                        {/* <Image src={logo} alt="logo" /> */}
                        <span className="sr-only">LinkPTT</span>
                    </Link>
                    <div className="grid gap-2 py-6">
                        <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                            Home
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>
            <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
                <MountainIcon className="h-6 w-6" />
                {/* <Image src={logo} alt="logo" className="h-12 w-12" /> */}
                <span className="sr-only">Acme Inc</span>
            </Link>
            <nav className="ml-auto hidden lg:flex gap-6 items-center">
                <div className="flex bg-transparent">
                    {/* {isConnected && <>
                        <CheckCircle className="text-emerald-500" />
                        <p className="px-2 text-emerald-500">Online</p>
                    </>} */}
                    {!isConnected && <>
                        <X className="text-red-500" />
                        <p className="px-2 text-red-500">Offline</p>
                    </>}
                </div>
                <div className="flex bg-transparent">
                    {!enable && <>
                        <CheckCircle className="text-yellow-500" />
                        <p className="px-2 text-yellow-500">Unauthorize</p>
                    </>}
                </div>
                <ModeToggle/>
                <Notification/>

                {/* <Link
                    href="/dashboard/channels"
                    prefetch={true}
                >
                    <Button>Canais</Button>
                </Link> */}



                <Menubar className="border-0">
                    <MenubarMenu>
                        <MenubarTrigger className="bg-transparent">
                            <Avatar className="w-12 h-12">
                                <AvatarFallback className="font-bold">{user?.name.slice(0, 2).toLocaleUpperCase()}</AvatarFallback>
                                <AvatarImage src={user?.avatarUrl} />
                            </Avatar>
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem onClick={() => push('/perfil')}>Meu perfil</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem onClick={() => logout()}> Logout</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>

            </nav>
        </header >
    )

}