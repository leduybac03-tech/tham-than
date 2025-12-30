export default function StatCardClickable({ icon, title, value, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer rounded-xl border p-4 transition-all
        ${active
          ? "border-yellow-500 bg-yellow-50 shadow-md"
          : "hover:shadow-md hover:border-muted"}
      `}
    >
      <div className="flex items-center gap-3">
        <div className="text-yellow-600">{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  )
}
