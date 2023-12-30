import React from "react"

import { ReadingList } from "./ReadingSection"

const loadReadings = (readingFormat, readingData) => {
  if (!readingData) return null
  const toReading = (title, reading) => ({ title, reading })
  const readings = []
  let includesPsalmsAndNt = true
  switch (readingFormat) {
    case "family":
      includesPsalmsAndNt = false
      if (readingData.family)
        readings.push(toReading("Daily Reading", [readingData.family]))
      break
    case "1":
      if (readingData.fullot)
        readings.push(toReading("Old Testament", [readingData.fullot]))
      break
    case "3:1":
      if (readingData.ot1)
        readings.push(toReading("Old Testament", [readingData.ot1]))
      break
    case "3:2":
      if (readingData.ot2)
        readings.push(toReading("Old Testament", [readingData.ot2]))
      break
    case "3:3":
      if (readingData.ot3)
        readings.push(toReading("Old Testament", [readingData.ot3]))
      break
    default:
      break
  }

  if (includesPsalmsAndNt && readingData.psalms)
    readings.push(toReading("Psalms", [readingData.psalms]))
  if (includesPsalmsAndNt && readingData.nt)
    readings.push(toReading("New Testament", [readingData.nt]))

  return readings
}

export function Readings({ data, loadedDay, planTimeframe }) {
  const readings = loadReadings(planTimeframe, data)

  return (
    <div className="content">
      <ReadingList readings={readings} loadedDay={loadedDay} />
    </div>
  )
}
