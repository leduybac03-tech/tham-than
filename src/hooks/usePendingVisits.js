import { useEffect, useState } from "react"
import { http } from "../lib/http"

export function usePendingVisits() {
    const [pending, setPending] = useState(0)

    useEffect(() => {
        const fetchPending = async () => {
            try {
                const res = await http.get("/stats")
                setPending(res.data.pending || 0)
            } catch (err) {
                console.error("Lỗi lấy số lượt chờ duyệt", err)
            }
        }

        fetchPending()
    }, [])

    return pending
}
