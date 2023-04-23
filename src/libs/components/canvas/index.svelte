<script>
    import {page} from "$app/stores";
    import { onDestroy, onMount } from "svelte";
    import { ws } from "../../stores/ws";

    let canvas;
    let context;
    let isDrawing = false;
    let lastX;
    let lastY;

    function handleMouseDown(event) {
        isDrawing = true;
        lastX = event.offsetX;
        lastY = event.offsetY;
    }

    function handleMouseMove(event) {
        if (!isDrawing) return;
        const x = event.offsetX;
        const y = event.offsetY;
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(x, y);
        context.stroke();
        lastX = x;
        lastY = y;

        // Send cursor position to server
        // @ts-ignore
        $ws?.emit('on-draw', {id: $page.params.id, data: canvas.toDataURL(), cursor: { x, y } })
    }

    function handleMouseUp() {
        isDrawing = false;
    }

    // @ts-ignore
    $ws?.on(`concept-receive-${$page.params.id}`, (data) => {
        const img = new Image();
        img.src = data[1];
        img.onload = function() {
            context.drawImage(img, 0, 0);
        };
    })

    onMount(() => {
        canvas = document.getElementById("myCanvas");
        context = canvas.getContext("2d");

        // @ts-ignore
        $ws?.emit('concept-init', {id: $page.params.id, data: canvas.toDataURL(), usid: $ws.id })

        context.lineWidth = 100;
        context.lineJoin = "round";
        context.lineCap = "round";
        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);

        // Set canvas dimensions to match container element
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    });

    onDestroy(() => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
    });
</script>

<div class="w-screen h-full overflow-scroll">
    <canvas id="myCanvas"></canvas>
</div>
<style>
    #myCanvas {
        background-color: #fff;
        background-image: radial-gradient(rgb(192, 197, 206) 1px, rgb(237, 240, 244) 1px);
        background-size: 15px 15px;
    }
</style>
