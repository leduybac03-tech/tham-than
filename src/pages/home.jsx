import { Header } from "../components/header"
import { Button } from "../components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import {
  Shield,
  Calendar,
  BarChart3,
  CheckCircle2,
  Clock,
  FileText,
  Newspaper,
  MessageCircleHeart,
  CalendarDays,
  Facebook,
  Link2,
  ChartBar,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import NewsSection from "../components/newsSection"
import { FeedbackSection } from "../components/FeedbackSection"
import { useEffect } from "react"

export default function HomePage() {

  const location = useLocation()

  useEffect(() => {
    if (location.hash === "#feedbacks") {
      setTimeout(() => {
        document.getElementById("feedbacks")?.scrollIntoView({ behavior: "smooth" })
      }, 200)
    }
  }, [location])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section
          style={{ backgroundImage: "url('../bg-2.jpg')" }}
          className="relative bg-cover bg-center border-b border-border min-h-screen"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-red-800/85 to-yellow-900/70" />

          <div className="relative container mx-auto px-4 py-10 md:py-16 text-center">
            <div className="mx-auto max-w-5xl flex flex-col items-center gap-10">
              <div className="w-full max-w-4xl rounded-3xl bg-white/10 backdrop-blur-md border border-yellow-500/40 p-8 md:p-12 shadow-2xl animate-fade-in-up">
                <h1 className="text-balance text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-yellow-300 drop-shadow">
                  Hệ Thống Đăng Ký Thăm Thân Quân Nhân
                </h1>

                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-yellow-100">
                  Nền tảng quản lý lịch thăm thân <b>an toàn – chính quy – hiện đại</b>,
                  giúp thân nhân đăng ký thuận tiện, hỗ trợ đơn vị quản lý chặt chẽ,
                  đúng quy định và kỷ luật quân đội.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/dang-ky">
                    <Button
                      size="lg"
                      className="text-base font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-900 hover:from-yellow-500 hover:to-yellow-600 shadow-lg hover:scale-105 transition"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Đăng Ký Thăm Thân
                    </Button>
                  </Link>


                  <Link to="/feedbacks">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-base font-bold border-yellow-400 text-yellow-200 hover:bg-yellow-400 hover:text-red-900 shadow-lg hover:scale-105 transition"
                    >
                      <MessageCircleHeart className="mr-2 h-5 w-5" />
                      Gửi cảm nghĩ
                    </Button>
                  </Link>
                </div>
                <Link to="/theo-doi">
                  <Button
                    size="lg"
                    variant="outline"
                    className="mt-4 text-base font-bold border-sky-400 text-sky-200 hover:bg-sky-400 hover:text-green-900 shadow-lg hover:scale-105 transition"
                  >
                    <ChartBar className="mr-2 h-5 w-5" />
                    Theo dõi thăm thân
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <style>
            {`
              @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-fade-in-up {
                animation: fadeInUp 1s ease-out;
              }
            `}
          </style>
        </section>
        {/* ================== NEWS SECTION (ĐÃ NÂNG CẤP) ================== */}
        <NewsSection></NewsSection>
        {/* ================== END NEWS SECTION ================== */}

        {/* CTA Section */}
        <section className="border-t border-border py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Sẵn Sàng Đăng Ký?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Bắt đầu quy trình đăng ký thăm thân chỉ với vài thao tác đơn giản
              </p>
              <div className="mt-8">
                <Link to="/dang-ky">
                  <Button size="lg" className="text-base">
                    <Calendar className="mr-2 h-5 w-5" />
                    Đăng Ký Ngay
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-red-100 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Hệ Thống Thăm Thân Quân Nhân. Dành cho mục đích quản lý nội bộ.</p>
        </div>
      </footer>
    </div>
  )
}
