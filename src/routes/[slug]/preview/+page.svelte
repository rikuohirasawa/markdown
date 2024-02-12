<script lang="ts">
    import { type Reaction, type SelectedReaction, getReactionsArray } from "$lib/utils";
    import DarkModeButton from "$lib/components/buttons/DarkModeButton.svelte";
    import EmojiPicker from "$lib/components/reactions/EmojiPicker.svelte";
    import ReactionsDisplay from "$lib/components/reactions/ReactionsDisplay.svelte";
    import EmojiFeedback from "$lib/components/reactions/EmojiFeedback.svelte";
    
    export let data: { uuid: string, content: string, reactions: Reaction[] };
    const { content, uuid, reactions } = data;
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

<div class="content">
    {@html content}
</div>
<footer>
    <DarkModeButton iconSize={20}/>
    <div class="reactions-display-wrapper">
        <div class="emoji-picker-wrapper">
            <EmojiPicker on:addReaction={addReaction} />
        </div>
        <ReactionsDisplay reactions={reactionsArray} on:addReaction={addReaction}/>
    </div>
</footer>
{#each reactionFeedbackArr as reaction}
    <EmojiFeedback emoji={reaction.emoji} />
{/each}

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
        .reactions-display-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            height: 100%;

            @media screen and (max-width: 875px){
            position: fixed;
            top: 0%;
            right: 2%;
            flex-direction: column;
        }
        }
        .emoji-picker-wrapper {
            display: flex;
            align-items: center;
            height: fit-content;
            padding: 0;
        }
</style>