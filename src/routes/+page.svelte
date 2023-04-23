<script lang='ts'>
	import { goto } from '$app/navigation';
    import { ws } from "../libs/stores/ws"

    // @ts-ignore
    let concepts: {id: string, data: string} = {} 

    // @ts-ignore
    $ws.emit('concepts')

    // @ts-ignore
    $ws.on('fetch-concepts', (data) => {
        concepts = data; 
    })

    const handleNewConcept = () => {
    	goto('/concept');
    }

</script>

<div class="w-full h-full flex flex-col items-center justify-center">
    <div class="w-full flex flex-row items-center justify-center">
        {#each Object.entries(concepts) as [key, [name, data]], idx}
            <div aria-hidden="true" class="cursor-pointer m-2 flex flex-col items-center justify-center" on:click={() => goto(`/concept/${key}`)}>
                {#if data.length}
                    <img class="border-2 border-black w-[350px]" src={data} alt="key" />
                {:else}
                    <div class="border-2 border-black w-[350px] h-[253.46px]"/>
                {/if}
                <div class="mt-2">{name.toUpperCase()}</div>
            </div>
        {:else}
            NONE
        {/each}
    </div>
    <button
    	on:click={handleNewConcept}
    	class="w-[100px] h-[35px] mt-20 text-xl rounded-md bg-black hover:bg-[#151515] transition-all text-white"
    	>new?</button
    >
</div>
