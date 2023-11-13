import { signal } from '@preact/signals'
import { useState, useCallback, useRef, useEffect } from 'preact/hooks'

export function RepCount({reps, del}) {
    const [ cooldown, setCooldown ] = useState(reps.value ? 0 : 30)

    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) ref.current.focus()
    }, [ref.current])

    useEffect(() => {
        const timer = setInterval(() => {
            if (cooldown > 0) {
                setCooldown((prev) => prev - 1)
            } else {
                clearInterval(timer)
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const updateReps = ({target: {value}}) => {
        reps.value = value
    }

    return (
        <div class="rep-count">
          <input class="rep-input" ref={ref} value={reps.value} onInput={updateReps} placeholder="0"/>
          <button class="del-button" onClick={del}>X</button>
          {cooldown > 0 ? <div>{cooldown} seconds until your next set</div> : null}
        </div>
    )
}
