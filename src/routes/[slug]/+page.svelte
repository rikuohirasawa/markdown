<script lang="ts">
    import Editor from "$lib/components/Editor.svelte";
    import EmojiPicker from "$lib/components/EmojiPicker.svelte";
    import { type Reaction } from "$lib/utils";
    import ReactionsDisplay from "$lib/components/ReactionsDisplay.svelte";
    export let data: {  uuid: string, content: string, reactions: Reaction[] };
    const { content, reactions } = data;
    export let form: any;
    
    let reactionsArray = reactions;
</script>

<Editor 
    form={form}
    markdownContent={content}
/>
<div class="reactions-display-wrapper">
    <ReactionsDisplay 
        reactions={reactionsArray}
        on:addReaction={((event) => reactionsArray = event.detail)}
    />
    <div class="emoji-picker-wrapper">
        <EmojiPicker 
        on:addReaction={((event)=> reactionsArray = event.detail)}
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