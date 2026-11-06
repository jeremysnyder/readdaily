import CheckIcon from "@mui/icons-material/Check"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Typography from "@mui/material/Typography"
import React from "react"
import { ACCENT_COLORS, useReading } from "../context/ReadingContext"

export function Info() {
  const { themeMode, updateThemeMode, accentColor, updateAccentColor } =
    useReading()

  return (
    <div className="content">
      <div className="content-inner">
        <Paper style={{ margin: 10, padding: 16 }} elevation={3}>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 10,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Accent Color
            </Typography>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {Object.entries(ACCENT_COLORS).map(([key, cfg]) => {
                const selected = accentColor === key
                return (
                  <IconButton
                    key={key}
                    aria-label={cfg.label}
                    onClick={() => updateAccentColor(key)}
                    style={{
                      width: 32,
                      height: 32,
                      padding: 0,
                      borderRadius: "50%",
                      backgroundColor: cfg.main,
                      color: "#ffffff",
                      border: selected
                        ? "2px solid currentColor"
                        : "2px solid transparent",
                      boxShadow: selected
                        ? `0 0 0 2px ${cfg.main}`
                        : "0 1px 3px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {selected ? <CheckIcon fontSize="small" /> : null}
                  </IconButton>
                )
              })}
            </div>
          </div>

          <Divider style={{ margin: "14px 0" }} />

          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 6,
            }}
          >
            <Typography variant="h6" component="h3" fontWeight="bold">
              Read Daily
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Version 2026.0
            </Typography>
          </div>

          <Typography variant="body1" paragraph style={{ marginBottom: 12 }}>
            Read Daily provides a systematic and sustainable path through the
            Scriptures, with weekday readings that leave weekends free for
            catching up, sermon reflection, or deeper study. Choose a reading
            plan from the selector at the bottom of your screen:
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight="bold"
            style={{ marginBottom: 2 }}
          >
            1-Year & 3-Year Plans
          </Typography>
          <Typography variant="body2" paragraph style={{ marginBottom: 12 }}>
            Read the Psalms twice and the New Testament once each year. The Old
            Testament is divided into three tracks—read all three together to
            complete the entire Bible in a single year, or follow one track per
            year to read through the Old Testament over three years.
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight="bold"
            style={{ marginBottom: 2 }}
          >
            Family Readings
          </Typography>
          <Typography variant="body2" paragraph style={{ marginBottom: 4 }}>
            A single chapter each weekday offering a guided overview of the
            Bible in a year—moving through Old Testament narratives, Psalms,
            and the Prophets into the Gospels, Acts, Epistles, and Revelation.
          </Typography>

          <Divider style={{ margin: "14px 0" }} />

          <Typography variant="caption" color="text.secondary" component="p">
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
