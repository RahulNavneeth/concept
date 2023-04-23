<script lang='ts'>
	import {page} from "$app/stores";
	import {colors} from "../../stores/colors";
    import {ws} from "../../stores/ws"
    let on: boolean = false;

    let users: any = {};

    // @ts-ignore
    $ws.on(`concept-receive-${$page.params.id}`, (data) => {
        users = data[2]
    })

</script>

<div class="absolute overflow-hidden right-[0px] h-[95%] flex flex-row items-center justify-center">
    <button on:click={() => on = !on} class="text-[50px]">
        {on ? '>' : '<'}
    </button>
    <div class="mx-4 overflow-y-scroll h-full flex flex-col items-center justify-center">
        <div class="flex flex-col items-center justify-center">
            {#each Object.entries(users) as [key, value], idx }
                {#if !on}
                    <div class="w-[45px] h-[45px] my-1">
                        <img style="border-color: {key === $ws.id ? 'white' : $colors[idx % $colors.length]}; " class="shadow-md border-4 rounded-full" src="https://randomuser.me/api/portraits/men/{Math.floor(Math.random() * 100)}.jpg" alt="user-pic">
                    </div>
                {:else}
                    <div style="background:{key === $ws.id ? 'white' : $colors[idx % $colors.length]} ;" class="flex flex-col items-center justify-center w-[280px] h-[150px] my-2 border-2 border-black rounded-lg">
                        <img style="border-color: black;" class=" w-[75px] h-[75px] border-2 rounded-full" src="https://randomuser.me/api/portraits/men/{Math.floor(Math.random() * 100)}.jpg" alt="user-pic">
                    </div>
                {/if} 
            {/each}
        </div>
    </div>
</div>
