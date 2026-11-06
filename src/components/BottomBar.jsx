import Info from "@mui/icons-material/Info"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import React from "react"
import { useReading } from "../context/ReadingContext"

const planTimeframeOptions = {
  1: "All In 1 Year",
  "3:1": "3yr Plan - Year 1",
  "3:2": "3yr Plan - Year 2",
  "3:3": "3yr Plan - Year 3",
  family: "Family Readings",
}

export function BottomBar() {
  const { planTimeframe, loadPlanType, showConfig, setShowConfig } =
    useReading()

  return (
    <div className="bottom-bar">
      <div className="bottom-bar-inner">
        <FormControl variant="standard" className="bottom-bar-form">
          <Select
            variant="standard"
            value={planTimeframe}
            onChange={(event) => loadPlanType(event.target.value)}
            className="bottom-bar-select"
          >
            <MenuItem value="" disabled>
              Reading Plan
            </MenuItem>
            {Object.keys(planTimeframeOptions).map((x) => (
              <MenuItem key={x} value={x}>
                {planTimeframeOptions[x]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          endIcon={<Info />}
          onClick={() => setShowConfig(!showConfig)}
          className="info-button"
        >
          Read Daily
        </Button>
      </div>
    </div>
  )
}
