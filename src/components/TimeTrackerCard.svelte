<script lang="ts">
    import Button from "./Button.svelte"
    
    import { time, TimeTracker, timeTrackers } from "../stores"
    import { dateToInputDate } from "../utils"
    export let timeTracker: TimeTracker
    
    function update(updates: Partial<TimeTracker>): void{
        timeTrackers.update(timeTracker, updates)
    }

    function setTrackDate(inputValue: string): void{
        const trackDate = new Date(inputValue)
        if(trackDate.toString() !== 'Invalid Date'){
            update({ trackDate })
        }
    }

    const toggleEdit = e => timeTrackers.edit(timeTracker.editing ? null : timeTracker)
    const togglePin = e => update({ pinned: !timeTracker.pinned })
    const toggleSelect = e => timeTrackers.select(timeTracker.selected ? null : timeTracker)
    const doneEdit = e => {
        toggleEdit(e)
        toggleSelect(e)
    }

    $: trackDateInputValue = dateToInputDate(timeTracker.trackDate)
    $: millisecondsLeft = timeTracker.trackDate.getTime() - $time.getTime()
</script>

<template lang="pug">
    .time-tracker-card(draggable=true)
        .main-card(on:click!="{toggleSelect}")
            .column.left
                .title { timeTracker.title }
                .date { timeTracker.trackDate.toLocaleString() }
            .column.right
                .number 5,365
                .unit Months
        +if("timeTracker.editing && timeTracker.selected")
            .edit-form
                input(
                    type="text" 
                    value!="{timeTracker.title}" 
                    on:input!="{e => update({title: e.target.value})}")
                input(
                    type="datetime-local"
                    value!="{trackDateInputValue}"
                    on:input!="{e => setTrackDate(e.target.value) }"
                )
        +if("timeTracker.selected")
            .edit-bar
                .left
                    +if("timeTracker.editing")
                        Button.action.edit(on:click!="{doneEdit}" icon="check")
                        +else()
                            Button.action.edit(on:click!="{toggleEdit}" icon="edit")
                    Button.action.pin(on:click!="{togglePin}" icon!="{timeTracker.pinned ? 'star' : 'star_border'}")
                .right
                    Button.action.delete(on:click!="{e => timeTrackers.delete(timeTracker)}" icon="delete")
</template>