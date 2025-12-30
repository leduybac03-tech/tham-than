function getUnitCode(unit) {
  if (!unit) return "CXX"

  // Lấy số trong chuỗi (7, 8, 9...)
  const match = unit.match(/\d+/)

  if (match) {
    return `C${match[0]}`
  }

  // Trường hợp đặc biệt
  if (unit.toLowerCase().includes("trung đội")) {
    return "TT"
  }

  return "CXX"
}
export function generateVisitCode(unit, dateVisit) {
  const unitCode = getUnitCode(unit)

  if (!dateVisit) return ""

  // dateVisit: "YYYY-MM-DD"
  const [year, month, day] = dateVisit.split("-")

  const random2 = Math.floor(10 + Math.random() * 90)

  return `${unitCode}-${day}/${month}-${random2}`
}
