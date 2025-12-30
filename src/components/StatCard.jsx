import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

/* ===== STAT CARD ===== */
export default function StatCard({ icon, title, value }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-600/10">
            {icon}
          </div>
          {title}
        </CardDescription>
        <CardTitle className="text-3xl font-bold">{value}</CardTitle>
      </CardHeader>
    </Card>
  )
}