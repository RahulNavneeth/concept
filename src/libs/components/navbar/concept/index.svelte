<script lang='ts'>
	export let FILE_NAME: string;
	export let handleNameChange: any;
</script>

<div class="z-[1000] bg-white w-full h-[45px] flex flex-row py-2 items-center justify-between font-black font-primary text-xl" >
	<a class="w-1/3 text-left px-5" href="/">&larr;</a>
    <div class="flex flex-row items-center justify-center">
		<span class="cursor-default">DRAFT&nbsp;/&nbsp;</span>
		<input
            on:keyup={handleNameChange}
            style="width: {FILE_NAME.length * 9}px"
			class="uppercase outline-none underline text-center"
            bind:value={FILE_NAME}
        />
	</div>

	<!-- TO BE REPLACED -->
	<div class="w-1/3 flex flex-row items-center justify-end px-2">
		<img
			class="w-[30px] h-full rounded-full"
			src="https://randomuser.me/api/portraits/men/{Math.floor(Math.random() * 50)}.jpg"
			alt="profileImg"
		/>
	</div>
</div>
