import axios, { AxiosResponse, AxiosError, isAxiosError, } from 'axios'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { api } from './functions/axios'
import { checkIsPublicRoute } from './functions/global'

//Authenticate next
//https://nextjs.org/docs/app/building-your-application/routing/middleware#producing-a-response

interface ResponseUser {
    msg: string
    user: {
        cuid: string
        email: string
        name: String
        avatarUrl: string
    }
}

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('linkptt-web')
    const pathname = request.nextUrl.pathname
    const isPublic = checkIsPublicRoute(pathname)

    if (isPublic) {
        return NextResponse.next()
    }
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    try {
        const user = await api.get<ResponseUser>(`/user`, { headers: { Authorization: `Bearer ${token?.value}` } }).catch((error) => error)
        return NextResponse.next()
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            if (error?.response) {
                console.error('NETWORK ERROR')
                return NextResponse.redirect(new URL('/login', request.url))

            }
            console.error(error?.message)
        }
        return NextResponse.redirect(new URL('/login', request.url))
    }

}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}


// export const config = {
//     matcher: '/((?!login).*)'
// }