<script lang="ts">
        import { type Reaction, type SelectedReaction, getReactionsArray } from "$lib/utils";
        import EmojiPicker from "$lib/components/reactions/EmojiPicker.svelte";
        import ReactionsDisplay from "$lib/components/reactions/ReactionButtons.svelte";
        import EmojiFeedback from "$lib/components/reactions/EmojiFeedback.svelte";

        export let data: { uuid: string, content: string, reactions: Reaction[] };
        const { uuid, reactions } = data;
        let reactionsArray = getReactionsArray(uuid, reactions);
        let reactionFeedbackArr: SelectedReaction[] = [];
        
        const addReaction = (event: CustomEvent) => {
            const { selected } = event.detail;
            reactionFeedbackArr = [...reactionFeedbackArr, selected];
            setTimeout(() => {
                reactionFeedbackArr = reactionFeedbackArr.filter(e => e.feedbackId !== selected.feedbackId);
            }, 1000);
            return reactionsArray = getReactionsArray(uuid, event.detail.content);
        };
</script>
<div>
    <div class="reactions-display-wrapper">
        <div class="emoji-picker-wrapper">
            <EmojiPicker on:addReaction={addReaction} />
        </div>
        <ReactionsDisplay reactions={reactionsArray} on:addReaction={addReaction}/>
    </div>
    {#each reactionFeedbackArr as reaction}
        <EmojiFeedback emoji={reaction.emoji} />
    {/each}
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

        @media screen and (max-width: 875px){
            top: 0%;
            left: 92vw;
            width: fit-content;
            flex-direction: column;
        }
    }

    .emoji-picker-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }
</style>