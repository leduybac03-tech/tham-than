import { useEffect, useState } from "react"
import {
  BarChart3,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.jsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/tabel.jsx"
import { Badge } from "../../components/ui/badge.jsx"

import { TopHeader } from "../../components/TopHeader.jsx"
import { Sidebar } from "../../components/SideBar.jsx"
import { http } from "../../lib/http"
import StatCard from "../../components/StatCard.jsx"
import FullScreenLoading from "../../components/Loading.jsx"
import { formatVisit } from "../../lib/utils.js"
import StatCardClickable from "../../components/StatCardClickable.jsx"
import { RenderStatus } from "../../lib/renderStatus.jsx"
import { getRelationshipLabel } from "../../lib/getRelationshipLabel.js"

/* ================== TIME RANGE ================== */
const TIME_RANGE = {
  TODAY: "today",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
}

export default function ThongKePage() {
  const [stats, setStats] = useState(null)

  const [recentVisits, setRecentVisits] = useState([])
  const [unitStats, setUnitStats] = useState([])

  /* === card filter === */
  const [selectedRange, setSelectedRange] = useState(TIME_RANGE.MONTH)

  /* === popup soldier === */
  const [openSoldier, setOpenSoldier] = useState(null)
  const [soldierStats, setSoldierStats] = useState(null)
  const [soldierVisits, setSoldierVisits] = useState([])
    
  const [loadingSoldier, setLoadingSoldier] = useState(false)

  /* ================== INIT ================== */
  useEffect(() => {
    fetchStats()
    fetchUnitStats()
  }, [])

  useEffect(() => {
    fetchVisitsByRange()
  }, [selectedRange])

  /* ================== API ================== */
  const fetchStats = async () => {
    const res = await http.get("/stats")
    setStats(res.data)
  }

  const fetchVisitsByRange = async () => {
    const res = await http.get(`/visits?range=${selectedRange}`)
    setRecentVisits(res.data)
  }

  const fetchUnitStats = async () => {
    const res = await http.get("/stats/unit")
    setUnitStats(res.data)
  }

  /* ================== POPUP SOLDIER ================== */
  const openSoldierPopup = async (soldier) => {
    setOpenSoldier(soldier)
    setLoadingSoldier(true)

    try {
      const [statsRes, visitsRes] = await Promise.all([
        http.get(`/stats/soldier/${soldier._id}`),
        http.get(`/visits/soldier/${soldier._id}`),
      ])

      setSoldierStats(statsRes.data)
      setSoldierVisits(visitsRes.data)
    } finally {
      setLoadingSoldier(false)
    }
  }

  /* ================== STATUS BADGE ================== */
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-accent text-accent-foreground">
            <CheckCircle2 className="mr-1 h-5 w-5" />
            Đã duyệt
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="mr-1 h-5 w-5" />
            Chờ duyệt
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-5 w-5" />
            Từ chối
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const tableTitle = {
    today: "Lịch thăm hôm nay",
    week: "Lịch thăm tuần này",
    month: "Lịch thăm tháng này",
    year: "Tất cả lịch thăm",
  }

  if (!stats) return <FullScreenLoading />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <TopHeader />
      <Sidebar />

      <div className="ml-[200px] py-10">
        <main className="container mx-auto px-4">

          {/* ================= HEADER ================= */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Thống Kê Thăm Thân</h1>
            <p className="text-muted-foreground">
              Tổng quan và quản lý lịch thăm thân quân nhân
            </p>
          </div>

          {/* ================= STAT CARDS ================= */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCardClickable
              icon={<Calendar />}
              title="Hôm nay"
              value={stats.today}
              active={selectedRange === TIME_RANGE.TODAY}
              onClick={() => setSelectedRange(TIME_RANGE.TODAY)}
            />
            <StatCardClickable
              icon={<TrendingUp />}
              title="Tuần này"
              value={stats.thisWeek}
              active={selectedRange === TIME_RANGE.WEEK}
              onClick={() => setSelectedRange(TIME_RANGE.WEEK)}
            />
            <StatCardClickable
              icon={<BarChart3 />}
              title="Tháng này"
              value={stats.thisMonth}
              active={selectedRange === TIME_RANGE.MONTH}
              onClick={() => setSelectedRange(TIME_RANGE.MONTH)}
            />
            <StatCardClickable
              icon={<Users />}
              title="Tổng"
              value={stats.total}
              active={selectedRange === TIME_RANGE.YEAR}
              onClick={() => setSelectedRange(TIME_RANGE.YEAR)}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* ================= VISITS TABLE ================= */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{tableTitle[selectedRange]}</CardTitle>
                <CardDescription>Danh sách đăng ký thăm thân</CardDescription>
              </CardHeader>

              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Người thăm</TableHead>
                      <TableHead>Quân nhân</TableHead>
                      <TableHead>Đơn vị</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {recentVisits.map((v) => (
                      <TableRow key={v._id}>
                        <TableCell>{v.fullName}</TableCell>
                        <TableCell>
                          <button
                            onClick={() => openSoldierPopup(v.soldier)}
                            className="
                              inline-flex items-center gap-2
                              rounded-lg px-3 py-1.5
                              font-semibold text-yellow-600
                              bg-yellow-400/10
                              border border-yellow-400/30
                              hover:bg-yellow-400 hover:text-black
                              transition
                            "
                          >
                            {v.soldier.name}
                            <Eye className="h-4 w-4" />
                          </button>
                        </TableCell>
                        <TableCell>{v.unit}</TableCell>
                        <TableCell>{formatVisit(v.dateVisit, v.timeVisit)}</TableCell>
                        <TableCell>{getStatusBadge(v.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* ================= UNIT STATS ================= */}
            <Card>
              <CardHeader>
                <CardTitle>Thống kê theo đơn vị</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {unitStats.map((u, i) => {
                  const max = Math.max(...unitStats.map(x => x.count))
                  const percent = (u.count / max) * 100

                  return (
                    <div key={i}>
                      <div className="flex justify-between text-sm">
                        <span>{u.unit}</span>
                        <span className="font-semibold">{u.count}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-600"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* ================= POPUP SOLDIER ================= */}
      {openSoldier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                Thống kê thăm thân – {openSoldier.name}
              </h2>
              <button
                onClick={() => {
                  setOpenSoldier(null)
                  setSoldierStats(null)
                  setSoldierVisits([])
                }}
              >
                ✕
              </button>
            </div>

            {loadingSoldier ? (
              <FullScreenLoading />
            ) : (
              <>
                {soldierStats && (
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <StatCard icon={<Calendar />} title="Trong tháng" value={soldierStats.visitsThisMonth} />
                    <StatCard icon={<BarChart3 />} title="Trong năm" value={soldierStats.visitsThisYear} />
                  </div>
                )}

                <Table className="min-w-[1200px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Người thăm</TableHead>
                      <TableHead>CCCD</TableHead>
                      <TableHead>Quan hệ</TableHead>
                      <TableHead>Địa chỉ</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Số người</TableHead>
                      <TableHead>Mục đích</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {soldierVisits.map((v) => (
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

                        {/* Quan hệ */}
                        <TableCell>
                          {getRelationshipLabel(v.relationship)}
                        </TableCell>

                        {/* Địa chỉ */}
                        <TableCell className="max-w-[200px] truncate">
                          {v.address}
                        </TableCell>

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
                          {getStatusBadge
                            ? getStatusBadge(v.status)
                            : <RenderStatus status={v.status}></RenderStatus>}
                        </TableCell>
                      </TableRow>
                    ))}

                    {soldierVisits.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center text-muted-foreground py-6"
                        >
                          Không có dữ liệu thăm thân
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
