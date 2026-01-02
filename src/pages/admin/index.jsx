import { CheckCircle2, Clock, RollerCoaster, Users, XCircle } from "lucide-react"
import { Sidebar } from "../../components/SideBar"
import { TopHeader } from "../../components/TopHeader"
import { useEffect, useState } from "react"
import { http } from "../../lib/http"
import { Card, CardContent, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/tabel"
import { Button } from "../../components/ui/button"
import { getRelationshipLabel } from "../../lib/getRelationshipLabel"
import { formatVisit } from "../../lib/utils"
import { Badge } from "../../components/ui/badge"
import { RenderStatus } from "../../lib/renderStatus"

export default function AdminDashboard() {

    const [visits, setVisits] = useState([])
    const [activeType, setActiveType] = useState(null)
    const [stats, setStats] = useState(null)
    useEffect(() => {
        const fetchStats = async () => {
            const res = await http.get("/stats")
            console.log(res.data);

            setStats(res.data)
        }
        fetchStats()
    }, [])
    const TABLE_TITLES = {
        today: "Danh sách thăm thân hôm nay",
        approved: "Danh sách thăm thân đã duyệt",
        pending: "Danh sách thăm thân chờ duyệt",
        month: "Danh sách thăm thân trong tháng",
    }
    const fetchVisits = async (type) => {
        setActiveType(type)

        let url = "/visits"

        if (type === "today") url += "?range=today"
        if (type === "month") url += "?range=month"
        if (type === "approved") url = "/visits/status/approved"
        if (type === "pending") url = "/visits/status/pending"

        const res = await http.get(url)
        setVisits(res.data)
    }



    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto">
                <TopHeader></TopHeader>
                <Sidebar></Sidebar>
                <div className="mt-[70px] ml-[200px]">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Bảng điều khiển</h1>
                        <p className="text-slate-600">Xem tổng quan hoạt động hệ thống</p>
                    </div>

                    {/* Thẻ thống kê */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Lượt thăm hôm nay"
                            value={stats?.today ?? 0}
                            gradient="from-blue-500 to-cyan-500"
                            bgColor="bg-blue-50"
                            iconColor="text-blue-600"
                            icon={<Users />}
                            onClick={() => fetchVisits("today")}
                            active={activeType === "today"}
                        />

                        <StatCard
                            title="Đã duyệt"
                            value={stats?.approved ?? 0}
                            gradient="from-emerald-500 to-teal-500"
                            bgColor="bg-emerald-50"
                            iconColor="text-emerald-600"
                            icon={<CheckCircle2 />}
                            onClick={() => fetchVisits("approved")}
                            active={activeType === "approved"}
                        />

                        <StatCard
                            title="Chờ duyệt"
                            value={stats?.pending ?? 0}
                            gradient="from-amber-500 to-orange-500"
                            bgColor="bg-amber-50"
                            iconColor="text-amber-600"
                            icon={<Clock />}
                            onClick={() => fetchVisits("pending")}
                            active={activeType === "pending"}
                        />

                        <StatCard
                            title="Lượt thăm tháng này"
                            value={stats?.thisMonth ?? 0}
                            gradient="from-red-500 to-orange-500"
                            bgColor="bg-green-50"
                            iconColor="text-amber-600"
                            icon={<RollerCoaster />}
                            onClick={() => fetchVisits("month")}
                            active={activeType === "month"}
                        />
                    </div>
                    {activeType && (
                        <Card className="mb-8">
                            <CardTitle className="p-6">
                                {TABLE_TITLES[activeType] || "Danh sách thăm thân"}
                            </CardTitle>

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
                                                </TableRow>
                                            ))}

                                            {visits.length === 0 && (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={11}
                                                        className="text-center text-muted-foreground py-6"
                                                    >
                                                        Không có dữ liệu
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    )}



                    {/* Thông báo */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-6 py-4 border-b border-slate-200">
                            <h2 className="text-lg font-semibold text-slate-900">Thông báo hệ thống</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {stats?.pending > 0 && (
                                    <NotificationItem
                                        title={`Có ${stats.pending} lượt thăm thân mới cần duyệt`}
                                        type="warning"
                                    />
                                )}
                                <NotificationItem title="Cập nhật quy định thăm thân tháng này" type="info" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({
    title,
    value,
    icon,
    gradient,
    bgColor,
    iconColor,
    onClick,
    active,
}) {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer group bg-white rounded-xl shadow-sm border 
            ${active ? "border-blue-500 ring-2 ring-blue-200" : "border-slate-200"}
            p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`${bgColor} ${iconColor} p-3 rounded-lg`}>
                    {icon}
                </div>
            </div>
            <div>
                <p className="text-slate-600 text-sm mb-2">{title}</p>
                <p className={`text-4xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                    {value}
                </p>
            </div>
        </div>
    )
}


function NotificationItem({ title, type }) {
    const colors = {
        warning: "bg-amber-50 border-amber-200 text-amber-800",
        info: "bg-blue-50 border-blue-200 text-blue-800",
    }

    const dotColors = {
        warning: "bg-amber-500",
        info: "bg-blue-500",
    }

    return (
        <div className={`flex items-start gap-3 p-4 rounded-lg border ${colors[type]}`}>
            <div className={`w-2 h-2 rounded-full mt-2 ${dotColors[type]}`} />
            <p className="flex-1 text-sm leading-relaxed">{title}</p>
        </div>
    )
}
