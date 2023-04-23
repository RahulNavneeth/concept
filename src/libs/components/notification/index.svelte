<script lang='ts'>
	import {colors} from "../../stores/colors";

    enum notification {
        JOINED = 'success',
        DISCONNECTED = 'error',
        WARNING = 'warning',
        ERROR = 'info'
    }

    export const message: string = 'PLACEHOLDER MESSAGE';
    export const type = notification.JOINED;

</script>

<div class="absolute top-[90px] left-[50px] z-[20] flex flex-row items-center justify-start border-2 border-black w-[400px] bg-white h-[75px]">
    {#if type === notification.JOINED}
        <div style={`background: ${$colors[5]};`} class="w-[75px] border-r-2 border-black h-full flex flex-col items-center justify-center text-black">
            <!-- <i class="fas fa-info"></i> -->
            <span class="text-2xl">i</span>
        </div>
    {/if}
    <div class="w-full text-center">RAHUL M. NAVNEETH DISCONNECTED</div>
</div>

