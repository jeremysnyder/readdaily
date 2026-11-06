import fs from "node:fs"
import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

function parseReadingPlanCsv(csvContent) {
  const lines = csvContent.split(/\r?\n/).filter((line) => line.trim() !== "")
  if (lines.length === 0) return {}

  const headers = lines[0].split(",").map((h) => h.trim())
  const readings = {}
  let readingNumber = 0

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",")
    const row = {}
    headers.forEach((header, idx) => {
      row[header] = (values[idx] || "").trim()
    })

    const hasReadings =
      row["OT1"] ||
      row["OT2"] ||
      row["OT3"] ||
      row["Full OT"] ||
      row["Psalms"] ||
      row["NT"]

    if (hasReadings) {
      readingNumber += 1
      const entry = {}
      if (row["Family"]) entry.family = row["Family"]
      if (row["OT1"]) entry.ot1 = row["OT1"]
      if (row["OT2"]) entry.ot2 = row["OT2"]
      if (row["OT3"]) entry.ot3 = row["OT3"]
      if (row["Full OT"]) entry.fullot = row["Full OT"]
      if (row["Psalms"]) entry.psalms = `Psalms ${row["Psalms"]}`
      if (row["NT"]) entry.nt = row["NT"]
      readings[String(readingNumber)] = entry
    }
  }

  return readings
}

function readingPlanPlugin() {
  const virtualModuleId = "virtual:reading-plan"
  const resolvedVirtualModuleId = "\0" + virtualModuleId
  const csvPath = path.resolve(
    import.meta.dirname,
    "data/readers.plan.csv"
  )

  return {
    name: "reading-plan-csv",
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        this.addWatchFile(csvPath)
        const csvContent = fs.readFileSync(csvPath, "utf-8")
        const planData = parseReadingPlanCsv(csvContent)
        return `export default ${JSON.stringify(planData)};`
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), readingPlanPlugin()],
  server: {
    port: 3000,
  },
})
