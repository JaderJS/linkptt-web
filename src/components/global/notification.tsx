import { Bell, Dot } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"

export const Notification = () => {

    

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="relative">
                    <Dot className="absolute top-0 text-yellow-500 w-12 h-12"/>
                    <Bell/>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                Notifica
            </PopoverContent>
        </Popover>
    )

}