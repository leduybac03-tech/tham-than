import { Link, useLocation } from "react-router-dom"
import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { cn } from "../lib/utils"
import logo from "../assets/logo2.png"
import Marquee from "./Marquee"

export function Header() {
  const { pathname } = useLocation()

  const navItems = [
    { href: "/admin/login", label: "ADMIN" },
    { href: "/dang-ky", label: "Đăng Ký Thăm Thân" },
  ]

  return (
    <header className="
      sticky top-0 z-50 w-full
      bg-gradient-to-r from-red-900 via-red-800 to-red-900
      border-b border-amber-700/60
      text-white
      shadow-md
    ">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">

        {/* Logo */}
        <Link to="/" className="flex items-center md:gap-3 group flex-col md:flex-row">
          <img
            src={logo}
            alt="Logo"
            className="md:w-[72px] w-[40px] p-2 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-[10px] md:text-xl leading-3 sm:inline-block text-lg md:font-extrabold tracking-wide text-yellow-100 drop-shadow">
            Quân khu 4 <br />
            <span className="md:text-2xl text-yellow-400">Lữ đoàn 283</span>
          </span>
        </Link>

        {/* Marquee */}
        <Marquee
          text="Hệ thống thăm thân, giúp kết nối gia đình và quân nhân!"
          speed={10}
          className="md:w-1/6 md:text-3xl text-xl font-extrabold text-yellow-400"
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "font-bold border-2 border-amber-700 rounded-lg transition-all duration-300",
                    "text-yellow-200 hover:text-red-900 hover:bg-yellow-400 hover:shadow-lg hover:scale-105",
                    active && "bg-yellow-500 text-red-900 shadow-md"
                  )}
                >
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Mobile */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-yellow-300 hover:bg-yellow-400 hover:text-red-900"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="
              w-64
              bg-gradient-to-b from-red-900 to-red-800
              text-white
              border-l border-amber-700
            "
          >
            <nav className="flex flex-col gap-3 pt-6">
              {navItems.map((item) => {
                const active = pathname === item.href
                return (
                  <Link key={item.href} to={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start font-bold border-2 border-amber-700",
                        "text-yellow-200 hover:bg-yellow-400 hover:text-red-900",
                        active && "bg-yellow-500 text-red-900"
                      )}
                    >
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
