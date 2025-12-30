import { useEffect, useRef, useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { http } from "../lib/http"
import { useOutsideClick } from "../hooks/useOutsideClick"
import { useLogout } from "../hooks/useLogout"
import { VisitDropdown } from "./VisitDropDown"

export function TopHeader() {
    const [open, setOpen] = useState(false)
    const [pendingVisits, setPendingVisits] = useState([])
    const [loading, setLoading] = useState(false)

    const dropdownRef = useRef(null)
    const logout = useLogout()

    useOutsideClick(dropdownRef, () => setOpen(false))

    const fetchPendingVisits = async () => {
        setLoading(true)
        try {
            const res = await http.get("/visits/status/pending?limit=5")
            setPendingVisits(res.data)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchPendingVisits()
    }, [])
    const toggleDropdown = () => {
        setOpen(!open)
    }

    return (
        <header className="fixed left-1/6 right-0 top-0 z-30 border-b bg-card/95 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-6">
                <h1 className="text-xl font-semibold hidden md:block">
                    Hệ Thống Quản Lý Thăm Thân Quân Nhân
                </h1>

                <div className="flex items-center gap-3 relative" ref={dropdownRef}>
                    {/* 🔔 Bell */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleDropdown}
                        className="relative"
                    >
                        <Bell className="h-5 w-5" />
                        {pendingVisits.length > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-1 text-xs">
                                {pendingVisits.length}
                            </Badge>
                        )}
                    </Button>

                    {/* 📦 Dropdown */}
                    {open && (
                        <VisitDropdown
                            visits={pendingVisits}
                            loading={loading}
                        />
                    )}

                    {/* 🚪 Logout */}
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
