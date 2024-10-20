'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/providers/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(3) })

export default function Login() {
    const { login } = useAuth()
    const form = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) })
    const [isVisible, setIsVisible] = useState(false)

    const submit = async (data: z.infer<typeof loginSchema>) => {
        login(data)
    }

    return (
        <main className="flex-1 flex justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>Acesse agora sua conta</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="space-y-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="exemplo@email.com" />
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
                                        <FormControl>
                                            <div className="flex w-full items-center space-x-2">
                                                <Input {...field} type={isVisible ? 'text' : 'password'} />
                                                <Button type="button" size="icon" variant="ghost" onClick={() => setIsVisible((prev) => !prev)}>
                                                    {isVisible ? <Eye /> : <EyeOff />}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <p className="text-muted-foreground text-sm">Ainda não tem uma conta?<Link href='/register'> <span className="underline">registre-se agora</span></Link> </p>
                    <Button className="w-full" onClick={form.handleSubmit(submit)}>Login</Button>
                </CardFooter>
            </Card>
        </main>
    )
}