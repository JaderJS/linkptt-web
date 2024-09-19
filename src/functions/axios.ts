import axios, { AxiosError } from "axios";
import { getCookie } from "cookies-next";
import { toast } from "sonner";

export const api = axios.create({ baseURL: `http://localhost:8000/api` })

api.interceptors.request.use((config) => {
    const token = getCookie('linkptt-web')

    if (!token) {
        return config
    }

    config.headers.Authorization = `Bearer ${token}`
    return config
}, error => {
    return Promise.reject(error)
})

interface ResponseError {
    msg: string
    [k: string]: any
}

api.interceptors.response.use((res) => res, (error: AxiosError<ResponseError>) => {
    const slug = error.response?.data.msg || error.response?.data.message || error.message || "Ops! Algo deu errado"
    if (["401", "403"].includes(error.code!)) {
        toast.warning(slug)
        return Promise.reject(error)
    }
    toast.error(slug)
    return Promise.reject(error)
})