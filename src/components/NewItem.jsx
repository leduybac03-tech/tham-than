import { ArrowRight, NewspaperIcon } from "lucide-react";

export function NewsItem({ date, title, tag = "THÔNG BÁO" }) {
    return (
        <div
            className="
        group
        relative
        border-l-4 border-red-700
        bg-white/60 dark:bg-muted/40
        rounded-md
        p-4
        transition
        hover:bg-red-50/80
        hover:shadow-md
        cursor-pointer
      "
        >
            {/* TAG */}
            <span
                className="
          absolute -top-2 left-4
          bg-red-700 text-white
          text-xs font-bold
          px-2 py-0.5
          rounded
        "
            >
                {tag}
            </span>

            {/* DATE */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <NewspaperIcon className="h-4 w-4 text-red-700" />
                {date}
            </div>

            {/* TITLE */}
            <h4
                className="
          font-bold
          leading-snug
          text-foreground
          transition
          group-hover:text-red-700
        "
            >
                {title}
            </h4>

            {/* ARROW */}
            <div className="mt-2 flex items-center text-sm text-red-700 opacity-0 group-hover:opacity-100 transition">
                Xem chi tiết
                <ArrowRight className="ml-1 h-4 w-4" />
            </div>
        </div>
    )
}