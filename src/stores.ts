import { update_await_block_branch } from "svelte/internal"
import { readable, Readable, Writable, writable } from "svelte/store"
import { v4 as uuid4 } from "uuid"

export type TimeTracker = {
    /**
     * ID of TimeTracker
     */
    id: string,
    /**
     * Title of the time tracker card.
     */
    title: string,
    /**
     * Date to track.
     */
    trackDate: Date,
    /**
     * Date tracker was created.
     */
    createdDate: Date,
    /**
     * Date tracker was updated.
     */
    updatedDate: Date,
    /**
     * State of TimeTracker
     */
    state: {
        /**
         * State of editing
         */
        editing: boolean,
        /**
         * Check if pinned
         */
        pinned: boolean,
    },
}

export const time: Readable<Date> = readable(new Date(), set => {
    const interval = setInterval(() => set(new Date()), 1000 / 4)
    return () => clearInterval(interval)
})

export function createTimeTrackerStore() {
    const store: Writable<Array<TimeTracker>> = writable([])
    return {
        ...store,
        update(timeTracker: TimeTracker, updates: Partial<TimeTracker>): void{
            store.update($store => {
                const i: number = $store.findIndex(t => t == timeTracker)
                if(i !== -1){
                    $store[i] = {
                        ...timeTracker,
                        ...updates,
                        updatedDate: new Date(),
                    }
                }
                return $store
            })
        },
        updateState(timeTracker: TimeTracker, stateUpdates: Partial<TimeTracker['state']>): void{
            this.update(timeTracker, {
                ...timeTracker,
                state: {
                    ...timeTracker.state,
                    ...stateUpdates,
                },
            })
        },
        create(partialTimeTracker?: Partial<TimeTracker>): TimeTracker{
            const timeTracker: TimeTracker = {
                id: uuid4(),
                title: "Title",
                trackDate: new Date(),
                createdDate: new Date(),
                updatedDate: new Date(),
                state: {
                    editing: false,
                    pinned: false,
                },
                ...partialTimeTracker,
            }

            store.update($store => [...$store, timeTracker])

            return timeTracker
        },
    }
}

export const timeTrackers = createTimeTrackerStore()
timeTrackers.create()