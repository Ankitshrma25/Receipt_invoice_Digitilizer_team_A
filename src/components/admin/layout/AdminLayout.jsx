import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "./Sidebar"
import Topbar from "./Topbar"

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <Topbar />
        <main className="p-6 bg-muted/40 min-h-screen">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}