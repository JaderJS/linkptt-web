import { boolean, string } from "zod"
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


export interface ResponseGetMyMessages {
    msg: string
    messages: MessageProps[]
}

export const getAllMessagesByChannel = async (channelCuid: string) => {
    const resp = await api.get<ResponseGetMyMessages>(`/channel/${channelCuid}/messages`)
    return resp.data
}

interface ResponseGetChannel {
    msg: string
    channel: Channel
    users: any
}

export interface Channel {
    cuid: string
    name: string
    profileUrl: string
    ownerCuid: string
    password: string
    createdAt: string
    updatedAt: string
    owner: Owner
    usersToChannels: UsersToChannel[]
    isMyChannel?: boolean
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


export interface UserGetChannel extends User {
    isOwner: boolean
    isOnline: boolean
}
interface RespGetChannel_ {
    channel: Channel
    users: UserGetChannel[]
    _count: {
        onlineUsers: number
    }
}

export const getChannel_ = async (channelCuid: string) => {
    const resp = await api.get<RespGetChannel_>(`/channel_/${channelCuid}`)
    return resp.data
}

export const getChannel = async (channelCuid: string) => {
    const resp = await api.get<ResponseGetChannel>(`/channel/${channelCuid}`)
    return resp.data
}

interface RespCreateOneChannel {
    msg: string
    channel: {
        cuid: string
        name: string
        profileUrl: string
        ownerCuid: string
        createdAt: Date
        updatedAt: Date
    }
}

interface CreateOneChannelProps {
    name: string
    profileUrl: string
}

export const createOneChannel = async (body: CreateOneChannelProps) => {
    const resp = await api.post<RespCreateOneChannel>(`/channel`, body)
    return resp.data
}

interface RespTopChannels {
    channels: (Channel & { usersInChannel: number })[]
}

export const topChannels = async () => {
    const resp = await api.get<RespTopChannels>(`/channels/top`)
    return resp.data
}

interface BodyBindUserToChannel {
    userCuid: string
    channelCuid: string
    password: string
}

export const bindUserToChannel = async (body: BodyBindUserToChannel) => {
    const resp = await api.post(`/channel/bind`, body)
    return resp.data
}