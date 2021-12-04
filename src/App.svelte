<script lang="ts">
	import TimeTrackerCard from "./TimeTrackerCard.svelte"
	import { TimeTracker, timeTrackers} from "./stores"
	
	function doSomething() : void{
		const timeTracker: TimeTracker = new TimeTracker()
		timeTracker.title = `Random title #${Math.floor(Math.random()*1000)}`
		console.log(timeTracker)
		$timeTrackers[timeTracker.id] = timeTracker
		console.log($timeTrackers)
	}
</script>

<template lang="pug">
	button(on:click="{doSomething}") do something
	pre { JSON.stringify($timeTrackers, null, 2) }
	+each("Object.values($timeTrackers) as timeTracker")
		TimeTrackerCard(timeTracker="{timeTracker}")
</template>

<style lang="sass">
	*
		color: red
</style>