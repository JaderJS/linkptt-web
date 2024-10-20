'use client'

import { registerUserSchemaType } from "@/app/register/page"
import { api } from "@/functions/axios"
import { getUser, loginUser, registerUser } from "@/functions/user"
import { useQuery } from "@tanstack/react-query"
import { deleteCookie, getCookie, setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { createContext, ReactNode, useContext, useState } from "react"

interface UserProps {
    cuid: string
    email: string
    name: string
    avatarUrl: string
}

interface LoginProps {
    email: string
    password: string
}

interface AuthProps {
    user?: UserProps
    login: (data: LoginProps) => Promise<UserProps | undefined>
    register: (data: registerUserSchemaType) => Promise<void>
    logout: Function
    isAuth: Boolean
}


const AuthContext = createContext<AuthProps>({} as AuthProps)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { push } = useRouter()
    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        enabled: !!getCookie('linkptt-web'),
        refetchOnReconnect: true,
    })


    const register = async (data: registerUserSchemaType) => {
        registerUser(data).then(() => {
            push(`/`)
        }).catch((error) => console.error(error))
    }

    const login = async (data: { email: string, password: string }): Promise<UserProps | undefined> => {
        try {
            const { user } = await loginUser(data)
            const { token, ...user_ } = user
            setCookie(`linkptt-web`, token)
            push('/')
            return user

        } catch (error) {
            console.error(error)
            return
        }

    }

    const logout = () => {
        deleteCookie('linkptt-web')
        push('/login')
    }

    return (
        <AuthContext.Provider value={{ isAuth: !!user, login, logout, register, user: user?.user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}