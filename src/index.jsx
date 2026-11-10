import { createRoot } from "react-dom/client"
import App from "./App"
import { ReadingProvider } from "./context/ReadingContext"

createRoot(document.getElementById("root")).render(
  <ReadingProvider>
    <App />
  </ReadingProvider>
)
