import { isWeekend, useReading } from "../context/ReadingContext"
import { LibraryBooksIcon } from "./icons"

const OT_KEY_BY_PLAN = {
  1: "fullot",
  "3:1": "ot1",
  "3:2": "ot2",
  "3:3": "ot3",
}

const loadReadings = (readingFormat, readingData) => {
  if (!readingData) return []
  if (readingFormat === "family") {
    return readingData.family
      ? [{ title: "Daily Reading", reading: readingData.family }]
      : []
  }
  const readings = []
  const otKey = OT_KEY_BY_PLAN[readingFormat]
  if (otKey && readingData[otKey]) {
    readings.push({ title: "Old Testament", reading: readingData[otKey] })
  }
  if (readingData.psalms) {
    readings.push({ title: "Psalms", reading: readingData.psalms })
  }
  if (readingData.nt) {
    readings.push({ title: "New Testament", reading: readingData.nt })
  }
  return readings
}

const openReading = (passages) => {
  const url = `https://www.esv.org/${passages
    .map((x) => window.encodeURIComponent(x.reading))
    .join(";")}/`
  window.open(url, "_blank")
}

export function Readings() {
  const { data, loadedDay, planTimeframe } = useReading()
  const readings = loadReadings(planTimeframe, data)

  return (
    <div className="content">
      <div className="content-inner">
        {readings.length ? (
          <div>
            {readings.map((item) => (
              <div key={item.title} className="card reading">
                <div className="reading-header">{item.title}</div>
                <div className="reading-body">
                  <span className="reading-passage">{item.reading}</span>
                  <button
                    type="button"
                    className="btn-contained read-button"
                    onClick={() => openReading([item])}
                  >
                    <LibraryBooksIcon size={20} className="btn-start-icon" />
                    Read
                  </button>
                </div>
              </div>
            ))}
            <div className="reading-actions-row">
              <button
                type="button"
                className="btn-contained read-all-button"
                onClick={() => openReading(readings)}
              >
                <LibraryBooksIcon size={20} className="btn-start-icon" />
                Read All
              </button>
            </div>
          </div>
        ) : (
          <div className="card reading">
            <div className="reading-header">No readings today</div>
            {loadedDay && isWeekend(loadedDay) ? (
              <div className="reading-body">
                Consider meditating on other readings, sermon texts, or catching
                up on last week's readings...
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}
