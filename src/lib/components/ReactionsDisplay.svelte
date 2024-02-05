<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { type Reaction, apiInstance } from "$lib/utils";
    
    export let reactions: Reaction[];
    const dispatch = createEventDispatcher();

    const onClickReaction = async (reaction: Reaction) => {
        try {
            const response = await apiInstance("insertReaction", {
                emoji: reaction.emoji,
                markdown_id: reaction.markdown_id,
            });
            dispatch("addReaction", {
                content: response.content,
            });
        } catch (error) {
            console.log(error);
        }
    };
</script>
    
{#if reactions.length > 0} 
    {#each reactions as reaction (reaction.id)}
        <button class="reaction" on:click|once={()=>onClickReaction(reaction)}>
            <span class="emoji">{reaction.emoji.trimEnd()}</span>
            <span>{reaction.count}</span>
        </button>
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