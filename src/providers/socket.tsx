import { getCookie } from "cookies-next"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import io, { Socket } from 'socket.io-client'
import { toast } from "sonner"
interface SocketProps {
    socket?: Socket
    isConnected: boolean
}

const SocketContext = createContext<SocketProps>({} as SocketProps)

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket | undefined>()
    const [isConnected, setIsConnected] = useState<boolean>(false)

    useEffect(() => {
        const token = getCookie('linkptt-web')
        const socket_ = io('http://localhost:8000', { auth: { token } })

        socket_?.on("connect", () => {
            setIsConnected(true)
            setSocket(() => socket_)
        })

        socket_?.on("error", (error: any) => {
            toast.error('@SOCKET.IO: ', error.message)
        })
    }, [])


    return (
        <SocketContext.Provider value={{ socket, isConnected: isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    const context = useContext(SocketContext)
    return context
}
