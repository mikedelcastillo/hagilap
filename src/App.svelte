<script lang="ts">
	import { Router, Route, Link } from "svelte-navigator"
	import { Writable, writable } from "svelte/store"
	import Component from "./Component.svelte"
	import { TimeTracker, timeTrackers } from "./stores"

	console.log(timeTrackers)

	function doSomething() : void{
		const timeTracker: TimeTracker = new TimeTracker()
		timeTracker.title = `Random title #${Math.floor(Math.random()*1000)}`
		$timeTrackers = [...$timeTrackers, timeTracker]
	}

	let test: Writable<number> = writable(0)
	setInterval(() => {
		test.update(t => t + 1)
	}, 100)
</script>

<template lang="pug">
	Router
		Route(path="/")
			h1 Learning svelte
			p Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident illum ipsa suscipit aut consectetur a saepe modi soluta ratione, dolorum eligendi culpa, non ex, amet mollitia iusto hic accusantium nam!
			Link(to="about") About
		Route(path="about")
			h2 About
			p I'm learning a lot!
			Link(to="/") Home
		h1 {$test}
		button(on:click="{doSomething}") do something
		pre {JSON.stringify($timeTrackers, null, 2)}
		+each("$timeTrackers as timeTracker")
			Component(timeTracker="{timeTracker}")
</template>

<style lang="sass">
	*
		color: red
</style>