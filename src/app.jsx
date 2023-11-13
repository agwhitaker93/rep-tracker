import { useEffect } from 'preact/hooks'
import { signal } from '@preact/signals'
import { appState, saveState, stateToCsv } from './state'
import { Reps } from './reps'
import { Footer } from './footer'
import './app.css'

export function App() {
  const objectUrl = signal('')

  useEffect(() => {
    const periodicSave = setInterval(() => {
      const saved = saveState()
      if (saved || !objectUrl.value) {
        const stateCsv = stateToCsv().trim()
        objectUrl.value = URL.createObjectURL(new Blob([stateCsv], {type:'text/csv'}))
        console.log({stateCsv})
      }
    }, 1000)
    return () => clearInterval(periodicSave)
  }, [])

  return (
    <>
      <Reps exercises={appState.exercises}/>
      <br/>
      <a href={objectUrl} download="exercises.csv">Download</a>
      <Footer/>
    </>
  )
}
