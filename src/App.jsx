import React, { useState } from "react";
import { connect } from "react-redux";
import AppBar from "@mui/material/AppBar";
import moment from "moment";

import { loadDay, loadPlanType } from "./actions/data";
import { TitleBar } from "./components/TitleBar";
import { Readings } from "./components/Readings";
import { Info } from "./components/Info";
import { BottomBar } from "./components/BottomBar";

import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";

// import makeStyles from '@mui/styles/makeStyles';

const theme = createTheme();

// const useStyles = makeStyles((theme) => {
//   root: {
//     // some CSS that accesses the theme
//   }
// });

import "./App.css";

function App(props) {
  // const classes = useStyles();

  const { data, loadDay, loadPlanType, planTimeframe } = props;
  const [dayChanged, setDayChanged] = useState(true);
  const [showConfig, setShowConfig] = useState(false);
  const [loadedDay, setLoadedDay] = useState(moment());
  if (dayChanged) {
    loadDay(loadedDay);
    loadPlanType(localStorage.getItem("readDaily-planType") || "1");
    setDayChanged(false);
  }

  const changeDay = (day) => {
    setDayChanged(true);
    setLoadedDay(day);
  };
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
  );
}

const mapStateToProps = (state) => ({
  data: state.data.readingPlan || {},
  planTimeframe: state.data.readingPlanType || "1",
});

const mapDispatchToProps = (dispatch) => ({
  loadDay: (date) => dispatch(loadDay(date)),
  loadPlanType: (planType) => dispatch(loadPlanType(planType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
