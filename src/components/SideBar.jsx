import { Link, useLocation } from "react-router-dom"
import { Shield, Home, Calendar, BarChart3, ChevronLeft, ChevronRight, PenIcon } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "../lib/utils"
import logo from '../assets/logo.png'; // with import

export function Sidebar() {
  const location = useLocation()
  const pathname = location.pathname

  const navItems = [
    { href: "/admin", label: "Trang Chủ", icon: Home },
    { href: "/admin/visits", label: "Quản lý thăm thân", icon: Calendar },
    { href: "/admin/posts", label: "Quản lý bài viết", icon: PenIcon },
    { href: "/admin/thong-ke", label: "Thống Kê", icon: BarChart3 },
  ]

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300",
        "w-1/6",
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-border px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} width={60}></img>
          <p className="text-sm">Tiểu đoàn 3 <br /> Lữ đoàn 283</p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 gap-2 flex flex-col">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} to={item.href}>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start gap-3",
                  isActive && "bg-red-600 text-secondary-foreground hover:bg-red-500 hover:text-secondary-foreground",
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
