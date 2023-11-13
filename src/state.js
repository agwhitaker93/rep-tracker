import { signal } from '@preact/signals'

const storageKey = new Date().toISOString().split('T')[0]

let initialState = localStorage.getItem(storageKey)

if (initialState) {
    initialState = JSON.parse(initialState)
    initialState.exercises = signal(initialState.exercises.map(({name, sets}) => {
        return {
            name: signal(name),
            sets: signal(sets.map((reps) => signal(reps)))
        }
    }))
} else {
    initialState = {
        exercises: signal([])
    }
}

export const appState = initialState

export function saveState() {
    const toSave = JSON.stringify(appState)
    const existing = localStorage.getItem(storageKey)
    if (toSave === existing) {
        return false
    } else {
        localStorage.setItem(storageKey, JSON.stringify(appState))
        return true
    }
}

export function stateToCsv() {
    return Object.entries(localStorage)
        .map(([date, json]) => {
            return [date, JSON.parse(json)] 
        })
        .reduce((accum, [date, {exercises}]) => {
            accum += `${date}\n`
            if (exercises.length) {
                accum += exercises.reduce((accum, {name, sets}) => {
                    if (!name || !sets.length || !sets.filter((ident) => ident).length) {
                        return accum
                    }
                    const setsCsv = sets.reduce((accum, set) => {
                        if (!set) {
                            return accum
                        }
                        return `${accum},${set}`
                    })
                    return accum + `${name},${setsCsv}\n`
                }, '')
            }
            return `${accum}\n`
        }, '')
}
