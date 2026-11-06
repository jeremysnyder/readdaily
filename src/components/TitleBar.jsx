import ArrowBack from "@mui/icons-material/ArrowBack"
import ArrowForward from "@mui/icons-material/ArrowForward"
import Close from "@mui/icons-material/Close"
import Info from "@mui/icons-material/Info"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import React from "react"
import { formatTitleDate, useReading } from "../context/ReadingContext"

function ReadingTitle() {
  const { loadedDay } = useReading()
  return (
    <div className="title">
      <Typography variant="h5" className="title-date">
        {formatTitleDate(loadedDay)}
      </Typography>
    </div>
  )
}

function InfoTitle() {
  return (
    <div className="title">
      <Typography variant="h5" className="title-date">
        About Read Daily
      </Typography>
    </div>
  )
}

export function ReadingTitleBar() {
  const { prevDay, nextDay } = useReading()
  return (
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="previous day"
        onClick={prevDay}
        size="large"
      >
        <ArrowBack />
      </IconButton>
      <ReadingTitle />
      <IconButton
        edge="end"
        color="inherit"
        aria-label="next day"
        onClick={nextDay}
        size="large"
      >
        <ArrowForward />
      </IconButton>
    </Toolbar>
  )
}

export function InfoTitleBar() {
  const { setShowConfig } = useReading()
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="info" size="large">
        <Info />
      </IconButton>
      <InfoTitle />
      <IconButton
        edge="end"
        color="inherit"
        aria-label="close"
        onClick={() => setShowConfig(false)}
        size="large"
      >
        <Close />
      </IconButton>
    </Toolbar>
  )
}

export function TitleBar() {
  const { showConfig } = useReading()
  return showConfig ? <InfoTitleBar /> : <ReadingTitleBar />
}
