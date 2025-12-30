import * as React from "react"
import { cn } from "../../lib/utils"

/* ================= TABLE WRAPPER ================= */

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-x-auto">
    <table
      ref={ref}
      className={cn(
        "w-full min-w-max caption-bottom text-sm border-collapse",
        className
      )}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

/* ================= HEADER ================= */

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "[&_tr]:border-b bg-green-50 sticky top-0 z-10",
      className
    )}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

/* ================= BODY ================= */

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

/* ================= FOOTER ================= */

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

/* ================= ROW ================= */

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

/* ================= HEAD CELL ================= */

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

/* ================= BODY CELL ================= */

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle", className)}
    {...props}
  />
))
TableCell.displayName = "TableCell"

/* ================= CAPTION ================= */

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

/* ================= EXPORT ================= */

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
