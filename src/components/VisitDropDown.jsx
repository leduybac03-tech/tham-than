import { Clock } from "lucide-react"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

export function VisitDropdown({ visits, loading }) {
    console.log(visits);
    
    return (
        <Card className="absolute right-0 top-12 w-[360px] shadow-xl rounded-xl border bg-white z-50">
            <div className="p-4 border-b">
                <h4 className="font-semibold text-sm">Lượt thăm chờ duyệt</h4>
            </div>

            {/* BODY */}
            <div className="max-h-[320px] overflow-y-auto">
                {loading && (
                    <div className="p-4 text-sm text-muted-foreground">
                        Đang tải dữ liệu...
                    </div>
                )}

                {!loading && visits.length === 0 && (
                    <div className="p-4 text-sm text-muted-foreground">
                        Không có lượt chờ duyệt
                    </div>
                )}

                {visits.map(v => (
                    <div
                        key={v._id}
                        className="p-4 border-b hover:bg-muted/40 transition"
                    >
                        <div className="flex justify-between items-start gap-3">
                            <div>
                                <p className="font-medium text-sm">{v.fullName}</p>
                                <p className="text-xs text-muted-foreground">
                                    Thăm: {v.soldier.name} – {v.soldier.unit}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(v.dateVisit).toLocaleDateString("vi-VN")} •{" "}
                                    {v.timeVisit}
                                </p>
                            </div>

                            <Badge
                                variant="outline"
                                className="flex items-center gap-1 h-fit"
                            >
                                <Clock className="h-3 w-3" />
                                Chờ duyệt
                            </Badge>
                        </div>
                    </div>
                ))}
            </div>

            {/* FOOTER */}
            <div className="p-3 border-t">
                <Link to="/admin/visits">
                    <Button variant="outline" className="w-full text-sm">
                        Xem tất cả
                    </Button>
                </Link>
            </div>
        </Card>
    )
}
