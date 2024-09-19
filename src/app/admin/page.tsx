'use client'

import { api } from "@/functions/axios"
import { useQuery } from "@tanstack/react-query"
import { GetServerSideProps } from "next"

export default function Admin() {

    const { data } = useQuery({
        queryKey: ['admin'],
        queryFn: async () => await api.get('/user')
    })

    return <>Admin</>
}