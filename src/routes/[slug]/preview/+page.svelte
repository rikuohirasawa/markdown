<script lang="ts">
    import { htmlStore } from "$lib/stores/html";
    import { type Reaction, parseMarkdown } from "$lib/utils";
    import DarkModeButton from "$lib/components/buttons/DarkModeButton.svelte";
    import ReactionsDisplay from "$lib/components/reactions/Display.svelte";
    import ToggleHtmlButton from "$lib/components/buttons/ToggleHTMLButton.svelte";

    export let data: { uuid: string, content: string, reactions: Reaction[] };
    const { content } = data;
    let markdown = content;

    const updateMarkdown = async (md: string, htmlMode: boolean) => {
        markdown = await parseMarkdown(md, htmlMode);
    };

    $: markdown, $htmlStore, updateMarkdown(content, $htmlStore);
</script>

<div class="content">
    {@html markdown}
</div>
<footer>
    <div class="buttons-row">
        <DarkModeButton iconSize={20}/>
        <ToggleHtmlButton />
    </div>

    <ReactionsDisplay {data} />
</footer>

<style>
        .content {
            height: 94%;
            padding: 16px;
            overflow-y: auto;
        }

        footer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 6%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0px 12px;
            background: var(--bg-secondary);
        }
</style>