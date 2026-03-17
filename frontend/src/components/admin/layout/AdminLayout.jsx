import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "./Sidebar"
import Topbar from "./Topbar"
import { Outlet } from "react-router-dom"

export default function AdminLayout() {
  return (
    <SidebarProvider defaultOpen collapsible="icon">
      <AppSidebar />

      <SidebarInset>
        <Topbar />

        <main className="p-6 bg-muted/40 min-h-screen">
          <Outlet />
        </main>
      </SidebarInset>

    </SidebarProvider>
  )
}