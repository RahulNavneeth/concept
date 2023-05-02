<script lang='ts'>
    import Sidebar from '../../../libs/components/sidebar/index.svelte';
    import Canvas from '../../../libs/components/canvas/index.svelte';
    import { ws } from '../../../libs/stores/ws';
    import { users } from '../../../libs/stores/users';
    import { notification } from '../../../libs/stores/notification';
    import { requestAccess } from '../../../libs/stores/request-access';
    import { colors } from '../../../libs/stores/colors';
	import { page } from '$app/stores';
	import { peer } from '../../../libs/stores/peer';
	import { getPeer } from '../../../libs/utils/peer';
	import axios from 'axios';
	import { user } from '../../../libs/stores/user';
	import { concept } from '../../../libs/stores/concepts';

    // @ts-ignore
    getPeer($ws.id+$page.params.id)

    // @ts-ignore
    $ws?.emit('concept-init', {id: $page.params.id, name: $user.username, usid: $user.id })

    // @ts-ignore
    $ws.on(`on-init-${$page.params.id}`, (data) => {
        concept.set(data)
    })

    $ws.on(`notify-request-access-${$page.params.id}-${$user?.id}`, (data : {message: string, userId: string}) => {
        // @ts-ignore
        requestAccess.set({message: data.message, show: true, requestId: data.userId})
    })

    // @ts-ignore
    $ws.on(`change-user-cursor-${$page.params.id}`, (data) => {
        concept.update(value => {
          const updatedUser = value.user.find(user => user.userId === data.usid)
          if (updatedUser) {
            updatedUser.xMouse = data.coords.x
            updatedUser.yMouse = data.coords.y
          }
          return { ...value, user: [...value.user] }
        })
    })

    // @ts-ignore
    $ws.on(`concept-init-${$page.params.id}`, (data) => {
        concept.set(data)
    })

    // @ts-ignore
    $ws.on(`on-notif-${$page.params.id}`, (data) => {
        notification.set(data)
    })

    // @ts-ignore
    $ws.on(`on-notif-${$page.params.id}-${$user.id}`, (data, type) => {
        notification.set(data)
    })
    
    // @ts-ignore
    $ws.on(`allow-access-${$page.params.id}`, (data) => {
        // @ts-ignore
        concept.update(value => {
            // @ts-ignore
            const updatedUser = value.user.find(user => user.userId === data.requestId)
            if (updatedUser) {
                updatedUser.isEdit = true
            }
            // @ts-ignore
            return { ...value, user: [...value.user] }
        })
        requestAccess.set({message: "", show: false, requestId: ""}) 
    })

	function handleMousemove(event: any) {
		const x = event.clientX;
		const y = event.clientY;

        // @ts-ignore
        $ws.emit('change-user-curosr', {id: $page.params.id, coords: {x, y}, usid: $user.id })

	}

    // @ts-ignore
    $peer.on('call', (call) => {
        navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(stream => {
            call.answer(stream)
            call.on('stream', (remoteStream) => {
                // @ts-ignore
                // const blob = new Blob([remoteStream], {type: "video/webm"})
                // $ws.emit("answer-call", {id: $page.params.id, stream: blob, usid: $ws.id})
                $users[call.metadata.usid][1].srcObject = remoteStream
                $users[call.metadata.usid][1].play()
            })
        })
    })

	let loadingDots: string = '.';
	setInterval(() => {
		if (loadingDots.length === 3) loadingDots = '.';
		else loadingDots += '.';
	}, 500);

</script>

{#if !$concept}
    <div class="w-full h-full text-2xl flex flex-col items-center justify-center">
        LOADING CANVAS {loadingDots}
    </div> 
{:else}
    <div on:mousemove={handleMousemove} class="w-full h-full flex flex-row">
        <div class="overflow-hidden w-full h-full flex flex-col items-center justify-center">
            {#each $concept.user as value, idx}
                {#if value.userId !== $user.id && value.isEdit}
                    <div class="z-[10]">
                        <div style="top: {value.yMouse + 5}px; left: {value.xMouse + 5}px; background: { $colors[idx % $colors.length] }" class="absolute {value.userId === $user.id ? 'bg-black' : 'text-black'} rounded-md pointer-none px-2">{value.user.username.toUpperCase()}</div>
                        <div style="background: { $colors[idx % $colors.length] }; top: {value.yMouse - 10}px; left: {value.xMouse - 8}px;" class="fixed w-[15px] h-[15px] rounded-full" />
                    </div>
                {/if}
            {/each}
            <!-- BRAINSTROM HERE BITCH -->
            <Canvas />
        </div>
        <Sidebar />
    </div>
{/if}
