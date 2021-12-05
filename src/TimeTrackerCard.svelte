<script lang="ts">
	import { time, TimeTracker, timeTrackers } from "./stores"
	export let timeTracker: TimeTracker

	$: millisecondsLeft = $time.getTime() - timeTracker.trackDate.getTime()
	
	function update(updates: Partial<TimeTracker>): void{
		timeTrackers.update(timeTracker, updates)
	}

	function updateState(updates: Partial<TimeTracker['state']>): void{
		timeTrackers.updateState(timeTracker, updates)
	}

	function toggleEdit(){
		updateState({
			editing: !timeTracker.state.editing,
		})
	}
</script>

<template lang="pug">
	h2 { timeTracker.title }
	code { millisecondsLeft }
	pre state: { JSON.stringify(timeTracker.state) }
	button(on:click="{toggleEdit}") edit
	+if("timeTracker.state.editing")
		input(
			type="text" 
			value!="{timeTracker.title}" 
			on:input!="{e => update({title: e.target.value})}")
</template>

<style lang="sass">
	button
		color: blue
</style>