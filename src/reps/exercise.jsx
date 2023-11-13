import { useRef, useEffect } from 'preact/hooks'
import { signal } from '@preact/signals'
import { RepCount } from './repCount'

export function Exercise({name, sets, del}) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) ref.current.focus()
  }, [ref.current])

  const updateName = ({target: {value}}) => {
    name.value = value
  }

  const addSet = () => {
    sets.value = [...sets.value, signal()]
  }

  const deleteSet = (idx) => {
    sets.value = sets.value.filter((_, i) => idx !== i)
  }

  return (
    <div class="exercise">
      <input class="exercise-input" ref={ref} value={name.value} onInput={updateName} placeholder="Exercise Name"/>
      <button class="del-button" onClick={del}>X</button>
      {sets.value.map((reps, idx) => (
        <RepCount reps={reps} del={() => deleteSet(idx)}/>
      ))}
      <br/>
      <button onClick={addSet}>Add Set!</button>
    </div>
  )
}
