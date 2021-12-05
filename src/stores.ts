import { get, readable, Readable, Writable, writable } from "svelte/store"
import { v4 as uuid4 } from "uuid"

const STORAGE_TIME_TRACKER_KEY = "t"

export type TimeTracker = {
    // Details
    id: string,
    title: string,
    colorBackground: string,
    colorText: string,
    // Dates
    trackDate: Date,
    createdDate: Date,
    updatedDate: Date,
    // States
    editing: boolean,
    pinned: boolean,
    selected: boolean,
}

export const time: Readable<Date> = readable(new Date(), set => {
    const interval = setInterval(() => set(new Date()), 1000 / 4)
    return () => clearInterval(interval)
})

// TODO: Add undo history

export function createTimeTrackerStore() {
    const storageValue = (() => {
        try{
            const data = JSON.parse(localStorage.getItem(STORAGE_TIME_TRACKER_KEY))
            if(!(data instanceof Array)) throw new Error()
            return data.map((timeTracker: TimeTracker) => {
                for(let key in timeTracker){
                    if(key.endsWith("Date")) timeTracker[key] = new Date(timeTracker[key])
                }
                timeTracker.editing = false
                timeTracker.selected = false
                // TODO: Validate for future changes
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
        edit(timeTracker: TimeTracker | null){
            store.update($store => $store.map(otherTimeTracker => {
                otherTimeTracker.editing = timeTracker == otherTimeTracker
                return otherTimeTracker
            }))
        },
        select(timeTracker: TimeTracker | null){
            store.update($store => $store.map(otherTimeTracker => {
                const selected = timeTracker == otherTimeTracker
                otherTimeTracker.selected = selected
                otherTimeTracker.editing = false
                return otherTimeTracker
            }))
        },
        create(partialTimeTracker?: Partial<TimeTracker>): TimeTracker{
            const timeTracker: TimeTracker = {
                id: uuid4(),
                title: "New Time Tracker",
                colorBackground: "#009C5B",
                colorText: "#ffffff",

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
        title: "Merry Christmas!",
        trackDate: new Date("12/25/2021, 00:00:00")
    })
    timeTrackers.create({
        title: "PH Elections",
        trackDate: new Date("05/09/2022, 10:00:00")
    })
}