import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import { LayoutDashboard, FileText, Users } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export function AppSidebar() {
  const location = useLocation()

  const items = [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "Invoices", url: "/admin/invoices", icon: FileText },
    { title: "Users", url: "/admin/users", icon: Users },
  ]

  return (
    <Sidebar collapsible="icon">

      <SidebarContent>

        <SidebarGroup>

          <SidebarGroupContent>

            <SidebarMenu>

              {items.map((item) => {
                const Icon = item.icon
                const active = location.pathname === item.url

                return (
                  <SidebarMenuItem key={item.title}>

                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                    >

                      <Link to={item.url} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>

                    </SidebarMenuButton>

                  </SidebarMenuItem>
                )
              })}

            </SidebarMenu>

          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>

    </Sidebar>
  )
}