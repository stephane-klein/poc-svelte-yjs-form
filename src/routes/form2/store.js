import { syncedStore, getYjsDoc } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";
import { svelteSyncedStore } from "@syncedstore/svelte";

// Create your SyncedStore store
export const store = syncedStore({ form: {} });
export const svelteStore = svelteSyncedStore(store);

// Create a document that syncs automatically using Y-WebRTC
const doc = getYjsDoc(store);
export const webrtcProvider = new WebrtcProvider("syncedstore-form", doc, { signaling: ["ws://localhost:4444"] });
