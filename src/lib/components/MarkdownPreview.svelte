<script lang="ts">
    import { marked } from "marked";
    import DOMPurify from "isomorphic-dompurify";
    export let markdown = "";
    $: compiledMarkdown = "";
    $: (async () => {
            const parsed = await marked.parse(markdown);
            compiledMarkdown = DOMPurify.sanitize(parsed);
        })();
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