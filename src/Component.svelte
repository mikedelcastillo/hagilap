<script lang="ts">
	import type { TimeTracker } from "./stores"
	export let timeTracker: TimeTracker

	const { millisecondsLeft } = timeTracker
</script>

<template lang="pug">
	h2 { timeTracker.title }
	code { $millisecondsLeft }
</template>

<style lang="sass">
	button
		color: blue
</style>