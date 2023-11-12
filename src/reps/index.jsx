import { signal } from '@preact/signals'
import { Exercise } from './exercise'
import './index.css'

export function Reps({exercises}) {
    const addExercise = () => {
        exercises.value = [...exercises.value, {name: signal(''), sets: signal([])}]
    }

    return (
        <div class="rep-list">
          {exercises.value.map(({name, sets}) => (
              <Exercise name={name} sets={sets}/>
          ))}
          <br/>
          <button onClick={addExercise}>Add Exercise!</button>
        </div>
    )
}
