
import { useEffect, useState } from "react"
import {
  User,
  Users,
  Clock,
  Calendar,
  CheckCircle2,
  FileText,
} from "lucide-react"

import { Button } from "../components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select"
import { Alert, AlertDescription } from "../components/ui/alert"
import { http } from "../lib/http"
import { Header } from "../components/header"
import { generateVisitCode } from '../lib/generateVisitCode'

export default function DangKyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState("")
  const [soldiers, setSoldiers] = useState([])
  const [unit, setUnit] = useState("")
  const [selectedSoldier, setSelectedSoldier] = useState("")
  const [form, setForm] = useState({
    fullName: "",
    cccd: "",
    phoneNumber: "",
    relationship: "",
    address: "",
    howManyPeople: "",
    whoPeople: "",

    dateVisit: "",
    timeVisit: "",
    mucDichVisit: "",
  })

  useEffect(() => {
    http.get("/soldiers").then(res => setSoldiers(res.data))
  }, [])
  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }
  useEffect(() => {
    if (!unit) return
    http.get(`/soldiers?unit=${unit}`).then(res => {
      setSoldiers(res.data)
      setSelectedSoldier("")
    })
  }, [unit])
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await http.post("/visits", {
        ...form,
        soldierId: selectedSoldier
      })
      setForm({
        fullName: "",
        cccd: "",
        phoneNumber: "",
        relationship: "",
        address: "",
        dateVisit: "",
        timeVisit: "",
        mucDichVisit: "",
        howManyPeople: "",
        whoPeople: "",
      })
      const code = generateVisitCode(form.unit, form.dateVisit)
      setConfirmationCode(code)
      setSubmitted(true)
    } catch (err) {
      alert("❌ Lỗi: " + err.response?.data?.message)
    }
  }
  if (submitted) {
    return (
      <div>
        <Header></Header>
        <div className="min-h-screen bg-background">
          <main className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-2xl">
              <Card className="border-accent bg-accent/5">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                    <CheckCircle2 className="h-10 w-10 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Đăng Ký Thành Công!</CardTitle>
                  <CardDescription className="text-base">Yêu cầu thăm thân của bạn đã được ghi nhận</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg bg-card p-6 text-center">
                    <p className="mb-2 text-sm font-medium text-muted-foreground">Mã Xác Nhận Của Bạn</p>
                    <p className="font-mono text-2xl font-bold tracking-wider text-primary">{confirmationCode}</p>
                  </div>

                  <Alert>
                    <FileText className="h-4 w-4" />
                    <AlertDescription className="leading-relaxed">
                      Vui lòng lưu lại mã xác nhận này và xuất trình cho bảo vệ khi đến đơn vị. Mang theo giấy tờ tùy thân
                      hợp lệ (CMND/CCCD).
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3 text-sm text-muted-foreground">
                    <h4 className="font-semibold text-foreground">Lưu Ý Quan Trọng:</h4>
                    <ul className="space-y-2 pl-5">
                      <li className="list-disc">Đến trước giờ hẹn ít nhất 15 phút để làm thủ tục</li>
                      <li className="list-disc">Tuân thủ quy định an ninh của đơn vị quân đội</li>
                      <li className="list-disc">Không mang theo vật dụng cấm theo quy định</li>
                      <li className="list-disc">Liên hệ bảo vệ nếu cần thay đổi lịch hẹn</li>
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      className="flex-1"
                      onClick={() => {
                        setSubmitted(false)
                        setConfirmationCode("")
                      }}
                    >
                      Đăng Ký Mới
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => window.print()}>
                      In Mã Xác Nhận
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Header></Header>
      <div className="container mx-auto max-w-4xl py-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ================= NGƯỜI THĂM ================= */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-600">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Thông Tin Người Thăm</CardTitle>
                  <CardDescription>Thông tin cá nhân</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Họ và tên *</Label>
                  <Input
                    value={form.fullName}
                    onChange={e => handleChange("fullName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>CCCD *</Label>
                  <Input
                    value={form.cccd}
                    onChange={e => handleChange("cccd", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Số điện thoại *</Label>
                  <Input
                    value={form.phoneNumber}
                    onChange={e => handleChange("phoneNumber", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label>Quan hệ *</Label>
                  <Select
                    value={form.relationship}
                    onValueChange={v => handleChange("relationship", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn quan hệ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parent">Cha/Mẹ</SelectItem>
                      <SelectItem value="spouse">Vợ/Chồng</SelectItem>
                      <SelectItem value="sibling">Anh/Chị/Em</SelectItem>
                      <SelectItem value="relative">Họ hàng</SelectItem>
                      <SelectItem value="friend">Bạn bè</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid  gap-4">
                <div>
                  <Label>Số người đi cùng</Label>
                  <Input
                    value={form.howManyPeople}
                    onChange={e => handleChange("howManyPeople", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Thông tin người đi cùng</Label>
                  <Textarea
                    value={form.whoPeople}
                    onChange={e => handleChange("whoPeople", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>Địa chỉ *</Label>
                <Input
                  value={form.address}
                  onChange={e => handleChange("address", e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* ================= QUÂN NHÂN ================= */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-700">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Thông Tin Quân Nhân</CardTitle>
                  <CardDescription>Người được thăm</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">

              {/* ====== ĐƠN VỊ (CHỌN TRƯỚC) ====== */}
              <div>
                <Label>Đơn vị *</Label>
                <Select
                  value={form.unit}
                  onValueChange={(v) => {
                    handleChange("unit", v)
                    setUnit(v)
                    setSelectedSoldier("") // reset quân nhân khi đổi đơn vị
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn đơn vị" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Đại đội 7">Đại đội 7</SelectItem>
                    <SelectItem value="Đại đội 8">Đại đội 8</SelectItem>
                    <SelectItem value="Đại đội 9">Đại đội 9</SelectItem>
                    <SelectItem value="Trung đội TT">Trung đội TT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ====== QUÂN NHÂN (DISABLE KHI CHƯA CHỌN ĐƠN VỊ) ====== */}
              <div>
                <Label>Quân nhân *</Label>
                <Select
                  value={selectedSoldier}
                  onValueChange={setSelectedSoldier}
                  disabled={!unit}
                >
                  <SelectTrigger disabled={!unit}>
                    <SelectValue
                      placeholder={
                        unit ? "Chọn quân nhân" : "Vui lòng chọn đơn vị trước"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {soldiers.length > 0 ? soldiers.map(s => (
                      <SelectItem key={s._id} value={s._id}>
                        {s.name} – {s.rank}
                      </SelectItem>
                    )) : "Không có quân nhân nào!"}
                  </SelectContent>
                </Select>
              </div>

            </CardContent>

          </Card>

          {/* ================= LỊCH THĂM ================= */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Lịch Thăm</CardTitle>
                  <CardDescription>Thời gian đăng ký</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Ngày thăm *</Label>
                  <Input
                    min={new Date().toLocaleDateString("en-CA")}
                    type="date"
                    value={form.dateVisit}
                    onChange={e => handleChange("dateVisit", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Giờ thăm *</Label>
                  <Select
                    value={form.timeVisit}
                    onValueChange={v => handleChange("timeVisit", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giờ đến" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00">08:00</SelectItem>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="10:00">10:00</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="15:00">15:00</SelectItem>
                      <SelectItem value="16:00">16:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Mục đích</Label>
                <Textarea
                  rows={3}
                  value={form.mucDichVisit}
                  onChange={e => handleChange("mucDichVisit", e.target.value)}
                />
              </div>

              <Alert>
                <Calendar className="h-4 w-4" />
                <AlertDescription>
                  Thăm thân: Thứ 7, CN & ngày lễ (08:00–11:00, 14:00–17:00)
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Hoàn tất đăng ký
          </Button>

        </form>
      </div>
    </div>
  )
}
