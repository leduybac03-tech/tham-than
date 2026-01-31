import { Link, useLocation } from "react-router-dom"
import {
  Home,
  Calendar,
  BarChart3,
  PenIcon,
  MessageCircle,
  X,
} from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"
import logo from "../assets/logo.png"
import { useSidebar } from "../context/SidebarContext"

export function Sidebar() {
  const { open, close } = useSidebar()
  const pathname = useLocation().pathname

  const navItems = [
    { href: "/admin", label: "Trang Chủ", icon: Home },
    { href: "/admin/visits", label: "Quản lý thăm thân", icon: Calendar },
    { href: "/admin/posts", label: "Quản lý bài viết", icon: PenIcon },
    { href: "/admin/thong-ke", label: "Thống Kê", icon: BarChart3 },
    { href: "/admin/feedbacks", label: "Quản lý cảm nghĩ", icon: MessageCircle },
  ]

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-[200px] bg-card border-r transition-transform duration-300",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} width={40} />
            <p className="text-xs">
              Tiểu đoàn 3 <br /> Lữ đoàn 283
            </p>
          </Link>

          {/* ❌ Close mobile */}
          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden"
            onClick={close}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Nav */}
        <nav className="p-3 space-y-2 flex md:flex-row flex-col">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href

            return (
              <Link key={item.href} to={item.href} onClick={close}>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start gap-3 text-[10px] md:font-medium",
                    active &&
                      "bg-red-600 text-secondary-foreground hover:bg-red-500"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
