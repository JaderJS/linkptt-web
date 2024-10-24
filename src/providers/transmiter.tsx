import { createContext, ReactNode, useContext, useEffect, useRef } from "react"
import { useSocket } from "./socket"
import { toast } from "sonner"
import { useReceiver } from "./receiver"
import { decodeAudioData_, readBlobAsArrayBuffer } from "./utils"
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'

interface TransmitterProps {
    start: (to: { cuid: string, type: 'channel' | 'user' }) => Promise<void>
    stop: () => void
}

const TransmitterContext = createContext<TransmitterProps>({} as TransmitterProps)

export const TransmitterProvider = ({ children }: { children: ReactNode }) => {
    const { socket } = useSocket()
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const ffmpegRef = useRef<FFmpeg>()

    const start = async ({ cuid, type }: { cuid: string, type: 'channel' | 'user' }) => {

        socket?.emit('audio:start', { fromCuid: cuid, type: type })
        try {

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })


            const mediaRecorder = new MediaRecorder(stream as MediaStream, { mimeType: 'audio/webm;codec=opus' })

            mediaRecorder.ondataavailable = async (blob) => {
                socket?.emit('audio:chunk:web', await blob.data.arrayBuffer())

                const process = await convertWebmToMp3(blob.data)
                if (process) {
                    socket?.emit('audio:chunk:web', process)
                }
                console.log(process)
            }

            mediaRecorder.onstop = () => {
                console.log("MediaRecorder has stopped.")
            }

            mediaRecorder.start(800)

            mediaRecorderRef.current = mediaRecorder
        } catch (error) {
            toast('Erro ao acessar microfone')
        }
    }

    const convertWebmToMp3 = async (chunk: Blob): Promise<any> => {
        const ffmpeg = ffmpegRef.current
        if (!ffmpeg) {
            return
        }

        try {
            const webmData = await fetchFile(chunk)
            ffmpeg.writeFile('input.webm', webmData)
            await ffmpeg.exec(['-i', 'input.webm', '-y', 'output.mp3'])
            const fileData = await ffmpeg.readFile('output.mp3')
            const data = new Uint8Array(fileData as ArrayBuffer)
            const arrayBuffer = new Blob([data.buffer], { type: 'audio/mp3' })
            return arrayBuffer
        } catch (error) {
            console.error(error)
        }
    }

    const stop = () => {
        mediaRecorderRef.current?.stop()
        socket?.emit('audio:stop')
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            ffmpegRef.current = new FFmpeg()
            const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
            const load = async () => {
                await ffmpegRef.current?.load({
                    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
                })
            }

            load()
        }

    }, [])

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
