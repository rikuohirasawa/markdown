<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { SubmitFunction } from "@sveltejs/kit";
	import { enhance } from '$app/forms';
    import { page } from "$app/stores";
    import toast from "svelte-french-toast";
    import { type Reaction, type ActionResultExtended } from "$lib/utils";
    
    export let reactions: Reaction[];
    const dispatch = createEventDispatcher();

    const formSubmitHandler: SubmitFunction = () => {
        try {
            return ({ result }) => {
                const res = result as ActionResultExtended;
                dispatch("addReaction", res.data.content);
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
    <div class="reactions-wrapper">
        {#each reactions as reaction (reaction.emoji)}
            <form method="POST" action="?/addReaction" use:enhance={formSubmitHandler}>
                <input type="hidden" name="content" bind:value={reaction.emoji}/>
                <input type="hidden" name="uuid" value={$page.url.pathname.substring(1)} />
                <button class="reaction" type="submit">
                    <span class="emoji">{reaction.emoji.trimEnd()}</span>
                    <span>{reaction.count}</span>
                </button>
            </form>
        {/each}
    </div>
{/if}

<style>

    .reactions-wrapper {
        display: flex;
        justify-content: center;
        gap: 10px;
    }
    button {
        padding: 4px 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        border-radius: 4px;
        height: 30px; 
        font-weight: 200;
        background: var(--bg-dark);
        color: var(--text-light);
    }

    .emoji {
        font-size: 1.25rem;
    }
    
</style>