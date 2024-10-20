import { bindUserToChannel, Channel } from "@/functions/channel"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { formatDistanceToNow as toNow } from 'date-fns'
import { ptBR } from "date-fns/locale"
import { Check, Plus, X } from "lucide-react"
import { Button } from "../ui/button"
import { useAuth } from "@/providers/user"
import { useMutation } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { ReactNode } from "react"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { UpsertChannelComponent } from "./upsert-channel"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import Link from "next/link"

export const ViewChannelsComponent = ({ channels, type = 'list', bind = false }: { channels?: Channel[], type?: 'list' | 'card', bind?: boolean }) => {
    return (
        <>
            {channels?.length === 0 && <p className="text-muted-foreground text-2xl">Não há canais cadastrados</p>}
            {type === 'list' && channels && <ListChannels channels={channels} bind />}
            {type === 'card' && channels && <CardChannel channels={channels} />}
        </>
    )
}

const DialogBindUserToChannel = ({ channelCuid, name, profileUrl }: { channelCuid: string, name: string, profileUrl: string }) => {
    const { user } = useAuth()
    const { handleSubmit, register } = useForm<{ password: string }>()
    const { mutateAsync: bindUserToChannelFn } = useMutation({ mutationFn: bindUserToChannel })

    const handleBindChannelToUser = ({ password }: { password: string }) => {
        if (!user)
            return

        bindUserToChannelFn({ userCuid: user?.cuid, channelCuid, password })
    }
    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button variant="secondary">Adicionar?</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Deseja adicionar o canal?</DialogTitle>
                        <DialogDescription>Preencha o campo abaixo para se inscrever no canal</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center py-3">
                        <Avatar className="aspect-square h-28 w-28">
                            <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
                            <AvatarImage src={profileUrl} />
                        </Avatar>
                        <p className="text-red-900">Adicione a senha para ter acesso ao canal <span className="text-red-800 font-bold">{name}</span> </p>
                        <Input {...register('password')} type="password" placeholder="Senha" />
                    </div>
                    <DialogFooter>
                        <Button variant="secondary" onClick={handleSubmit(handleBindChannelToUser)}>Salvar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

const ListChannels = ({ channels, bind }: { channels: Channel[], bind: boolean }) => {

    return (
        <>
            <Table>
                <TableCaption>Ainda não encontrou seu canal?
                    <UpsertChannelComponent>
                        <Button variant="link" className="m-1 p-1 underline">Crie</Button>
                    </UpsertChannelComponent>
                    o seu agora mesmo
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Perfil</TableHead>
                        <TableHead>Nome do canal</TableHead>
                        <TableHead>Dono</TableHead>
                        <TableHead>Usuários no canal</TableHead>
                        <TableHead>Criado em</TableHead>
                        {bind && <TableHead>Checked</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {channels?.map(({ cuid, createdAt, owner, profileUrl, name, isMyChannel, usersToChannels }, index) => (
                        <TableRow key={cuid}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <Link href={`/channel/${cuid}`}>
                                    <Avatar>
                                        <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
                                        <AvatarImage src={profileUrl} />
                                    </Avatar>
                                </Link>
                            </TableCell>
                            <TableCell>{name}</TableCell>
                            <TableCell>{owner.name}</TableCell>
                            <TableCell>{usersToChannels.length}</TableCell>
                            <TableCell>{toNow(createdAt, { locale: ptBR })}</TableCell>
                            {bind && <TableCell>
                                {isMyChannel && <Button variant="ghost" >Adicionado</Button>}
                                {!isMyChannel && <DialogBindUserToChannel channelCuid={cuid} name={name} profileUrl={profileUrl} />}
                            </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

const CardChannel = ({ channels }: { channels: Channel[] }) => {

    return (
        <>
            <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                {channels?.map(({ name, cuid, profileUrl, createdAt }) => (
                    <Card key={cuid}>
                        <CardHeader>
                            <CardTitle>{name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-center items-center">
                            <Avatar>
                                <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
                                <AvatarImage src={profileUrl} />
                            </Avatar>

                        </CardContent>
                        <CardFooter className="flex justify-around">
                            <DialogBindUserToChannel channelCuid={cuid} name={name} profileUrl={profileUrl} />
                            <p className="text-muted-foreground">{toNow(createdAt, { locale: ptBR })}</p>
                        </CardFooter>
                    </Card>
                ))}
                <UpsertChannelComponent>
                    <Card className="flex items-center justify-center hover:bg-muted-foreground hover:cursor-pointer">
                        <Plus />
                    </Card>
                </UpsertChannelComponent>
            </main>
        </>
    )
}