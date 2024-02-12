<script lang="ts">
    import { type Reaction } from "$lib/utils";
    import DarkModeButton from "$lib/components/DarkModeButton.svelte";

    export let data: { uuid: string, content: string, reactions: Reaction[] };
    const { content, uuid, reactions } = data;
</script>

<div>
    {@html content}
</div>
<footer>
    <DarkModeButton iconSize={20}/>
</footer>

<style>
        div {
            height: 94%;
            padding: 16px;
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