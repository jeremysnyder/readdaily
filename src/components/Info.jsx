import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness"
import Divider from "@mui/material/Divider"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Typography from "@mui/material/Typography"
import React from "react"
import { useReading } from "../context/ReadingContext"

export function Info() {
  const { themeMode, updateThemeMode } = useReading()

  return (
    <div className="content">
      <div className="content-inner">
        <Paper style={{ margin: 10, padding: 15 }} elevation={3}>
          <Typography variant="h5" component="h3" gutterBottom>
            Read Daily Version 2026.0
          </Typography>
          <Typography variant="body1" gutterBottom>
            This plan provides a path through the Scriptures that is systematic
            and sustainable.
          </Typography>
          <Typography variant="body1" gutterBottom>
            The Psalms are read twice and the New Testament once in each year.
          </Typography>
          <Typography variant="body1" gutterBottom>
            The Old Testament is divided into three portions, allowing it to be
            read in 1-3 years.
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>
              <i>The Family Reading Plan:</i>
            </b>
            <br />
            An overview of the Bible in a year, with selections from OT
            narratives, psalms, prophecy, then portions of the Gospels, Acts, a
            few epistles, and selections from Revelation. Each day has a single
            chapter that a family could read together. Select the Family
            Readings option from the selections at the bottom of your screen.
          </Typography>
          <Divider style={{ margin: "12px 0" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Appearance
            </Typography>
            <ToggleButtonGroup
              value={themeMode}
              exclusive
              onChange={(_, nextMode) => {
                if (nextMode !== null) updateThemeMode(nextMode)
              }}
              size="small"
              color="primary"
              aria-label="theme mode"
            >
              <ToggleButton value="system" aria-label="system theme">
                <SettingsBrightnessIcon
                  fontSize="small"
                  style={{ marginRight: 6 }}
                />
                Device
              </ToggleButton>
              <ToggleButton value="light" aria-label="light theme">
                <LightModeIcon fontSize="small" style={{ marginRight: 6 }} />
                Light
              </ToggleButton>
              <ToggleButton value="dark" aria-label="dark theme">
                <DarkModeIcon fontSize="small" style={{ marginRight: 6 }} />
                Dark
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <Divider style={{ margin: "12px 0" }} />
          <Typography variant="body2" color="text.secondary">
            Scripture reading links open{" "}
            <Link
              href="https://www.esv.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              ESV.org
            </Link>
            . The ESV® Bible (The Holy Bible, English Standard Version®), © 2001
            by Crossway, a publishing ministry of Good News Publishers. ESV®
            Text Edition: 2016. All rights reserved. Read Daily is an
            independent tool and is not affiliated with or endorsed by Crossway.
          </Typography>
        </Paper>
      </div>
    </div>
  )
}
