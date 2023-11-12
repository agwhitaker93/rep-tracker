import { useRef, useEffect } from 'preact/hooks'
import { signal } from '@preact/signals'
import { RepCount } from './repCount'

export function Exercise({name, sets}) {
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

    return (
        <div class="exercise">
          <input class="exercise-input" ref={ref} value={name.value} onInput={updateName} placeholder="Exercise Name"/>
          {sets.value.map((reps) => (
              <RepCount reps={reps}/>
          ))}
          <br/>
          <button onClick={addSet}>Add Set!</button>
        </div>
    )
}
