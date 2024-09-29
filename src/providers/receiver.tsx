import { createContext, Fragment, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { useSocket } from "./socket"
import { toast } from "sonner"

interface ReceiverProps {
    isReceiving: boolean
    message?: MessageProps
    timer?: string
    touchScreen: Function
    audioContextRef: AudioContext | null
    enable: boolean
    latency: number
}
interface MessageProps {
    msg: string
    user: {
        cuid: string
        email: string
        name: string
        avatarUrl: string
    }
    from: string
}
const ReceiverContext = createContext<ReceiverProps>({} as ReceiverProps)

export const ReceiverProvider = ({ children }: { children: ReactNode }) => {
    const { socket } = useSocket()
    const [message, setMessage] = useState<MessageProps | undefined>(undefined)
    const [isReceiving, setIsReceiving] = useState<Boolean>(false)
    const [latency, setLatency] = useState<number>(1000)
    const [enable, setEnable] = useState<boolean>(false)
    const audioContextRef = useRef<AudioContext | null>(null)

    const touchScreen = () => {
        setEnable(true)
    }

    useEffect(() => {

        socket?.on('status', ({ msg }: { msg: string }) => {
            toast(msg)
        })



        socket?.on('echo', async (chunk: ArrayBuffer) => {
            console.log('echo', chunk)
            const buffer = await audioContextRef.current?.decodeAudioData(chunk)
            const source = audioContextRef.current?.createBufferSource()!
            source.buffer = buffer!
            source.connect(audioContextRef.current?.destination!)
            source.start(0)
        })

        socket?.on('audio:start', (data: MessageProps) => {
            setMessage(data)
            setIsReceiving(true)
        })
        socket?.on('audio:stop', () => {
            setMessage(undefined)
            setIsReceiving(false)
        })

        setInterval(() => {
            const start = Date.now()

            socket?.emit('ping', () => {
                const duration = Date.now() - start
                setLatency(duration)
            })
        }, 10000)

        if (!enable)
            return

        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)

        return () => {
            socket?.off('audio:chunk:web')
            socket?.off('audio:start')
            socket?.off('audio:stop')
        }
    }, [socket, enable])


    return (
        <ReceiverContext.Provider value={{
            isReceiving: !!isReceiving,
            latency: latency,
            message: message,
            touchScreen,
            audioContextRef: audioContextRef.current,
            enable
        }}>
            {children}
        </ReceiverContext.Provider>
    )
}

export const useReceiver = () => {
    const context = useContext(ReceiverContext)
    return context
}
