import { createContext, ReactNode, useContext, useRef } from "react"
import { useSocket } from "./socket"
import { toast } from "sonner"
import { useReceiver } from "./receiver"
import { decodeAudioData_, readBlobAsArrayBuffer } from "./utils"

interface TransmitterProps {
    start: (to: { cuid: string, type: 'channel' | 'user' }) => Promise<void>
    stop: () => void
    sendMessage: (props: { text: string, cuid: string, type: 'channel' }) => void
}

const TransmitterContext = createContext<TransmitterProps>({} as TransmitterProps)

export const TransmitterProvider = ({ children }: { children: ReactNode }) => {
    const { socket } = useSocket()
    const { audioContextRef } = useReceiver()
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioChunks = useRef<Array<Blob>>([])

    const start = async ({ cuid, type }: { cuid: string, type: 'channel' | 'user' }) => {

        socket?.emit('audio:start', { from: cuid, type: type })
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

            const mediaRecorder = new MediaRecorder(stream as MediaStream, { mimeType: 'audio/webm;codecs=opus' })

            mediaRecorder.ondataavailable = async (blob) => {
                // const arrayBuffer = await blob.data.arrayBuffer()
                socket?.emit('audio:chunk:web', await blob.data.arrayBuffer())

                // const fileReader = new FileReader()
                // fileReader.readAsArrayBuffer(blob.data)
                // fileReader.onloadend = () => {
                //     const arrayBuffer = fileReader.result as ArrayBuffer
                //     audioContextRef?.decodeAudioData(arrayBuffer, (audioBuffer) => {
                //         const pcmData = audioBuffer.getChannelData(0)
                //         console.log(pcmData)
                //         // playPCM(pcmData, audioContext)
                //     })
                // }

                // const arrayBuffer = await readBlobAsArrayBuffer(blob.data) as ArrayBuffer
                // const audioBuffer = await decodeAudioData_(arrayBuffer, audioContextRef!) as any
                // const pcmData = audioBuffer.getChannelData(0)
                // console.log(pcmData)
                console.log(blob)
            }

            mediaRecorder.start(2000)

            mediaRecorderRef.current = mediaRecorder
        } catch (error) {
            toast('Erro ao acessar microfone')
        }
    }

    const sendMessage = async (props: { text: string, cuid: string, type: 'channel' }) => {
        socket?.emit('msg:send', props)
    }

    const stop = () => {
        mediaRecorderRef.current?.stop()
        socket?.emit('audio:stop')
    }

    return (
        <TransmitterContext.Provider value={{ start, stop, sendMessage }}>
            {children}
        </TransmitterContext.Provider>
    )
}

export const useTransmitter = () => {
    const context = useContext(TransmitterContext)
    return context
}
