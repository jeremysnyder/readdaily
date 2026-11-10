import { formatTitleDate, useReading } from "../context/ReadingContext"
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CloseIcon,
  InfoIcon,
} from "./icons"

export function TitleBar() {
  const { loadedDay, prevDay, nextDay, showConfig, setShowConfig } =
    useReading()

  if (showConfig) {
    return (
      <div className="toolbar">
        <button
          type="button"
          className="icon-button icon-button-start"
          aria-label="info"
        >
          <InfoIcon />
        </button>
        <div className="title">
          <div className="title-date">About Read Daily</div>
        </div>
        <button
          type="button"
          className="icon-button icon-button-end"
          aria-label="close"
          onClick={() => setShowConfig(false)}
        >
          <CloseIcon />
        </button>
      </div>
    )
  }

  return (
    <div className="toolbar">
      <button
        type="button"
        className="icon-button icon-button-start"
        aria-label="previous day"
        onClick={prevDay}
      >
        <ArrowBackIcon />
      </button>
      <div className="title">
        <div className="title-date">{formatTitleDate(loadedDay)}</div>
      </div>
      <button
        type="button"
        className="icon-button icon-button-end"
        aria-label="next day"
        onClick={nextDay}
      >
        <ArrowForwardIcon />
      </button>
    </div>
  )
}
