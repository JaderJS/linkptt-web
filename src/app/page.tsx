'use client'

import { Input } from "@/components/ui/input"
import { useAuth } from "@/providers/user"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3)
})

export default function Home() {
  const { user } = useAuth()

  return (
    <main className="flex-1 flex justify-center p-12">


      {Array.from({ length: 4 }).map((_, index) => (
        <Button key={index} className="w-full h-1/4 m-8" asChild>
          <Link href='/channels'>
            Meus canais
          </Link>
        </Button>
      ))}

    </main>
  )
}
