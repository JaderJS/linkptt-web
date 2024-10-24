import { createContext, ReactNode, useContext, useEffect, useRef } from "react"
import { useSocket } from "./socket"
import { toast } from "sonner"
import { useReceiver } from "./receiver"

interface MessageProps {
    sendMessage: (props: { text: string, cuid: string, type: 'channel' }) => void
}

const MessageContext = createContext<MessageProps>({} as MessageProps)

export const MessageProvider = ({ children }: { children: ReactNode }) => {
    const { socket } = useSocket()

    const sendMessage = async (props: { text: string, cuid: string, type: 'channel' }) => {
        socket?.emit('msg:send', props)
    }

    return (
        <MessageContext.Provider value={{ sendMessage }}>
            {children}
        </MessageContext.Provider>
    )
}

export const useMessage = () => {
    const context = useContext(MessageContext)
    return context
}
