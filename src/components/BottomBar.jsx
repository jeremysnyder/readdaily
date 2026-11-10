import { useEffect, useRef, useState } from "react"
import { useReading } from "../context/ReadingContext"
import { ArrowDropDownIcon, InfoIcon } from "./icons"

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
  const [menuOpen, setMenuOpen] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    const handlePointerDown = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [menuOpen])

  return (
    <div className="bottom-bar">
      <div className="bottom-bar-inner">
        <div className="bottom-bar-form" ref={formRef}>
          <button
            type="button"
            className={`bottom-bar-select${menuOpen ? " is-open" : ""}`}
            aria-haspopup="listbox"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="bottom-bar-select-label">
              {planTimeframeOptions[planTimeframe] || planTimeframeOptions["1"]}
            </span>
            <ArrowDropDownIcon className="bottom-bar-select-icon" />
          </button>
          {menuOpen ? (
            <ul className="select-menu" role="listbox" aria-label="Reading Plan">
              <li
                className="select-menu-item is-disabled"
                role="option"
                aria-disabled="true"
              >
                Reading Plan
              </li>
              {Object.entries(planTimeframeOptions).map(([key, label]) => {
                const selected = key === planTimeframe
                return (
                  <li
                    key={key}
                    role="option"
                    aria-selected={selected}
                    className={`select-menu-item${selected ? " is-selected" : ""}`}
                    onClick={() => {
                      loadPlanType(key)
                      setMenuOpen(false)
                    }}
                  >
                    {label}
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => setShowConfig(!showConfig)}
          className="btn-contained info-button"
        >
          Read Daily
          <InfoIcon size={20} className="btn-end-icon" />
        </button>
      </div>
    </div>
  )
}
