import { api } from "./axios"


interface ResponseGetUser {
    msg: string
    user: UserProps
}

interface UserProps {
    cuid: string
    email: string
    name: string
    avatarUrl: string
}

export const getUser = async () => {
    const resp = await api.get<ResponseGetUser>(`/user`)
    return resp.data
}

interface LoginUserProps {
    email: string
    password: string
}

interface UserWithTokenProps extends UserProps {
    token: string
}
interface ResponseLoginUser {
    msg: string
    user: UserWithTokenProps
}

export const loginUser = async (data: LoginUserProps) => {
    const resp = await api.post<ResponseLoginUser>(`/login`, data)
    return resp.data
}

export const registerUser = async <T>(data: T) => {
    const resp = await api.post<{ msg: string, user: UserProps }>(`/user`, data)
    return resp.data
}

export interface UserToChannels {
    userCuid: string
    channelCuid: string
    permission: string
    channel: {
        cuid: string
        name: string
        profileUrl: string
        ownerCuid: string
        createdAt: Date
        updatedAt: Date
    }
}

interface MyChannels {
    cuid: string
    name: string
    profileUrl: string
    ownerCuid: string
    password: string
    createdAt: Date
    updatedAt: Date
}

interface MyReceivedMessages {
    id: number
    pathUrl: string
    path: string
    transcript: string
    duration: number
    fromCuid: string
    toChannelCuid: string | null
    toUserCuid: string | null
    createdAt: Date
}

interface MySendMessages {
    id: bigint;
    pathUrl: string;
    path: string;
    transcript: string;
    duration: number;
    fromCuid: string;
    toChannelCuid: string | null;
    toUserCuid: string | null;
    createdAt: Date;
}

interface ResponseGetMyHome {
    msg: string
    usersToChannels: UserToChannels[]
    myChannels: MyChannels[]
    myReceivedMessages: MyReceivedMessages[]
    mySendMessages: MySendMessages[]
}

export const getMyHome = async () => {
    const resp = await api.get<ResponseGetMyHome>(`/my-home`)
    return resp.data
}