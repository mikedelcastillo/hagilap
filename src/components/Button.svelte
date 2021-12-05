<script lang="ts">
    export let icon: string
</script>

<template lang="pug">
    button(on:click class!="{$$props.class}")
        +if("icon")
            .icon
                +if(`icon == "add"`)
                    include ../assets/icons/add.svg
                +if(`icon == "check"`)
                    include ../assets/icons/check.svg
                +if(`icon == "delete"`)
                    include ../assets/icons/delete.svg
                +if(`icon == "edit"`)
                    include ../assets/icons/edit.svg
                +if(`icon == "settings"`)
                    include ../assets/icons/settings.svg
                +if(`icon == "sort"`)
                    include ../assets/icons/sort.svg
                +if(`icon == "star"`)
                    include ../assets/icons/star.svg
                +if(`icon == "star_border"`)
                    include ../assets/icons/star_border.svg
        +if("$$slots.default")
            .text
                slot 
</template>

<style lang="sass">
button
    appearance: none
    background-color: transparent
    border: 0
    border-radius: 0
    margin: 0
    padding: 0
    cursor: pointer
    display: flex
    justify-content: flex-start
    align-items: center
    // font-size: var(--font-size-default)
    // color: var(--color-text)
    .icon, .text

    .icon
        *
            fill: var(--color-text) !important
    .text
        padding: 0 var(--button-spacing)
        text-transform: uppercase
        font-size: var(--font-size--1)
        color: var(--color-text)
        font-weight: bold

</style>