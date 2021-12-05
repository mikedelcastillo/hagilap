<script lang="ts">
	import { time, TimeTracker, timeTrackers } from "./stores"
	import { dateToInputDate } from "./utils"
	export let timeTracker: TimeTracker

	$: millisecondsLeft = timeTracker.trackDate.getTime() - $time.getTime()
	
	function update(updates: Partial<TimeTracker>): void{
		console.log(updates)
		timeTrackers.update(timeTracker, updates)
	}

	function setTrackDate(inputValue: string): void{
		const trackDate = new Date(inputValue)
		if(trackDate.toString() !== 'Invalid Date'){
			update({ trackDate })
		}
	}

	function toggleEdit(){
		update({
			editing: !timeTracker.editing,
		})
	}

	$: trackDateInputValue = dateToInputDate(timeTracker.trackDate)
</script>

<template lang="pug">
	h2 { timeTracker.title }
	h4 { timeTracker.trackDate.toLocaleString() }
	code { millisecondsLeft }
	button(on:click!="{toggleEdit}") edit
	button(on:click!="{ () => timeTrackers.delete(timeTracker) }") delete
	+if("timeTracker.editing")
		input(
			type="text" 
			value!="{timeTracker.title}" 
			on:input!="{e => update({title: e.target.value})}")
		input(
			type="datetime-local"
			value!="{trackDateInputValue}"
			on:input!="{e => setTrackDate(e.target.value) }"
		)
</template>

<style lang="sass">
	button
		color: blue
</style>