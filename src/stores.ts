import { get, readable, Readable, Writable, writable } from "svelte/store"
import { v4 as uuid4 } from "uuid"

const STORAGE_TIME_TRACKER_KEY = "t"

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
     * State of editing
     */
    editing: boolean,
    /**
     * Check if pinned
     */
    pinned: boolean,
    /**
     * Is selected
     */
    selected: boolean,
    
}

export const time: Readable<Date> = readable(new Date(), set => {
    const interval = setInterval(() => set(new Date()), 1000 / 4)
    return () => clearInterval(interval)
})

export function createTimeTrackerStore() {
    const storageValue = (() => {
        try{
            const data = JSON.parse(localStorage.getItem(STORAGE_TIME_TRACKER_KEY))
            if(!(data instanceof Array)) throw new Error()
            return data.map(timeTracker => {
                for(let key in timeTracker){
                    if(key.endsWith("Date")) timeTracker[key] = new Date(timeTracker[key])
                }
                return timeTracker
            })
        } catch(e){
            return []
        }
    })()
    const store: Writable<TimeTracker[]> = writable(storageValue)
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
        create(partialTimeTracker?: Partial<TimeTracker>): TimeTracker{
            const timeTracker: TimeTracker = {
                id: uuid4(),
                title: "Title",
                trackDate: new Date(),
                createdDate: new Date(),
                updatedDate: new Date(),
                editing: false,
                pinned: false,
                selected: false,
                ...partialTimeTracker,
            }

            store.update($store => [...$store, timeTracker])

            return timeTracker
        },
        delete(timeTracker: TimeTracker){
            store.update($timeTrackers => 
                $timeTrackers.filter(otherTimeTracker => timeTracker != otherTimeTracker))
        },
    }
}

export const timeTrackers = createTimeTrackerStore()

timeTrackers.subscribe($timeTrackers => {
    localStorage.setItem(STORAGE_TIME_TRACKER_KEY, JSON.stringify($timeTrackers))
})

if(get(timeTrackers).length == 0){
    timeTrackers.create({
        title: "Meg&Mike Wedding",
        trackDate: new Date("03/15/2021, 10:00:00")
    })
}