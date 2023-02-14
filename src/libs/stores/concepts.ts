import { writable } from 'svelte/store';

export const contents = writable<string[]>(['dashboard', 'based']);
