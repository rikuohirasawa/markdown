import { writable } from 'svelte/store';

export const htmlStore = writable(true);

export const toggleHtml = () => {
    htmlStore.update($html => {
        $html = !$html;
        return $html;
    });
};