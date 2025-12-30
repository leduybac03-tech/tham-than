import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/tabel.jsx"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card.jsx"
import { Eye } from "lucide-react"
import { formatVisit } from "../lib/utils"

export default function RecentVisitsTable({
  title,
  visits,
  onSoldierClick,
  getStatusBadge,
}) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
            {visits.map((v) => (
              <TableRow key={v._id}>
                <TableCell>{v.fullName}</TableCell>

                <TableCell>
                  <button
                    onClick={() => onSoldierClick(v.soldier)}
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
  )
}
