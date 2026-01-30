import { Loader2 } from "lucide-react"
import { TopHeader } from "./TopHeader"
import { Sidebar } from "./SideBar"

export default function FullScreenLoading({ text = "Đang tải dữ liệu..." }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <TopHeader></TopHeader>
            <Sidebar></Sidebar>
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-yellow-600" />
                <p className="text-sm font-medium text-muted-foreground">
                    {text}
                </p>
            </div>
        </div>
    )
}
