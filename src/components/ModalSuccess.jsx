import { CheckCircle2, Home } from "lucide-react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

export default function ModalSuccess({ open, onClose }) {
    const navigate = useNavigate()

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal box */}
            <div className="relative z-10 w-full max-w-md mx-4 rounded-2xl bg-white shadow-2xl p-8 text-center animate-in fade-in zoom-in">
                <CheckCircle2 className="mx-auto w-14 h-14 text-green-600" />

                <h2 className="mt-4 text-2xl font-extrabold text-red-700">
                    Gửi cảm nghĩ thành công
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                    Cảm ơn đồng chí đã gửi tình cảm và niềm tin tới đơn vị.
                </p>

                <div className="mt-6 flex gap-3 justify-center">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/")}
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Trang chủ
                    </Button>

                    <Button
                        className="bg-red-700 hover:bg-red-800 text-white"
                        onClick={() => navigate("/#feedbacks")}
                    >
                        Xem feedbacks
                    </Button>
                </div>
            </div>
        </div>
    )
}
