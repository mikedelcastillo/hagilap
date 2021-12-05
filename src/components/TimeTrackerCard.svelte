<script lang="ts">
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

    const toggleEdit = e => {
        timeTracker.editing ? update({ editing: false }) : timeTrackers.edit(timeTracker)
        e.stopPropagation()
    }
    const togglePin = e => {
        update({ pinned: !timeTracker.pinned })
        e.stopPropagation()
    }
    const toggleSelect = e => {
        timeTracker.selected ? update({ selected: false }) : timeTrackers.select(timeTracker)
    }

    $: trackDateInputValue = dateToInputDate(timeTracker.trackDate)
    $: millisecondsLeft = timeTracker.trackDate.getTime() - $time.getTime()
</script>

<template lang="pug">
    .time-tracker-card(on:click!="{toggleSelect}" draggable=true)
        .main-card
            .column.left
                .title { timeTracker.title }
                .date { timeTracker.trackDate.toLocaleString() }
            .column.right
                .number 5,365
                .unit Months
        +if("timeTracker.editing")
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
        .edit-bar
            .left
                .action.edit(on:click!="{toggleEdit}") Edit
                .action.pin(on:click!="{togglePin}") {timeTracker.pinned ? "Unpin" : "Pin"}
            .right
                .action.delete(on:click!="{e => timeTrackers.delete(timeTracker)}") Delete
</template>

<style lang="sass">
    button
        color: blue
</style>