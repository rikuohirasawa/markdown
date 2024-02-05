<script lang="ts">
    import Editor from "$lib/modules/Editor.svelte";
    import EmojiPicker from "$lib/components/EmojiPicker.svelte";
    import { type Reaction } from "$lib/utils";
    import ReactionsDisplay from "$lib/components/ReactionsDisplay.svelte";

    export let data: {  uuid: string, content: string, reactions: Reaction[] };
    const { content, uuid, reactions } = data;
    
    let reactionsArray = reactions;
</script>

<Editor 
    markdownContent={content}
    isSaved={true}
/>
<div class="reactions-display-wrapper">
    <ReactionsDisplay 
        reactions={reactionsArray}
        on:addReaction={((event) => reactionsArray = event.detail.content)}
    />
    <div class="emoji-picker-wrapper">
        <EmojiPicker 
        reactionsArray={reactionsArray}
        markdownId={uuid}
        on:addReaction={((event)=> reactionsArray = event.detail.content)}
    />
    </div>
</div>

<style>

    .reactions-display-wrapper {
        position: absolute;
        top: 10%;
        right: 0;
        display: flex;
        flex-direction: column;
        max-width: 8vw;
        border: 1px solid;
    }

    .emoji-picker-wrapper {
        position: relative;
    }
    
</style>