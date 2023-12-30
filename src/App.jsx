import AppBar from "@mui/material/AppBar"
import moment from "moment"
import React, { useState } from "react"
import { connect } from "react-redux"

import { loadDay, loadPlanType } from "./actions/data"
import { BottomBar } from "./components/BottomBar"
import { Info } from "./components/Info"
import { Readings } from "./components/Readings"
import { TitleBar } from "./components/TitleBar"

import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles"

import "./App.css"

const theme = createTheme()

function App(props) {
  const { data, loadDay, loadPlanType, planTimeframe } = props
  const [dayChanged, setDayChanged] = useState(true)
  const [showConfig, setShowConfig] = useState(false)
  const [loadedDay, setLoadedDay] = useState(moment())
  if (dayChanged) {
    loadDay(loadedDay)
    loadPlanType(localStorage.getItem("readDaily-planType") || "1")
    setDayChanged(false)
  }

  const changeDay = (day) => {
    setDayChanged(true)
    setLoadedDay(day)
  }
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="app">
          <AppBar position="static">
            <TitleBar
              loadedDay={loadedDay}
              changeDay={changeDay}
              showConfig={showConfig}
              onInfoClick={() => setShowConfig(true)}
              onInfoClose={() => setShowConfig(false)}
            />
          </AppBar>
          {showConfig ? (
            <Info />
          ) : (
            <Readings
              data={data}
              loadedDay={loadedDay}
              loadPlanType={loadPlanType}
              planTimeframe={planTimeframe}
            />
          )}
          <BottomBar plan={planTimeframe} updatePlanTimeframe={loadPlanType} />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

const mapStateToProps = (state) => ({
  data: state.data.readingPlan || {},
  planTimeframe: state.data.readingPlanType || "1",
})

const mapDispatchToProps = (dispatch) => ({
  loadDay: (date) => dispatch(loadDay(date)),
  loadPlanType: (planType) => dispatch(loadPlanType(planType)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
