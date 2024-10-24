import { api } from "./axios"

interface BodyGetAllNotificationProps {
    page: number
    limit: number
}

interface RespGetAllNotification {
    notifications: Notification[]
    page: number
    limit: number
    total: number
}

interface Notification {
    id: number
    toCuid: string
    messageId: number
    createdAt: Date
    isRead: boolean
    message: Message
}

interface Message {
    id: number
    pathUrl: string
    path: string
    transcript: string
    duration: number
    text: string
    fromCuid: string
    toChannelCuid: any
    toChannel: {
        cuid: string
        name: string
        profileUrl: string
    }
    toUserCuid: any
    createdAt: string
}


const getAllNotification = async (body: BodyGetAllNotificationProps) => {
    const resp = await api.post<RespGetAllNotification>(`/notifications`, body)
    return resp.data
}

const readOneNotification = async (id: number) => {
    const resp = await api.patch<RespGetAllNotification>(`/notification/${id}`)
    return resp.data
}

const readAllNotification = async () => {
    const resp = await api.patch(`/notifications`)
    return resp.data
}

export {
    getAllNotification,
    readOneNotification,
    readAllNotification
}