import {writable} from 'svelte/store'

export let selected = writable([])
export let matches = writable([])
export let toggleValue = writable(true)