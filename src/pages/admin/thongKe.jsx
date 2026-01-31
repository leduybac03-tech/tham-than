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
  const [openSidebar, setOpenSidebar] = useState(false)

  const [stats, setStats] = useState(null)
  const [recentVisits, setRecentVisits] = useState([])
  const [unitStats, setUnitStats] = useState([])

  const [selectedRange, setSelectedRange] = useState(TIME_RANGE.MONTH)

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

  /* ================== SOLDIER POPUP ================== */
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-accent text-accent-foreground">
            <CheckCircle2 className="mr-1 h-4 w-4" />
            Đã duyệt
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="mr-1 h-4 w-4" />
            Chờ duyệt
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-4 w-4" />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header + Sidebar */}
      <TopHeader onMenuClick={() => setOpenSidebar(true)} />
      <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />

      {/* CONTENT */}
      <div className="pt-16 md:ml-[16.666667%] px-4 md:px-6 py-10">
        <main className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Thống Kê Thăm Thân</h1>
            <p className="text-muted-foreground">
              Tổng quan và quản lý lịch thăm thân quân nhân
            </p>
          </div>

          {/* STAT CARDS */}
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
            {/* VISITS TABLE */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{tableTitle[selectedRange]}</CardTitle>
                <CardDescription>Danh sách đăng ký thăm thân</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
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
                            className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 font-semibold text-yellow-700 bg-yellow-400/10 border hover:bg-yellow-400 hover:text-black transition"
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

            {/* UNIT STATS */}
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
    </div>
  )
}
