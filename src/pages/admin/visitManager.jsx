import { useEffect, useState } from "react"
import {
    CheckCircle2,
    XCircle,
    Clock,
} from "lucide-react"

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
import { Badge } from "../../components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { http } from "../../lib/http"
import { TopHeader } from "../../components/TopHeader"
import { formatVisit } from "../../lib/utils"
import { getRelationshipLabel } from "../../lib/getRelationshipLabel"
import { RenderStatus } from "../../lib/renderStatus"

export default function VisitManagePage() {
    const [visits, setVisits] = useState([])

    const fetchVisits = async () => {
        try {
            const res = await http.get("/visits")
            setVisits(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchVisits()
    }, [])

    const updateStatus = async (id, status) => {
        try {
            await http.patch(`/visits/${id}/status`, { status })
            fetchVisits()
        } catch (err) {
            alert("Lỗi cập nhật trạng thái")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                <TopHeader />
                <Sidebar />

                <div className="ml-[200px] py-10 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quản lý đăng ký thăm thân</CardTitle>
                        </CardHeader>

                        <CardContent>
                            {/* BẮT BUỘC: wrapper để scroll ngang */}
                            <div className="relative overflow-x-auto">
                                <Table className="min-w-[1600px]">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Người thăm</TableHead>
                                            <TableHead>CCCD</TableHead>
                                            <TableHead>Địa chỉ</TableHead>
                                            <TableHead>Quan hệ</TableHead>
                                            <TableHead>Quân nhân</TableHead>
                                            <TableHead>Đơn vị</TableHead>
                                            <TableHead>Thời gian</TableHead>
                                            <TableHead>Số người</TableHead>
                                            <TableHead>Mục đích</TableHead>
                                            <TableHead>Trạng thái</TableHead>

                                            {/* HEADER FIXED */}
                                            <TableHead
                                                className="
                          sticky right-0 z-30
                          bg-red-50
                          text-right
                          shadow-[-2px_0_6px_rgba(0,0,0,0.08)]
                        "
                                            >
                                                Thao tác
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {visits.map((v) => (
                                            <TableRow key={v._id}>
                                                {/* Người thăm */}
                                                <TableCell>
                                                    <div className="font-medium">{v.fullName}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        📞 {v.phoneNumber}
                                                    </div>
                                                </TableCell>

                                                {/* CCCD */}
                                                <TableCell>{v.cccd}</TableCell>

                                                {/* Địa chỉ */}
                                                <TableCell className="max-w-[200px] truncate">
                                                    {v.address}
                                                </TableCell>

                                                {/* Quan hệ */}
                                                <TableCell>
                                                    {getRelationshipLabel(v.relationship)}
                                                </TableCell>

                                                {/* Quân nhân */}
                                                <TableCell>
                                                    <div className="font-medium">
                                                        {v.soldier?.fullName || "—"}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {v.soldier?.rank}
                                                    </div>
                                                </TableCell>

                                                {/* Đơn vị */}
                                                <TableCell>{v.unit}</TableCell>

                                                {/* Thời gian */}
                                                <TableCell>
                                                    {formatVisit(v.dateVisit, v.timeVisit)}
                                                </TableCell>

                                                {/* Số người */}
                                                <TableCell>
                                                    {v.howManyPeople || 1}
                                                    {v.whoPeople && (
                                                        <div className="text-sm text-muted-foreground">
                                                            ({v.whoPeople})
                                                        </div>
                                                    )}
                                                </TableCell>

                                                {/* Mục đích */}
                                                <TableCell className="max-w-[200px] truncate">
                                                    {v.mucDichVisit || "—"}
                                                </TableCell>

                                                {/* Trạng thái */}
                                                <TableCell>
                                                    <RenderStatus status={v.status}></RenderStatus>
                                                </TableCell>

                                                {/* CELL FIXED */}
                                                <TableCell
                                                    className="
                            sticky right-0 z-20
                            bg-red-50
                            text-right
                            shadow-[-2px_0_6px_rgba(0,0,0,0.08)]
                          "
                                                >
                                                    {v.status === "pending" ? (
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                size="sm"
                                                                onClick={() =>
                                                                    updateStatus(v._id, "approved")
                                                                }
                                                            >
                                                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                                                Duyệt
                                                            </Button>

                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                onClick={() =>
                                                                    updateStatus(v._id, "rejected")
                                                                }
                                                            >
                                                                <XCircle className="h-4 w-4 mr-1" />
                                                                Từ chối
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Clock className="h-4 w-4 text-muted-foreground ml-auto" />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
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
