import React from 'react'

import { ReadingList } from './ReadingSection'
import { BottomBar } from './BottomBar'

const loadReadings = (readingFormat, readingData) => {
  if (!readingData) return null
  const toReading = (title, reading) => ({ title, reading })
  const readings = []
  switch (readingFormat) {
    case '1':
      if (readingData.history1) readings.push(toReading('History 1', readingData.history1))
      if (readingData.history2) readings.push(toReading('History 2', readingData.history2))
      break
    case '2:1':
      if (readingData.history1) readings.push(toReading('History', readingData.history1))
      break
    case '2:2':
      if (readingData.history2) readings.push(toReading('History', readingData.history2))
      break
    default:
      break
  }

  if (readingData.wisdom) readings.push(toReading('Wisdom', readingData.wisdom))
  if (readingData.nt) readings.push(toReading('New Testament', readingData.nt))

  return readings
}

export function Readings(props) {
  const { data, loadedDay, loadPlanType, planTimeframe } = props
  const readings = loadReadings(planTimeframe, data)

  return (
    <div className='page'>
      <ReadingList readings={readings} loadedDay={loadedDay} />
      <BottomBar plan={planTimeframe} updatePlanTimeframe={loadPlanType} />
    </div>
  )
}
