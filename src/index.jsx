import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { ReadingProvider } from "./context/ReadingContext"
import "./index.css"

const root = createRoot(document.getElementById("root"))
root.render(
  <ReadingProvider>
    <App />
  </ReadingProvider>
)
