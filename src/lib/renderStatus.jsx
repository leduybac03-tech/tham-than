import { CheckCircle2, Clock, XCircle } from "lucide-react"
import { Badge } from "../components/ui/badge"



export const RenderStatus = ({ status }) => {
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