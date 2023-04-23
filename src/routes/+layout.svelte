<script lang='ts'>
	import {onMount} from 'svelte';

	import '../app.css';
	import Loading from '../libs/components/loading/index.svelte';
    import { getSocket } from '../libs/utils/socket';

    onMount(() => {
        getSocket()
    })

	let isLoad: boolean = true;
	setInterval(() => {
		isLoad = false;
	}, 2000);
</script>

<div class="font-primary w-screen h-screen flex flex-col items-center justify-start">
	{#if isLoad}
		<Loading />
	{:else}
		<slot />
	{/if}
</div>
