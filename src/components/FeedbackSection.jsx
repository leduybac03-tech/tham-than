import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { http } from "../lib/http"

export function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await http.get("/feedbacks?status=approved")
        setFeedbacks(res.data)
      } catch (err) {
        console.error("Lỗi lấy feedbacks:", err)
      }
    }
    fetchFeedbacks()
  }, [])

  if (!feedbacks.length) return null

  return (
    <div className="space-y-4">
      {/* Header nhỏ kiểu báo điện tử */}
      <div className="flex items-center justify-between border-b border-red-200 pb-2">
        <span className="text-sm font-bold text-red-700 uppercase">
          Ý kiến bạn đọc
        </span>
        <span className="text-xs text-gray-500">
          {feedbacks.length} phản hồi
        </span>
      </div>

      {/* Danh sách feedback */}
      <div className="space-y-3">
        {feedbacks.slice(0, 3).map((fb, index) => (
          <div
            key={index}
            className="flex gap-3 border-b border-gray-100 pb-3 last:border-none"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="h-9 w-9 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-sm">
                {fb.name?.charAt(0) || "A"}
              </div>
            </div>

            {/* Nội dung */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-gray-800">
                  {fb.name}
                </span>

                {/* rating */}
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= (fb.rating || 5)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-xs text-gray-400">
                  • {new Date(fb.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>

              <p className="mt-1 text-sm text-gray-700 leading-relaxed line-clamp-2">
                {fb.content}
              </p>

              {/* ảnh nếu có */}
              {/* {fb.image && (
                <img
                  src={fb.image}
                  alt={fb.name}
                  className="mt-2 h-20 rounded-md border"
                />
              )} */}
            </div>
          </div>
        ))}
      </div>

      {/* Xem thêm */}
      <div className="pt-2">
        <a
          href="/feedbacks"
          className="text-xs font-semibold text-red-700 hover:underline"
        >
          Xem tất cả phản hồi →
        </a>
      </div>
    </div>
  )
}
