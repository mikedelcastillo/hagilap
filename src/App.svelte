<script lang="ts">
    import Button from "./components/Button.svelte"
    import TimeTrackerCard from "./components/TimeTrackerCard.svelte"
    import { time, TimeTracker, timeTrackers} from "./stores"
    
    function create() : void{
        const timeTracker = timeTrackers.create()
        timeTrackers.select(timeTracker)
        timeTrackers.edit(timeTracker)
    }

    $: t = $time.getTime()
</script>

<template lang="pug">
    #app-container
        #content-container
            .time-trackers-group
                .label All trackers
                .time-trackers
                    +each("Object.values($timeTrackers) as timeTracker")
                        <TimeTrackerCard {timeTracker} />
        #action-bar
            .column.left
                Button(on:click!="{create}" icon="add") Create new tracker
            //- .column.right
                Button(icon="sort") Sort
                Button(icon="settings")
</template>

<style lang="sass">
    @import ./sass/_all.sass
    @import ./sass/global.sass
    #app-container
        width: 100%
        height: 100%
        display: flex
        flex-direction: column
        #content-container, #action-bar
            width: 100%
        #content-container
            flex-grow: 1
            flex-shrink: 1
            overflow-y: auto
            overflow-x: hidden
            .time-trackers-group
                .label
                    padding: var(--gutter-static-1) var(--gutter-static-2)
                    font-size: var(--font-size--1)
                    text-transform: uppercase
                    font-weight: bold
                .time-trackers
                    padding: 0 var(--grid-gap)
                    display: grid
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))
                    grid-gap: var(--grid-gap)
        #action-bar
            flex-grow: 0
            flex-shrink: 0
            height: var(--action-bar-height)
            background-color: var(--color-background-3)
            padding: 0 var(--gutter-static-2)
            &, .column
                display: flex
                justify-content: space-between
                align-items: center
                gap: var(--button-spacing)
            
</style>