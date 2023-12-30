import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import React from "react"
import { isWeekend } from "../actions/data"

const openReading = (passages) => {
  const url = `http://esv.org/${passages
    .map((x) => window.encodeURIComponent(x.reading))
    .join(";")}/`
  window.open(url, "_blank")
}

function NoReading(props) {
  const { loadedDay } = props
  return (
    <Card className="reading">
      <CardHeader
        title="No readings today"
        disableTypography={true}
        className="reading-header"
      />
      {loadedDay && isWeekend(loadedDay.day()) ? (
        <CardContent className="reading-body">
          Consider meditating on other readings, sermon texts, or catching up on
          last week's readings...
        </CardContent>
      ) : null}
    </Card>
  )
}

function Reading(props) {
  const { title, reading } = props
  return (
    <Card className="reading">
      <CardHeader
        title={title}
        disableTypography={true}
        className="reading-header"
      />
      <CardActions className="reading-body">
        {reading.join(", ")}
        <ReadButton reading={reading} />
      </CardActions>
    </Card>
  )
}

function ReadButton(props) {
  const { reading } = props
  return (
    <Button
      variant="contained"
      startIcon={<LibraryBooksIcon />}
      style={{ marginLeft: "auto" }}
      onClick={openReading.bind(null, [{ reading }])}
    >
      Read
    </Button>
  )
}

function ReadAllSection(props) {
  const { readings } = props
  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <Button
        variant="contained"
        startIcon={<LibraryBooksIcon />}
        onClick={openReading.bind(null, readings)}
      >
        Read All Passages
      </Button>
    </div>
  )
}

export function ReadingList(props) {
  const { readings, loadedDay } = props
  return readings && readings.length ? (
    <div>
      {readings.map((x) => (
        <Reading key={x.title} title={x.title} reading={x.reading} />
      ))}
      <ReadAllSection readings={readings} />
    </div>
  ) : (
    <NoReading loadedDay={loadedDay} />
  )
}
