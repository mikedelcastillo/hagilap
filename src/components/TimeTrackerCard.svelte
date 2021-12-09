<script lang="ts">
    import Button from "./Button.svelte"
    
    import { time, TimeTracker, timeTrackers } from "../stores"
    import { dateToInputDate, getTimeLeft } from "../utils"
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

    const toggleEdit = () => timeTrackers.edit(timeTracker.editing ? null : timeTracker)
    const togglePin = () => update({ pinned: !timeTracker.pinned })
    const toggleSelect = () => timeTrackers.select(timeTracker.selected ? null : timeTracker)
    const doneEdit = () => {
        toggleEdit()
        toggleSelect()
    }

    $: trackDateInputValue = dateToInputDate(timeTracker.trackDate)
    $: millisecondsLeft = timeTracker.trackDate.getTime() - $time.getTime()
    $: timeLeft = getTimeLeft(millisecondsLeft)
    $: cssVariables = [
        `--color-text: ${timeTracker.colorText}`,
        `--color-background: ${timeTracker.colorBackground}`,
    ].join(";")
</script>

<template lang="pug">
    .time-tracker(draggable=true style="{cssVariables}")
        .banner(on:click!="{toggleSelect}")
            .column.left
                .title { timeTracker.title }
                .date { timeTracker.trackDate.toLocaleString() }
            .column.right
                .number {timeLeft.number}
                .unit {timeLeft.unit}
        +if("timeTracker.editing && timeTracker.selected")
            .edit-form
                .input-line.title
                    input.input-text(
                        type="text" 
                        placeholder="Title"
                        value!="{timeTracker.title}" 
                        on:input!="{e => update({title: e.target.value})}")
                    .input-color-container.color-text
                        input.input-color(
                            type="color"
                            value!="{timeTracker.colorText}"
                            on:input!="{e => update({colorText: e.target.value})}")
                    .input-color-container.color-background
                        input.input-color(
                            type="color"
                            value!="{timeTracker.colorBackground}"
                            on:input!="{e => update({colorBackground: e.target.value})}")
                .input-line
                    input.input-text(
                        type="datetime-local"
                        value!="{trackDateInputValue}"
                        on:input!="{e => setTrackDate(e.target.value) }")
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

<style lang="sass">
    .time-tracker
        background-color: var(--color-background)
        color: var(--color-text)
        height: fit-content
        .banner
            height: var(--time-tracker-banner-height)
            padding: var(--gutter-static-1) var(--gutter-static-2)
            display: flex
            justify-content: space-between
            align-items: center
            .column
                overflow: hidden
                *
                    width: 100%
                    overflow: hidden
                    text-overflow: ellipsis
                    white-space: nowrap
                &.left
                    flex-grow: 1
                    flex-shrink: 1
                    padding-right: var(--gutter-static-1)
                    .title
                        font-size: var(--font-size-1)
                        font-weight: bold
                    .date
                        font-size: var(--font-size--1)
                        opacity: var(--dim-opacity-2)
                &.right
                    flex-grow: 0
                    flex-shrink: 0
                    text-align: right
                    .number
                        font-size: var(--font-size-1)
                    .unit
                        font-size: var(--font-size--1)
                        text-transform: uppercase
                        opacity: var(--dim-opacity-2)
        .edit-form
            padding-bottom: 2em
            .input-line
                padding: 0 var(--gutter-static-2)
                display: flex
                justify-content: space-between
                align-items: center
                gap: 0.5em

                .input-text
                    width: 100%
                    font-family: inherit
                    font-size: inherit
                    color: var(--color-text)
                    background-color: transparent
                    border: 0
                    border-radius: 0
                    appearance: none
                    border-bottom: 1px dashed var(--color-text)
                    padding: 0.5em 0

                    &:focus
                        outline: 0
                        border-bottom-style: solid
                .input-color-container
                    $size: var(--font-size-4)
                    width: $size
                    height: $size
                    border-radius: $size
                    overflow: hidden
                    flex-grow: 0
                    flex-shrink: 0
                    &.color-text
                        border: 1px solid var(--color-background)
                    &.color-background
                        border: 1px solid var(--color-text)
                    .input-color
                        padding: 0
                        margin: -100%
                        outline: 0
                        appearance: none
                        border: 0
                        background-color: transparent
                        width: 200%
                        height: 200%
                        position: absolute
                        top: 50%
                        left: 50%
                        border-radius: 0
        .edit-bar
            background-color: var(--color-background-dim)
            height: var(--action-bar-height)
            padding: 0 var(--gutter-static-2)
            &, .left, .right
                display: flex
                justify-content: space-between
                align-items: center
                gap: var(--button-spacing)
            &::before
                content: ' '
                background-color: var(--color-text)
                position: absolute
                inset: 0
                opacity: 0.1

</style>