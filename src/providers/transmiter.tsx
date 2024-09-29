import { createContext, ReactNode, useContext, useRef } from "react"
import { useSocket } from "./socket"
import { toast } from "sonner"
import { useReceiver } from "./receiver"

interface TransmitterProps {
    start: (to: { cuid: string, type: 'channel' | 'user' }) => Promise<void>
    stop: () => void
}

const TransmitterContext = createContext<TransmitterProps>({} as TransmitterProps)

export const TransmitterProvider = ({ children }: { children: ReactNode }) => {
    const { socket } = useSocket()
    const { audioContextRef } = useReceiver()
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioChunks = useRef<Array<Blob>>([])

    const start = async (to: { cuid: string, type: 'channel' | 'user' }) => {

        // socket?.emit('audio:start', { from: to.cuid, type: to.type })
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mediaRecorder = new MediaRecorder(stream as MediaStream, { mimeType: 'audio/webm;codecs=opus' })

            mediaRecorder.ondataavailable = async (blob) => {
                const arrayBuffer = await blob.data.arrayBuffer()
                socket?.emit('echo', arrayBuffer)
            }

            mediaRecorder.start()

            mediaRecorderRef.current = mediaRecorder
        } catch (error) {
            toast('Erro ao acesso o microfone')
        }
    }

    const stop = () => {
        mediaRecorderRef.current?.stop()
        // socket?.emit('audio:stop')
    }

    return (
        <TransmitterContext.Provider value={{ start, stop }}>
            {children}
        </TransmitterContext.Provider>
    )
}

export const useTransmitter = () => {
    const context = useContext(TransmitterContext)
    return context
}
