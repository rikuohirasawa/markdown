<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
    import { page } from "$app/stores";
    import { type Reaction } from "$lib/utils";
    
    export let reactions: Reaction[];
    const dispatch = createEventDispatcher();
    const formAction:
        SubmitFunction<Record<string, unknown> 
        | undefined, Record<string, unknown> 
        | undefined>
        = async () => {
            try {   
                return async (res: any) => {
                    dispatch("addReaction", res.result.data.content);
                }
            } catch (error) {

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