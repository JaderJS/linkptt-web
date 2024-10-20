import * as React from "react"

import { cn } from "@/lib/utils"
import { LucideIcon, LucideProps } from "lucide-react"
import { Button } from "./button"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

interface InputWithSVGProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon: LucideIcon
  children?: React.ReactNode
}

const InputWithSVG = React.forwardRef<HTMLInputElement, InputWithSVGProps>(
  ({ className, type, label, icon: Icon, children, ...props }, ref) => (
    <div className={cn(className, "flex gap-x-2 group transition-all")}>
      <div className="relative flex w-full ">
        <Input type={type} ref={ref} {...props} className="pl-10 group-focus-within:pl-2 duration-300 ease-out" placeholder={label} />
        <Icon className="absolute top-2 left-2 my-auto text-muted-foreground group-focus-within:hidden duration-300 ease-out" />
      </div>
      {children}
    </div>
  )
)

InputWithSVG.displayName = "InputWithSVG"

export { Input, InputWithSVG }
