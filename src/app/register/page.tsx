'use client'
import { ImageUploader } from "@/components/global/image-preview-uploader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/providers/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const registerUserSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(5, { message: 'Sua senha dever ter mais que cinco dígitos' })
        .regex(/[a-zA-Z]/, { message: 'Conter ao menos uma letra' })
        .regex(/[0-9]/, { message: 'Conter ao menos um numero' })
        .regex(/[^a-zA-Z0-9]/, { message: 'Conter ao menos um carácter especial' }),
    name: z.string().min(3),
    avatarUrl: z.string().url()
})

export type registerUserSchemaType = z.infer<typeof registerUserSchema>

export default function Register() {
    const { register } = useAuth()

    const form = useForm<registerUserSchemaType>({
        resolver: zodResolver(registerUserSchema), defaultValues: {
            email: "",
            name: "",
            password: "",
            avatarUrl: "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
        }
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tighter">Nova conta</CardTitle>
                <CardDescription>Crie uma conta novinha em folha e saia falando pelos cotovelos</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center">
                    <ImageUploader src={form.watch('avatarUrl')} onUpdate={(pathUrl) => form.setValue('avatarUrl', pathUrl)} />
                </div>
                <Form {...form}>
                    <form className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormDescription>Adicione seu melhor email</FormDescription>
                                    <FormControl>
                                        <Input {...field} placeholder="exemplo@email.com" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormDescription>Como deseja ser chamado?</FormDescription>
                                    <FormControl>
                                        <Input {...field} placeholder="senha" type="password" />
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
                                    <FormDescription>Fique tranquilo a gente não fala para ninguém</FormDescription>
                                    <FormControl>
                                        <Input {...field} placeholder="senha" type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <Button onClick={form.handleSubmit(register)} className="mt-6 w-full">Entrar</Button>

            </CardContent>
        </Card>
    )
}
