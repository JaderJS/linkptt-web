import { string } from "zod"
import { api } from "./axios"


export interface MessageProps {
    id: number
    pathUrl: string
    path: string
    transcript: string
    duration: number
    fromCuid: string
    toChannelCuid: string
    toUserCuid: any
    createdAt: string
    from: From
    toChannel: ToChannel
    toUser: any
}

export interface From {
    cuid: string
    email: string
    name: string
    password: string
    avatarUrl: string
    role: string
}

export interface ToChannel {
    cuid: string
    name: string
    profileUrl: string
    ownerCuid: string
    password: string
    createdAt: string
    updatedAt: string
}


interface ResponseGetMyMessages {
    msg: string
    channel: {
        messages: MessageProps[]
    }
}

export const getMyMessages = async (channelCuid: string) => {
    const resp = await api.get<ResponseGetMyMessages>(`/channel/${channelCuid}/messages`)
    return resp.data
}

interface ResponseGetChannel {
    msg: string
    channel: Channel
    users: any
}

interface Channel {
    cuid: string
    name: string
    profileUrl: string
    ownerCuid: string
    password: string
    createdAt: string
    updatedAt: string
    owner: Owner
    usersToChannels: UsersToChannel[]
}
interface MyLocation {
    id: number
    latitude: string
    longitude: string
    rssi: string
    userCuid: string
    createdAt: string
}
interface User {
    cuid: string
    email: string
    name: string
    password: string
    avatarUrl: string
    role: string
    myLocations: MyLocation[]
}
interface UsersToChannel {
    userCuid: string
    channelCuid: string
    permission: string
    user: User
}
interface Owner {
    cuid: string
    email: string
    name: string
    password: string
    avatarUrl: string
    role: string
}

export const getChannel = async (channelCuid: string) => {
    const resp = await api.get<ResponseGetChannel>(`/channel/${channelCuid}`)
    return resp.data
}