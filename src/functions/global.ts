import { APP_ROUTES } from "@/constants/app-routes"
import { api } from "./axios"
import { getCookie } from "cookies-next"
import { AxiosResponse } from "axios"

export const checkIsPublicRoute = (path: string) => {
    const appPublicRoutes = Object.values(APP_ROUTES.public)
    return appPublicRoutes.includes(path)
}

export const checkUserIsAuthenticate = async (): Promise<boolean> => {
    const token = getCookie('linkptt-web')
    if (!token) {
        return false
    }
    return api.get(`/user`, { headers: { Authorization: `Bearer ${token}` } }).then(() => {
        return true
    }).catch(() => {
        return false
    })
}

interface UploadImageProps {
    msg: string
    image: {
        pathUrl: string
        path: string
    }
}

export async function uploadImage(formData: FormData): Promise<UploadImageProps> {
    const resp: AxiosResponse<UploadImageProps> = await api.post(`/upload/image`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    return resp.data
}