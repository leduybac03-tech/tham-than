import { useState } from "react"
import { TopHeader } from "./TopHeader"
import { Sheet, SheetContent } from "./ui/sheet"
import { Sidebar } from "./SideBar"

export function Layout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="min-h-screen bg-background">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Mobile Sidebar */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetContent side="left" className="w-64 p-0">
                    <Sidebar />
                </SheetContent>
            </Sheet>

            {/* Top Header */}
            <TopHeader onMenuClick={() => setMobileMenuOpen(true)} />

            {/* Main Content */}
            <main className="pt-16 transition-all duration-300 md:pl-64">
                <div className="p-6">{children}</div>
            </main>
        </div>
    )
}
