import { writable } from 'svelte/store';

export const clickedReactions = writable(new Set());

export const addClickedReaction = () => {
    clickedReactions.update((current) => {
        return current;
    });
};