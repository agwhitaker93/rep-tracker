import { useEffect, useState } from 'preact/hooks'
import { signal } from '@preact/signals'
import { save, message } from '@tauri-apps/api/dialog'
import { writeTextFile } from '@tauri-apps/api/fs'
import logo from '/1F3CB.svg'
import { appState, saveState, stateToCsv } from './state'
import { Reps } from './reps'
import { Footer } from './footer'
import { inTauri } from './env'
import './app.css'

export function App() {
  const objectUrl = signal('')
  const stateCsv = signal('')

  useEffect(() => {
    const periodicSave = setInterval(() => {
      const saved = saveState()
      if (saved || !objectUrl.value) {
        stateCsv.value = stateToCsv().trim()
        objectUrl.value = URL.createObjectURL(new Blob([stateCsv.value], {type:'text/csv'}))
      }
    }, 1000)
    return () => clearInterval(periodicSave)
  }, [])

  const saveCsv = async () => {
    const filePath = await save({
      filter: [{
        name: 'CSV',
        extensions: ['csv']
      }]
    })

    try {
      await writeTextFile(filePath, stateCsv.value)
    } catch (e) {
      await message(`Save failed\n${e.toString()}`, { title: 'Error', type: 'error'})
    }
  }

  const downloadOrSave = inTauri
        ? <button onClick={saveCsv}>Save CSV</button>
        : <a href={objectUrl} download="exercises.csv">Download CSV</a>

        return (
          <>
            <img src={logo} class="logo" alt="logo" />
            <Reps exercises={appState.exercises}/>
            <br/>
            {downloadOrSave}
            <Footer/>
          </>
        )
}
