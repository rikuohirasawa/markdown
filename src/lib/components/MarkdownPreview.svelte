<script lang="ts">
    import { marked } from "marked";
    import DOMPurify from "isomorphic-dompurify";
    import { htmlStore } from "$lib/stores/html";
    export let markdown = "";
    let compiledMarkdown = "";

    // escape html fx - https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript
    const escapeHTML = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');

    const parseMarkdown = async (md: string) => {
        let parsedMarkdown = await marked.parse(md);
        if ($htmlStore) {
            // if html is enabled sanitize the HTML
            compiledMarkdown = DOMPurify.sanitize(parsedMarkdown);
        } else {
            // else - use regex to escape HTML tags and render plain text while still rendering markdown
            compiledMarkdown = await marked.parse(escapeHTML(md));
        }
    };
    $: markdown, $htmlStore, parseMarkdown(markdown);

</script>

<div>{@html compiledMarkdown}</div>

<style>

    div {
        height: 100vh;
        width: 50%;
        padding: 12px;
        overflow-y: auto;
        background: var(--bg-secondary);
    }

</style>