import { writable } from "svelte/store";

export const sidebarOpenState = writable(false);

export const toggleSidebar = () => {
    sidebarOpenState.update(state => !state);
};
