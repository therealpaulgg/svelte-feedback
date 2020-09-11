import { writable } from "svelte/store"
import type { AxiosError } from "axios"
import type { FeedbackData } from "./model"

function createFeedbackStore(value: FeedbackData[], timeout: number) {
    const { subscribe, set, update } = writable([])
    let subscribers = []
    let state = value
    function incrementUntilStop(element: FeedbackData, index: number) {
        if (element.active) {
            element.amount += 0.01
            if (element.amount >= 1) {
                element.active = false
            } else {
                setTimeout(
                    incrementUntilStop,
                    element.timeout ? element.timeout : timeout / 100,
                    element,
                    index
                )
            }
        }
        subscribers.forEach(s => s(state))
    }
    return {
        subscribe(listener) {
            subscribers.push(listener)
            listener(state)
            return () => {
                const index = subscribers.indexOf(listener)
                if (index !== -1) {
                    subscribers.splice(index, 1)
                }
            }
        },
        set: (newArray: FeedbackData[]) => {
            for (let i = 0; i < newArray.length; i++) {
                if (newArray[i] != state[i]) {
                    // kill the previous element's timeout
                    if (state[i]) state[i].active = false
                    state[i] = newArray[i]
                    if (state[i].amount !== -1) {
                        incrementUntilStop(state[i], i)
                    }
                    subscribers.forEach(s => s(state))
                }
            }
        },
        addItem: (newItem: FeedbackData) => {
            state.push(newItem)
            const index = state.length - 1
            if (state[index].amount !== -1) {
                incrementUntilStop(state[index], index)
            }            
            subscribers.forEach(s => s(state))
        },
        update
    }
}

export let feedback = createFeedbackStore([], 5000)

export function handleError(err: AxiosError) {
    let information: any | string
    if (err.response) {
        if (err.response.status === 401) return
        information = err.response.data
        
    } else {
        information = err.message
    }
    feedback.addItem({
        text: information,
        variant: "error",
        active: true,
        amount: -1
    })
}

export function addWarning(msg: string) {
    feedback.addItem({
        text: msg,
        variant: "warning",
        active: true,
        amount: 0
    })
}

export function addError(msg: string) {
    feedback.addItem({
        text: msg,
        variant: "error",
        active: true,
        amount: 0
    })
}

export function addInfo(msg: string) {
    feedback.addItem({
        text: msg,
        variant: "info",
        active: true,
        amount: 0
    })
}

export function addSuccess(msg: string) {
    feedback.addItem({
        text: msg,
        variant: "success",
        active: true,
        amount: 0
    })
}