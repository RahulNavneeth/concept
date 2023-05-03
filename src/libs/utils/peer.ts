import { peer } from "../stores/peer";
import { Peer } from "peerjs";

export const getPeer = async (conceptId: string) => {
    const client = new Peer(conceptId, {
        key: "peerjs",
    })
    console.log(client, conceptId)
    peer.set(client)
}
