import { signal } from '@preact/signals'

const exerciseShape = {
    name: 'Test',
    sets: [10, 10]
}

export const appState = {
    exercises: signal([])
}
