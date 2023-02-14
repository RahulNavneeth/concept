<script lang="ts">
	import '../app.css';
	import Loading from '../libs/components/loading/index.svelte';

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
