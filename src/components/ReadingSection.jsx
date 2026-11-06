import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import CircularProgress from "@mui/material/CircularProgress"
import React from "react"
import { isWeekend, useReading } from "../context/ReadingContext"

const openReading = (passages) => {
  const url = `https://www.esv.org/${passages
    .map((x) => window.encodeURIComponent(x.reading))
    .join(";")}/`
  window.open(url, "_blank")
}

function NoReading() {
  const { loadedDay } = useReading()
  return (
    <Card className="reading">
      <CardHeader
        title="No readings today"
        disableTypography={true}
        className="reading-header"
      />
      {loadedDay && isWeekend(loadedDay) ? (
        <CardContent className="reading-body">
          Consider meditating on other readings, sermon texts, or catching up on
          last week's readings...
        </CardContent>
      ) : null}
    </Card>
  )
}

function Reading({ title, reading }) {
  return (
    <Card className="reading">
      <CardHeader
        title={title}
        disableTypography={true}
        className="reading-header"
      />
      <CardActions className="reading-body">
        <span className="reading-passage">{reading.join(", ")}</span>
        <ReadButton reading={reading} />
      </CardActions>
    </Card>
  )
}

function ReadButton({ reading }) {
  return (
    <Button
      variant="contained"
      startIcon={<LibraryBooksIcon />}
      style={{ marginLeft: "auto" }}
      onClick={() => openReading([{ reading }])}
    >
      Read
    </Button>
  )
}

function ReadAllSection({ readings }) {
  return (
    <div className="reading-actions-row">
      <Button
        variant="contained"
        startIcon={<LibraryBooksIcon />}
        onClick={() => openReading(readings)}
        className="read-all-button"
      >
        Read All
      </Button>
    </div>
  )
}

export function ReadingList({ readings }) {
  const { loading } = useReading()

  if (loading || !readings) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 40,
        }}
      >
        <CircularProgress size={48} />
      </div>
    )
  }

  return readings.length ? (
    <div>
      {readings.map((x) => (
        <Reading key={x.title} title={x.title} reading={x.reading} />
      ))}
      <ReadAllSection readings={readings} />
    </div>
  ) : (
    <NoReading />
  )
}
