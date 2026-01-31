import { useEffect, useRef, useState } from "react"
import { Bell, Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { http } from "../lib/http"
import { useOutsideClick } from "../hooks/useOutsideClick"
import { useLogout } from "../hooks/useLogout"
import { VisitDropdown } from "./VisitDropDown"
import { useSidebar } from "../context/SidebarContext"

export function TopHeader() {
  const [open, setOpen] = useState(false)
  const [pendingVisits, setPendingVisits] = useState([])
  const [loading, setLoading] = useState(false)

  const dropdownRef = useRef(null)
  const logout = useLogout()
  const { toggle } = useSidebar()

  useOutsideClick(dropdownRef, () => setOpen(false))

  useEffect(() => {
    const fetchPendingVisits = async () => {
      const res = await http.get("/visits/status/pending?limit=5")
      setPendingVisits(res.data)
    }
    fetchPendingVisits()
  }, [])

  return (
    <header className="fixed left-0 lg:left-[200px] right-0 top-0 z-30 border-b bg-card/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-3 sm:px-6">

        {/* 🍔 Hamburger – chỉ hiện mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggle}
        >
          <Menu className="h-6 w-6" />
        </Button>

        <h1 className="hidden md:block text-lg lg:text-xl font-semibold">
          Hệ Thống Quản Lý Thăm Thân Quân Nhân
        </h1>

        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
            <Bell className="h-5 w-5" />
            {pendingVisits.length > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center">
                {pendingVisits.length}
              </Badge>
            )}
          </Button>

          {open && <VisitDropdown visits={pendingVisits} loading={loading} />}

          <Button
            variant="ghost"
            onClick={logout}
            className="text-red-600 bg-red-100 font-bold"
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    </header>
  )
}
