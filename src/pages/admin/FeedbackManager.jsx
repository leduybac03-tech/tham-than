import { useEffect, useState } from "react"
import { CheckCircle2, XCircle, Trash2 } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Sidebar } from "../../components/SideBar"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "../../components/ui/tabel"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "../../components/ui/card"
import { http } from "../../lib/http"
import { TopHeader } from "../../components/TopHeader"
import { RenderStatus } from "../../lib/renderStatus"
import { format } from "date-fns"
import FullScreenLoading from "../../components/Loading"

export default function FeedbackManagePage() {
    const [feedbacks, setFeedbacks] = useState([])

    const fetchFeedbacks = async () => {
        try {
            const res = await http.get("/feedbacks")
            setFeedbacks(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchFeedbacks()
    }, [])

    const updateStatus = async (id, status) => {
        try {
            await http.put(`/feedbacks/${id}/${status}`)
            fetchFeedbacks()
        } catch (err) {
            alert("Lỗi cập nhật trạng thái")
        }
    }

    const deleteFeedback = async (id) => {
        if (!window.confirm("Đồng chí chắc chắn muốn xoá feedback này?"))
            return

        try {
            await http.delete(`/feedbacks/${id}`)
            fetchFeedbacks()
        } catch (err) {
            alert(err.response?.data?.message || "Xoá feedback thất bại")
        }
    }

    if (!(feedbacks.length > 0)) return <FullScreenLoading />

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-3 sm:p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <TopHeader />
                <Sidebar />

                {/* ✅ Responsive content wrapper */}
                <div className="mt-[70px] ml-0 lg:ml-[200px] py-6 px-1 sm:px-3 lg:px-0">
                    <Card>
                        <CardHeader className="px-4 sm:px-6">
                            <CardTitle>Quản lý Feedbacks</CardTitle>
                        </CardHeader>

                        <CardContent className="px-0 sm:px-6">
                            {/* ✅ Scroll ngang mobile */}
                            <div className="relative overflow-x-auto">
                                <Table className="min-w-[1200px]">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Người gửi</TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Địa chỉ
                                            </TableHead>
                                            <TableHead>SĐT</TableHead>
                                            <TableHead>Nội dung</TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Ảnh
                                            </TableHead>
                                            <TableHead>
                                                Thời gian
                                            </TableHead>
                                            <TableHead>
                                                Trạng thái
                                            </TableHead>
                                            <TableHead className="text-right">
                                                Thao tác
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {feedbacks.length > 0 ? (
                                            feedbacks.map((fb) => (
                                                <TableRow key={fb._id}>
                                                    <TableCell className="truncate max-w-[120px]">
                                                        {fb.name}
                                                    </TableCell>

                                                    <TableCell className="hidden md:table-cell truncate max-w-[150px]">
                                                        {fb.address || "—"}
                                                    </TableCell>

                                                    <TableCell>
                                                        {fb.phone || "—"}
                                                    </TableCell>

                                                    <TableCell
                                                        className="truncate max-w-[250px]"
                                                        title={fb.content}
                                                    >
                                                        {fb.content}
                                                    </TableCell>

                                                    <TableCell className="hidden sm:table-cell">
                                                        {fb.image ? (
                                                            <img
                                                                src={fb.image}
                                                                alt="feedback"
                                                                className="w-12 h-12 object-cover rounded-md border"
                                                            />
                                                        ) : (
                                                            "—"
                                                        )}
                                                    </TableCell>

                                                    <TableCell>
                                                        {format(
                                                            new Date(
                                                                fb.createdAt
                                                            ),
                                                            "dd/MM/yyyy HH:mm"
                                                        )}
                                                    </TableCell>

                                                    <TableCell>
                                                        <RenderStatus
                                                            status={fb.status}
                                                        />
                                                    </TableCell>

                                                    <TableCell className="text-right">
                                                        {fb.status ===
                                                        "pending" ? (
                                                            <div className="flex justify-end gap-1">
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        updateStatus(
                                                                            fb._id,
                                                                            "approved"
                                                                        )
                                                                    }
                                                                >
                                                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                                                    Duyệt
                                                                </Button>

                                                                <Button
                                                                    size="sm"
                                                                    variant="destructive"
                                                                    onClick={() =>
                                                                        updateStatus(
                                                                            fb._id,
                                                                            "rejected"
                                                                        )
                                                                    }
                                                                >
                                                                    <XCircle className="h-3 w-3 mr-1" />
                                                                    Từ chối
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <Button
                                                                size="icon"
                                                                variant="destructive"
                                                                onClick={() =>
                                                                    deleteFeedback(
                                                                        fb._id
                                                                    )
                                                                }
                                                                title="Xoá feedback"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={8}
                                                    className="text-center text-yellow-600 font-bold"
                                                >
                                                    Chưa có cảm nghĩ nào!
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
