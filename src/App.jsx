import { BottomBar } from "./components/BottomBar"
import { Info } from "./components/Info"
import { Readings } from "./components/Readings"
import { TitleBar } from "./components/TitleBar"
import { useReading } from "./context/ReadingContext"
import "./App.css"

export default function App() {
  const { showConfig } = useReading()

  return (
    <div className="app">
      <header className="app-header">
        <TitleBar />
      </header>
      {showConfig ? <Info /> : <Readings />}
      <BottomBar />
    </div>
  )
}
