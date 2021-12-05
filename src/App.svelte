<script lang="ts">
    import TimeTrackerCard from "./components/TimeTrackerCard.svelte"
    import { TimeTracker, timeTrackers} from "./stores"
    
    function doSomething() : void{
        timeTrackers.create({
            title: `Random title #${Math.floor(Math.random()*1000)}`
        })
    }
</script>

<template lang="pug">
    button(on:click!="{doSomething}") do something
    pre { JSON.stringify($timeTrackers, null, 2) }
    +each("Object.values($timeTrackers) as timeTracker")
        <TimeTrackerCard {timeTracker} />
</template>

<style lang="sass">
    *
        color: red
</style>