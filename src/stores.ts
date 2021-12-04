import { readable, Readable, Writable, writable } from "svelte/store"

export class TimeTracker{
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
     * Computes milliseconds left.
     * @returns value for milliseconds left.
     */
    computeMillisecondsLeft() : number{
        return new Date().getTime() - this.trackDate.getTime()
    }
    /**
     * Milliseconds left.
     */
    millisecondsLeft: Readable<number> = readable(this.computeMillisecondsLeft(), set => {
        const interval = setInterval(() => set(this.computeMillisecondsLeft()), 10)
        return () => clearInterval(interval)
    })
}

export const timeTrackers: Writable<Array<TimeTracker>> = writable([])

