import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import React from "react"

export function BottomBar(props) {
  const { plan, updatePlanTimeframe } = props
  const planTimeframeOptions = {
    1: "All In 1 Year",
    "3:1": "3yr Plan - Year 1",
    "3:2": "3yr Plan - Year 2",
    "3:3": "3yr Plan - Year 3",
    family: "Family Readings",
  }

  return (
    <div className="bottom-bar">
      <FormControl variant="standard">
        <Select
          variant="standard"
          value={plan}
          onChange={(event) => updatePlanTimeframe(event.target.value)}
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
    </div>
  )
}
