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
import { ACCENT_COLORS, useReading } from "./context/ReadingContext"

import "./App.css"

export default function App() {
  const { showConfig, resolvedTheme, accentColor } = useReading()

  const theme = useMemo(() => {
    const primary = ACCENT_COLORS[accentColor] || ACCENT_COLORS.gray
    return createTheme({
      palette: {
        mode: resolvedTheme,
        primary: {
          main: primary.main,
          light: primary.light,
          dark: primary.dark,
          contrastText: primary.contrastText,
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
    })
  }, [resolvedTheme, accentColor])

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
