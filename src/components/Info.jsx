import { ACCENT_COLORS, useReading } from "../context/ReadingContext"
import {
  CheckIcon,
  DarkModeIcon,
  LightModeIcon,
  SettingsBrightnessIcon,
} from "./icons"

export function Info() {
  const { themeMode, updateThemeMode, accentColor, updateAccentColor } =
    useReading()

  return (
    <div className="content">
      <div className="content-inner">
        <div className="paper-elevated info-card">
          <div className="info-row">
            <div className="info-subtitle">Appearance</div>
            <div className="toggle-group" role="group" aria-label="theme mode">
              <button
                type="button"
                className={`toggle-button${themeMode === "system" ? " is-selected" : ""}`}
                aria-label="system theme"
                aria-pressed={themeMode === "system"}
                onClick={() => updateThemeMode("system")}
              >
                <SettingsBrightnessIcon size={20} className="toggle-icon" />
                Device
              </button>
              <button
                type="button"
                className={`toggle-button${themeMode === "light" ? " is-selected" : ""}`}
                aria-label="light theme"
                aria-pressed={themeMode === "light"}
                onClick={() => updateThemeMode("light")}
              >
                <LightModeIcon size={20} className="toggle-icon" />
                Light
              </button>
              <button
                type="button"
                className={`toggle-button${themeMode === "dark" ? " is-selected" : ""}`}
                aria-label="dark theme"
                aria-pressed={themeMode === "dark"}
                onClick={() => updateThemeMode("dark")}
              >
                <DarkModeIcon size={20} className="toggle-icon" />
                Dark
              </button>
            </div>
          </div>
          <div className="info-row info-row-spaced">
            <div className="info-subtitle">Accent Color</div>
            <div className="swatch-list">
              {Object.entries(ACCENT_COLORS).map(([key, cfg]) => {
                const selected = accentColor === key
                return (
                  <button
                    key={key}
                    type="button"
                    aria-label={cfg.label}
                    onClick={() => updateAccentColor(key)}
                    className="swatch-button"
                    style={{
                      backgroundColor: cfg.main,
                      border: selected
                        ? "2px solid currentColor"
                        : "2px solid transparent",
                      boxShadow: selected
                        ? `0 0 0 2px ${cfg.main}`
                        : "0 1px 3px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {selected ? <CheckIcon size={20} /> : null}
                  </button>
                )
              })}
            </div>
          </div>

          <hr className="divider" />

          <div className="info-header-row">
            <h3 className="info-heading">Read Daily</h3>
            <span className="info-caption">Version 2026.0</span>
          </div>

          <p className="info-body1">
            Read Daily provides a systematic and sustainable path through the
            Scriptures, with weekday readings that leave weekends free for
            catching up, sermon reflection, or deeper study. Choose a reading
            plan from the selector at the bottom of your screen:
          </p>

          <div className="info-subtitle info-section-title">
            1-Year & 3-Year Plans
          </div>
          <p className="info-body2">
            Read the Psalms twice and the New Testament once each year. The Old
            Testament is divided into three tracks—read all three together to
            complete the entire Bible in a single year, or follow one track per
            year to read through the Old Testament over three years.
          </p>

          <div className="info-subtitle info-section-title">
            Family Readings
          </div>
          <p className="info-body2 info-body2-last">
            A single chapter each weekday offering a guided overview of the
            Bible in a year—moving through Old Testament narratives, Psalms,
            and the Prophets into the Gospels, Acts, Epistles, and Revelation.
          </p>

          <hr className="divider" />

          <p className="info-caption info-footer">
            Scripture reading links open{" "}
            <a
              className="info-link"
              href="https://www.esv.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              ESV.org
            </a>
            . The ESV® Bible (The Holy Bible, English Standard Version®), © 2001
            by Crossway, a publishing ministry of Good News Publishers. ESV Text
            Edition: 2025. All rights reserved. Read Daily is an independent
            tool and is not affiliated with or endorsed by Crossway.
          </p>
        </div>
      </div>
    </div>
  )
}
