<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { SubmitFunction } from "@sveltejs/kit";
	import { enhance } from '$app/forms';
    import { page } from "$app/stores";
    import toast from "svelte-french-toast";
    import { v4 as uuidv4 } from 'uuid';
    import { type Reaction, type ActionResultExtended, type SelectedReaction } from "$lib/utils";
    import { clickedReactions } from "$lib/stores/clickedReactions";

    export let reactions: Reaction[];
    let emojiElement: HTMLInputElement;

    let selectedReaction: SelectedReaction;
    const onClickEmoji = (reaction: Reaction) => {
        if ($clickedReactions.has(reaction.emoji.trimEnd())) {
            return toast.error("You've already sent this reaction!", {
                position: "top-center",
                icon: "😔"
            });
        };
        emojiElement.value = reaction.emoji;
        selectedReaction = { emoji: reaction.emoji, feedbackId: uuidv4()};
        $clickedReactions.add(reaction.emoji.trimEnd());
    };
    const dispatch = createEventDispatcher();
    const formSubmitHandler: SubmitFunction = () => {
        try {
            return ({ result }) => {
                const res = result as ActionResultExtended;
                dispatch("addReaction", {
                    content: res.data.content,
                    selected: selectedReaction,
                });
            };
        } catch (error) {
            toast.error("Failed to add reaction", {
                position: "top-center",
                icon: "😔"
            });
        }
    };
</script>
    
{#if reactions.length > 0} 
    <form method="POST" action="/[slug]?/addReaction" use:enhance={formSubmitHandler}>
        <input type="hidden" name="content" bind:this={emojiElement}/>
        <input type="hidden" name="uuid" value={$page.url.pathname.substring(1, 37)} />
            {#each reactions as reaction (reaction.emoji)}
                <button type="submit" on:click={()=>onClickEmoji(reaction)} class:clicked={$clickedReactions.has(reaction.emoji.trimEnd())}>
                    <span class="emoji">{reaction.emoji.trimEnd()}</span>
                    <span>{reaction.count}</span>
                </button>
            {/each}
    </form>
{/if}

<style>

    form {
        display: flex;
        justify-content: center;
        gap: 10px;
        
        @media screen and (max-width: 875px){
            bottom: 50%;
            flex-direction: column;
        }
    }
    button {
        padding: 4px 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        height: 30px; 
        font-weight: 200;
        background: var(--bg-primary);
        color: var(--text-light);
    }

    .clicked {
        pointer-events: none;
        border: 1px solid var(--accent-green);
        opacity: 0.7;
    }

    .emoji {
        font-size: 1.25rem;
    }
    
</style>