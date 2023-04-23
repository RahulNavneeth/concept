<script lang='ts'>
    import Nav from '../../../libs/components/navbar/concept/index.svelte';
    import Notification from '../../../libs/components/notification/index.svelte';
    import Sidebar from '../../../libs/components/sidebar/index.svelte';
    import Canvas from '../../../libs/components/canvas/index.svelte';
    import { ws } from '../../../libs/stores/ws';
    import { colors } from '../../../libs/stores/colors';
	import {page} from '$app/stores';

    let name: string = "";
    let users: any = {} 

    // @ts-ignore
    $ws.emit('concepts')

    // @ts-ignore
    $ws.on(`concept-receive-${$page.params.id}`, (data) => {
        name = data[0]
        users = data[2]
    })

    const handleNameChange = () => {
        // @ts-ignore
        $ws.emit('change-name', {id: $page.params.id, name})
    }

	function handleMousemove(event: any) {
		const x = event.clientX;
		const y = event.clientY;

        // @ts-ignore
        $ws.emit('change-user-curosr', {id: $page.params.id, coords: {x, y}, usid: $ws.id })

	}

    $: console.log(users)

</script>

<div class="bg-[#F7F7F7] relative flex flex-col items-center justify-center w-screen h-screen">
	<Notification />
	<Nav handleNameChange={handleNameChange} bind:FILE_NAME={name} />
    <div on:mousemove={handleMousemove} class="w-full h-full flex flex-row">
        <div class="overflow-hidden w-full h-full flex flex-col items-center justify-center">
            {#each Object.entries(users) as [key, value], idx}
                {#if key !== $ws?.id }
                    <div class="z-[10]">
                        <div style="top: {value[0].y + 5}px; left: {value[0].x + 5}px; background: { $colors[idx % $colors.length] }" class="absolute {key === $ws?.id ? 'bg-black' : 'text-black'} rounded-md pointer-none px-2">{key}</div>
                        <div style="background: { $colors[idx % $colors.length] }; top: {value[0].y - 10}px; left: {value[0].x - 8}px;" class="fixed w-[15px] h-[15px] rounded-full" />
                    </div>
                {/if}
            {/each}
            <!-- BRAINSTROM HERE BITCH -->
            <Canvas />
        </div>
        <Sidebar />
    </div>
</div>
