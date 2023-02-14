<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
	<button
		on:click={() => {
			goto('/concept');
		}}
		class="w-[100px] h-[35px] text-xl rounded-md bg-black hover:bg-[#151515] transition-all text-white"
		>new?</button
	>
</div>
