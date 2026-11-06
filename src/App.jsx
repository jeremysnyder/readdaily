import AppBar from "@mui/material/AppBar"
import CssBaseline from "@mui/material/CssBaseline"
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles"
import React, { useMemo } from "react"

import { BottomBar } from "./components/BottomBar"
import { Info } from "./components/Info"
import { Readings } from "./components/Readings"
import { TitleBar } from "./components/TitleBar"
import { useReading } from "./context/ReadingContext"

import "./App.css"

export default function App() {
  const { showConfig, resolvedTheme } = useReading()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedTheme,
          primary: {
            main: "#1976d2",
            light: "#42a5f5",
            dark: "#1565c0",
            contrastText: "#ffffff",
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
        },
      }),
    [resolvedTheme]
  )

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <AppBar position="static" className="app-header" enableColorOnDark>
            <TitleBar />
          </AppBar>
          {showConfig ? <Info /> : <Readings />}
          <BottomBar />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
