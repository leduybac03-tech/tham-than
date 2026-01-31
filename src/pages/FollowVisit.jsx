import { useState } from "react"
import { Header } from "../components/header"
import { Button } from "../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import {
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  CalendarPlus,
  PhoneCall,
} from "lucide-react"
import { Link } from "react-router-dom"
import { http } from "../lib/http" // 👉 dùng axios instance sẵn có

export default function FollowVisit() {
  const [phone, setPhone] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  /* ================= SEARCH ================= */
  const handleSearch = async () => {
    if (!phone.trim()) return

    try {
      setLoading(true)
      setError("")
      setResults([])

      const res = await http.get("/visits/track", {
        params: { phone },
      })

      setResults(res.data.data || [])
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Không thể tra cứu đơn đăng ký"
      )
    } finally {
      setLoading(false)
    }
  }

  /* ================= STATUS BADGE ================= */
  const renderStatus = (status) => {
    if (status === "approved")
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
          <CheckCircle2 className="h-4 w-4" />
          Đã phê duyệt
        </span>
      )

    if (status === "rejected")
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
          <XCircle className="h-4 w-4" />
          Từ chối
        </span>
      )

    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
        <Clock className="h-4 w-4" />
        Chờ duyệt
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-20 space-y-12">

        {/* ===== TRA CỨU ===== */}
        <Card className="mx-auto max-w-3xl shadow-xl border-2">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
              <PhoneCall className="h-8 w-8" />
            </div>

            <CardTitle className="text-3xl font-bold text-red-700">
              Tra Cứu Thăm Thân
            </CardTitle>

            <CardDescription className="text-base font-bold">
              Nhập số điện thoại đã đăng ký để theo dõi trạng thái hồ sơ
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 px-10 pb-10">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                className="h-12 text-base"
                placeholder="Ví dụ: 0987xxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button
                size="lg"
                className="h-12 px-8 font-bold"
                onClick={handleSearch}
                disabled={loading}
              >
                <Search className="mr-2 h-5 w-5" />
                {loading ? "Đang tra cứu..." : "Tra cứu"}
              </Button>
            </div>

            {/* ===== ERROR ===== */}
            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* ===== RESULT LIST ===== */}
            {results.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border bg-muted/40 p-6 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold">
                    {item.fullName}
                  </div>
                  {renderStatus(item.status)}
                </div>

                <div className="grid gap-2 text-sm text-muted-foreground">
                  <div>
                    <b>Quân nhân:</b>{" "}
                    {item.soldier?.rank} {item.soldier?.name}
                  </div>
                  <div>
                    <b>Đơn vị:</b> {item.soldier?.unit}
                  </div>
                  <div>
                    <b>Ngày đăng ký:</b>{" "}
                    {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ===== ĐĂNG KÝ MỚI ===== */}
        <Card className="mx-auto max-w-xl border-dashed">
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
            <div className="flex items-center gap-3">
              <CalendarPlus className="h-6 w-6 text-sky-600" />
              <div>
                <div className="font-semibold">
                  Chưa có hồ sơ?
                </div>
                <div className="text-sm text-muted-foreground">
                  Thực hiện đăng ký thăm thân mới
                </div>
              </div>
            </div>

            <Link to="/dang-ky">
              <Button variant="sky" className="font-semibold">
                Đăng ký ngay
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t border-border bg-red-100 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 Hệ Thống Thăm Thân Quân Nhân
        </div>
      </footer>
    </div>
  )
}
