<script lang="ts">
    import { createEventDispatcher } from "svelte";
	import { enhance } from '$app/forms';
    import { page } from "$app/stores";
    import toast from "svelte-french-toast";
    import { type Reaction, type ActionResultExtended } from "$lib/utils";
    
    export let reactions: Reaction[];
    const dispatch = createEventDispatcher();
    const formAction = async () => {
            try {   
                return async ({ result } : { result: ActionResultExtended }) => {
                    dispatch("addReaction", result.data.content);
                }
            } catch (error) {
                toast.error("Failed to add reaction", {
                    position: "bottom-center",
                    icon: "😔"
                }); 
            }
        };
</script>
    
{#if reactions.length > 0} 
    {#each reactions as reaction (reaction.id)}
        <form method="POST" action="?/addReaction" use:enhance={formAction} on:submit|once>
            <input type="hidden" name="content" bind:value={reaction.emoji}/>
            <input type="hidden" name="uuid" value={$page.url.pathname.substring(1)} />
            <button class="reaction" type="submit" on:click|once>
                <span class="emoji">{reaction.emoji.trimEnd()}</span>
                <span>{reaction.count}</span>
            </button>
        </form>
    {/each}
{/if}

<style>

    button {
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0;
    }

    .emoji {
        font-size: 1.5rem;
    }
    
</style>