'use client'

import { Input } from "@/components/ui/input"
import { useAuth } from "@/providers/user"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3)
})

export default function Home() {
  const { user } = useAuth()

  return (
    <>
      HOME
      {user?.email}

    </>
  )
}
