import { PackagePlus } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"

export const AllocatedChannel = () => {
    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button size="icon" variant="ghost">
                        <PackagePlus />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <DialogFooter></DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}