import { Button } from "../ui/button"
import { useMutation } from "@tanstack/react-query"
import { createOneChannel } from "@/functions/channel"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ImageUploader } from "../global/image-preview-uploader"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import { Switch } from "../ui/switch"

interface UpsertChannelComponentProps {
    channel?: any
    children: ReactNode
}

const createOneChannelSchema = z.object({
    name: z.string(),
    profileUrl: z.string().url(),
    password: z.string().min(3).optional(),
    isPublic: z.boolean().default(false).optional()
})

export const UpsertChannelComponent = ({ channel, children }: UpsertChannelComponentProps) => {
    const { push } = useRouter()
    const { mutateAsync: createOneChannelFn } = useMutation({ mutationFn: createOneChannel })

    const form = useForm<z.infer<typeof createOneChannelSchema>>({ resolver: zodResolver(createOneChannelSchema) })

    const submit = (data: z.infer<typeof createOneChannelSchema>) => {
        createOneChannelFn(data).then(() => {
            push('/')
        })

    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crie um novo canal</DialogTitle>
                        <DialogDescription>Mantenha todas as suas conversas centralizadas</DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col justify-center items-center">
                        <ImageUploader onUpdate={(pathUrl) => form.setValue('profileUrl', pathUrl)} />
                    </div>

                    <Form {...form}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormDescription>Dê o seu melhor nome ao canal</FormDescription>
                                    <FormControl>
                                        <Input {...field} placeholder="Xangai" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isPublic"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel>Canal é publico?</FormLabel>
                                        <FormDescription>Caso deseje que qualquer pessoa acesse seu canal, deixe essa opção marcada</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormDescription>Adicione a sua senha para deixar seu canal seguro</FormDescription>
                                    <FormControl>
                                        <Input {...field} placeholder="Senha segura" type="password" disabled={form.watch('isPublic')}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </Form>

                    <DialogFooter >
                        <Button variant="destructive">Cancelar</Button>
                        <Button variant="secondary" onClick={form.handleSubmit(submit)}>Salvar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}