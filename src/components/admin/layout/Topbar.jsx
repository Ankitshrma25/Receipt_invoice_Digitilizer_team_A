import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Topbar() {
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <div className="
      sticky top-0 z-50
      backdrop-blur-md bg-background/70
      border-b
      px-6 py-4
      flex justify-between items-center
    ">
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarFallback>
                            {user?.name?.[0]?.toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        {user?.name}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                        onClick={() => {
                            localStorage.clear()
                            window.location.href = "/login"
                        }}
                    >
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}