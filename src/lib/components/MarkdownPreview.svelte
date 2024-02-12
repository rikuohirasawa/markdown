<script lang="ts">
    import { htmlStore } from "$lib/stores/html";
    import { parseMarkdown } from "$lib/utils";
    export let markdown = "";
    let compiledMarkdown = "";


    const updateMarkdown = async (md: string, htmlMode: boolean) => {
        compiledMarkdown = await parseMarkdown(md, htmlMode);
    };

    $: markdown, $htmlStore, updateMarkdown(markdown, $htmlStore);

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