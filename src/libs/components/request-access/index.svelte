<script lang='ts'>
	import {colors} from "../../stores/colors";
	import {requestAccess} from "../../stores/request-access";
    import { fade, blur, fly, slide, scale } from "svelte/transition";
	import {ws} from "../../stores/ws";
	import {page} from "$app/stores";
	import {concept} from "../../stores/concepts";
</script>

<div class="absolute w-screen h-screen flex flex-col items-center justify-center">
    <div class="w-[400px] h-[200px] flex shadow-lg divide-y-2 divide-black border-2 border-black flex-col bg-white items-center justify-center">
        <div style="background: {$colors[4]} ;" class="w-full text-xl flex flex-col items-center justify-center h-[100px] font-bold">{$requestAccess.message}</div>
        <div class="text-xl h-[100px] font-bold flex divide-x-2 divide-black flex-row items-center justify-center">
            <button on:click={() => {
                // @ts-ignore
                $ws.emit("accept-access", {id: $page.params.id, requestUserId: $requestAccess.requestId, userConceptId: $concept.user.find((i) => i.userId === $requestAccess.requestId).id})
            }} class="hover:bg-gray-100 transition-all w-[200px] h-full flex flex-col items-center justify-center">ACCEPT</button>
            <button class="hover:bg-gray-100 transition-all w-[196px] h-full flex flex-col items-center justify-center">DECLINE</button>
        </div>
    </div>
</div>
