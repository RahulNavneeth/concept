import { peer } from "../stores/peer";
import { Peer } from "peerjs";

export const getPeer = async (conceptId: string) => {
    const client = new Peer(conceptId)
    peer.set(client)
}
