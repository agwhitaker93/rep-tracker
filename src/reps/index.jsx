import { signal } from '@preact/signals'
import { Exercise } from './exercise'
import './index.css'

export function Reps({exercises}) {
  const addExercise = () => {
    exercises.value = [...exercises.value, {name: signal(''), sets: signal([])}]
  }

  const deleteExercise = (idx) => {
    exercises.value = exercises.value.filter((_, i) => idx !== i)
  }

  return (
    <div class="rep-list">
      {exercises.value.map(({name, sets}, idx) => (
        <Exercise name={name} sets={sets} del={() => deleteExercise(idx)}/>
      ))}
      <button onClick={addExercise}>Add Exercise!</button>
    </div>
  )
}
