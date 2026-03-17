import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

import { useSidebar } from "@/components/ui/sidebar"

import DarkToggle from "@/components/ui/DarkToggle"

export default function Topbar() {

  const { toggleSidebar } = useSidebar()

  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div
      className="
      sticky top-0 z-50
      backdrop-blur-md bg-background/70
      border-b
      px-6 py-4
      flex justify-between items-center
    "
    >
      
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">

        {/* Sidebar Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <h1 className="text-lg font-semibold">
          Admin Dashboard
        </h1>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        <DarkToggle />

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

    </div>
  )
}