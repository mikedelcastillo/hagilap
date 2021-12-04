import { derived, get, readable, Readable, Writable, writable } from "svelte/store"
import { v4 as uuid4 } from "uuid"

export type TimeTrackerState = {
    editing: boolean,
}
export class TimeTracker {
    /**
     * ID of TimeTracker
     */
    id: string = uuid4()
    /**
     * Title of the time tracker card.
     */
    title: string = "Title"
    /**
     * Date to track.
     */
    trackDate: Date = new Date()
    /**
     * Date tracker was created.
     */
    createdDate: Date = new Date()
    /**
     * Date tracker was updated.
     */
    updatedDate: Date = new Date()
    /**
     * State of TimeTracker
     */
    state: TimeTrackerState = {
        editing: false,
    }
}

export const timeTrackers: Writable<object> = writable({})

export const time: Readable<Date> = readable(new Date(), set => {
    const interval = setInterval(() => set(new Date()), 1000 / 4)
    return () => clearInterval(interval)
})