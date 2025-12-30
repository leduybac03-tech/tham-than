import { useEffect, useState } from "react"
import { http } from "../lib/http"

export function usePendingVisitList() {
    const [visits, setVisits] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchPendingVisits = async () => {
        try {
            setLoading(true)
            const res = await http.get(
                "visits/status/pending?limit=5"
            )
            setVisits(res.data || [])
        } catch (err) {
            console.error("Lỗi lấy danh sách pending", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPendingVisits()
    }, [])

    return { visits, loading, refetch: fetchPendingVisits }
}
