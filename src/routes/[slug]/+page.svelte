<script lang="ts">
    import Editor from "$lib/components/Editor.svelte";
    import EmojiPicker from "$lib/components/EmojiPicker.svelte";
    import { type Reaction } from "$lib/utils";
    import ReactionsDisplay from "$lib/components/ReactionsDisplay.svelte";
    import { getReactionsArray } from "$lib/utils";
    export let data: {  uuid: string, content: string, reactions: Reaction[] };
    const { content, uuid, reactions } = data;
    let reactionsArray = getReactionsArray(uuid, reactions);
</script>

<Editor markdownContent={content} />
<div class="reactions-display-wrapper">
    <div class="emoji-picker-wrapper">
        <EmojiPicker on:addReaction={((event) => reactionsArray = getReactionsArray(uuid, event.detail))} />
    </div>
    <ReactionsDisplay reactions={reactionsArray} on:addReaction={((event) => reactionsArray = getReactionsArray(uuid, event.detail))}/>
</div>

<style>

    .reactions-display-wrapper {
        position: fixed;
        bottom: 1%;
        left: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: 50%;
    }

    .emoji-picker-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

</style>