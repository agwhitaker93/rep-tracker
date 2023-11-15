import { useEffect, useState } from 'preact/hooks'
import { signal } from '@preact/signals'
import { invoke } from "@tauri-apps/api/tauri";
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

  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name: "John Doe" }));
  }

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
            <form
          class="row"
              onSubmit={(e) => {
                e.preventDefault();
                greet();
              }}
            >
              <input
                id="greet-input"
                onInput={(e) => setName(e.currentTarget.value)}
                placeholder="Enter a name..."
              />
              <button type="submit">Greet</button>
            </form>

            <p>{greetMsg}</p>
            <img src={logo} class="logo" alt="logo" />
            <Reps exercises={appState.exercises}/>
            <br/>
            {downloadOrSave}
            <Footer/>
          </>
        )
}
