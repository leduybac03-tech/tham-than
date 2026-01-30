import { useState } from "react"
import {
  MessageSquareQuote,
  Send,
  ImagePlus,
  X,
  Star,
} from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Button } from "../components/ui/button"
import { http } from "../lib/http"
import { useNavigate } from "react-router-dom"
import ModalSuccess from "../components/ModalSuccess"

export default function FeedbackPage() {
  const [successOpen, setSuccessOpen] = useState(false)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    content: "",
    image: null,
    rating: 5, // ⭐ mặc định 5 sao
  })

  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setForm({ ...form, image: file })
    setPreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setForm({ ...form, image: null })
    setPreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") data.append(key, value)
    })

    try {
      await http.post("/feedbacks", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setSuccessOpen(true)
    } catch (err) {
      alert("Gửi feedback thất bại")
    }
  }

  return (
    <div
      style={{ backgroundImage: "url('/bg-2.jpg')" }}
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-red-800/70 to-black/80" />

      {/* Quote */}
      <MessageSquareQuote className="absolute top-10 right-10 w-[420px] h-[420px] text-white/10 rotate-12" />

      {/* Card */}
      <Card className="relative z-10 w-full max-w-xl mx-4 backdrop-blur-md bg-white/90 shadow-2xl border border-white/30">
        <CardContent className="p-4 max-h-[90vh] overflow-y-auto space-y-4">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-red-700">
              <MessageSquareQuote className="w-6 h-6" />
              <span className="uppercase tracking-widest text-xs font-bold">
                Feedback
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-red-800">
              Gửi cảm nghĩ tới đơn vị
            </h1>
            <div className="mx-auto h-1 w-20 rounded-full bg-red-700" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                name="name"
                placeholder="Họ và tên"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                name="phone"
                placeholder="Số điện thoại"
                value={form.phone}
                onChange={handleChange}
              />
              <Input
                name="address"
                placeholder="Địa chỉ"
                value={form.address}
                onChange={handleChange}
                className="md:col-span-2"
              />
            </div>

            {/* ⭐ STAR RATING */}
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-700">
                Đánh giá đơn vị
              </p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm({ ...form, rating: star })}
                    className="transition"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= form.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <Textarea
              name="content"
              placeholder="Cảm nghĩ của đồng chí về đơn vị..."
              rows={3}
              value={form.content}
              onChange={handleChange}
              required
            />

            {/* Upload image */}
            <div className="flex items-center gap-4">
              {!preview ? (
                <label className="flex items-center gap-2 border border-dashed border-red-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-red-50">
                  <ImagePlus className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-600">
                    Tải ảnh đính kèm
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-40 h-20 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              <span className="text-xs text-gray-500">(không bắt buộc)</span>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full bg-red-700 hover:bg-red-800 text-white font-bold"
              >
                <Send className="w-4 h-4 mr-2" />
                Gửi cảm nghĩ
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full border-red-700 text-red-700"
                onClick={() => navigate("/dang-ky")}
              >
                Đăng ký thăm thân
              </Button>
            </div>
          </form>

          <p className="text-[11px] text-center text-gray-500">
            * Thông tin được dùng để tiếp nhận và tổng hợp ý kiến
          </p>
        </CardContent>
      </Card>

      <ModalSuccess
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
      />
    </div>
  )
}
