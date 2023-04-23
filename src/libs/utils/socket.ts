import { ws } from "../stores/ws";
import { io } from "socket.io-client";

export const getSocket = async () => {
    const client = io("ws://localhost:5174")
    ws.set(client)
}
