import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import { appState } from './state'
import { Reps } from './reps'
import './app.css'

export function App() {

  const logState = () => {
    console.log(JSON.stringify(appState))
  }

  return (
    <>
      <Reps exercises={appState.exercises}/>
      <button onClick={logState}>Log state</button>
      <br/>
    </>
  )
}
