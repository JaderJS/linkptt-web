import { createContext, Fragment, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { useSocket } from "./socket"
import { toast } from "sonner"
import { MPEGDecoderWebWorker } from 'mpg123-decoder'

interface ReceiverProps {
    isReceiving: boolean
    notification?: NotificationProps
    message?: MessageProps[]
    timer?: string
    touchScreen: Function
    audioContextRef: AudioContext | null
    enable: boolean
    latency: number
}
interface NotificationProps {
    msg: string
    user: {
        cuid: string
        email: string
        name: string
        avatarUrl: string
    }
    from: string
}

interface MessageProps {
    cuid: string
    text: string
    type: 'channel' | 'user'
}

const ReceiverContext = createContext<ReceiverProps>({} as ReceiverProps)

export const ReceiverProvider = ({ children }: { children: ReactNode }) => {
    const { socket } = useSocket()
    const [message, setMessage] = useState<MessageProps[]>([])
    const [notification, setNotification] = useState<NotificationProps | undefined>(undefined)
    const [isReceiving, setIsReceiving] = useState<Boolean>(false)
    const [latency, setLatency] = useState<number>(1000)
    const [enable, setEnable] = useState<boolean>(false)
    const audioContextRef = useRef<AudioContext | null>(null)
    const decoderRef = useRef<MPEGDecoderWebWorker>()
    const timeStampRef = useRef<number>(0)

    const touchScreen = () => {
        setEnable(true)
    }

    useEffect(() => {

        socket?.on('status', ({ msg }: { msg: string }) => {
            toast(msg)
        })

        socket?.on('msg:received', ({ cuid, text, type }: { cuid: string, text: string, type: 'channel' | 'user' }) => {
            setMessage((prev) => ([...prev, { cuid, text, type }]))
        })

        socket?.on('audio:chunk:web', async (chunk: ArrayBuffer) => {
            // console.log("CHUNK", chunk)
            decoderRef.current?.decode(new Uint8Array(chunk)).then(({ channelData, sampleRate, samplesDecoded }) => {
                const audioBuffer = audioContextRef.current?.createBuffer(channelData.length, samplesDecoded, sampleRate)
                if (!audioBuffer) {
                    return
                }
                for (let channel = 0; channel < channelData.length; channel++) {
                    const bufferChannelData = audioBuffer.getChannelData(channel)
                    bufferChannelData.set(channelData[channel])
                }
                const source = audioContextRef.current?.createBufferSource()!
                source.buffer = audioBuffer
                source.connect(audioContextRef.current?.destination!)
                source.start(timeStampRef.current)
                timeStampRef.current += audioBuffer.duration
            }).catch((error) => {
                toast.error('Error to decoded chunk')
                console.error(error)
            })
            await decoderRef.current?.reset()

        })

        socket?.on('audio:start', (data: NotificationProps) => {
            setNotification(data)
            setIsReceiving(true)
            timeStampRef.current = audioContextRef.current?.currentTime ?? 0
        })
        socket?.on('audio:stop', () => {
            setNotification(undefined)
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
            socket?.off('status')
            socket?.off('audio:start')
            socket?.off('audio:chunk:web')
            socket?.off('audio:stop')
            socket?.off('msg:send')
        }
    }, [socket, enable])

    return (
        <ReceiverContext.Provider value={{
            isReceiving: !!isReceiving,
            latency: latency,
            notification: notification,
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
