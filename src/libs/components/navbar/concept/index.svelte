<script lang="ts">
	export let FILE_NAME: string;
	const onFileNameChange = (e: any) => {
		const value = e.target.innerText;
		FILE_NAME = value;
	};
</script>

<div
	class="border-b-2 border-black shadow-md w-full h-[45px] flex flex-row py-2 items-center justify-between font-black font-primary text-xl"
>
	<a class="w-1/3 text-left px-5" href="/">&larr;</a>
	<div class="flex flex-row items-center justify-center w-fit w-1/3">
		<span class="cursor-default">DRAFT&nbsp;/&nbsp;</span>
		{#if FILE_NAME === 'UNTITLED'}
			(&nbsp;
		{/if}
		<div
			on:input={(e) => {
				onFileNameChange(e);
			}}
			contenteditable="true"
			class="uppercase outline-none underline text-center w-fit"
		>
			{FILE_NAME}
		</div>
		{#if FILE_NAME === 'UNTITLED'}
			&nbsp;)
		{/if}
	</div>

	<!-- HARD CODED PLACEHOLDER IMGS -->
	<!-- TO BE REPLACED -->
	<div class="w-1/3 flex flex-row items-center justify-end px-5">
		<div class="p-[3px] bg-white rounded-full w-[30px] h-[30px] -mr-3 ">
			<img
				class="w-[30px] h-full rounded-full border-2 border-red-400"
				src="https://randomuser.me/api/portraits/men/{Math.floor(Math.random() * 50)}.jpg"
				alt="profileImg"
			/>
		</div>
		<div class="p-[3px] bg-white rounded-full w-[30px] h-[30px] -mr-3 ">
			<img
				class="w-[30px] h-full rounded-full border-2 border-blue-400"
				src="https://randomuser.me/api/portraits/men/{Math.floor(Math.random() * 50)}.jpg"
				alt="profileImg"
			/>
		</div>
		<div class="p-[3px] bg-white rounded-full w-[30px] h-[30px] -mr-3 ">
			<img
				class="w-[30px] h-full rounded-full border-2 border-yellow-400"
				src="https://randomuser.me/api/portraits/men/{Math.floor(Math.random() * 50)}.jpg"
				alt="profileImg"
			/>
		</div>
	</div>
</div>
