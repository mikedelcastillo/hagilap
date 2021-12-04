<script lang="ts">
	import { derived, get, Writable } from "svelte/store"
	import { time, TimeTracker, timeTrackers } from "./stores"
	export let timeTracker: TimeTracker

	$: millisecondsLeft = $time.getTime() - $timeTrackers[timeTracker.id].trackDate.getTime()
	
	function edit(){
		$timeTrackers[timeTracker.id].state.editing = !$timeTrackers[timeTracker.id].state.editing
	}
</script>

<template lang="pug">
	h2 { $timeTrackers[timeTracker.id].title }
	input(type="text" bind:value="{$timeTrackers[timeTracker.id].title}")
	code { millisecondsLeft }
	pre state: { JSON.stringify($timeTrackers[timeTracker.id].state) }
	button(on:click="{edit}") edit
</template>

<style lang="sass">
	button
		color: blue
</style>