<script lang="ts">
    import { marked } from "marked";
    export let markdown = "";

    $: compiledMarkdown = marked(markdown);
</script>

<div>{@html compiledMarkdown}</div>

<style>

    div {
        height: 100vh;
        width: 50%;
        padding: 12px;
        overflow-y: auto;
        background: var(--bg-dark-subtle);
    }

</style>