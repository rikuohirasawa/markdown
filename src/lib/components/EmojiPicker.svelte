<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';
    import { type Reaction } from '$lib/utils';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
    import { page } from "$app/stores";

    export let markdownId: string;
    export let reactionsArray: Reaction[];
    export let form: HTMLFormElement;
    let emojiElement: HTMLInputElement;
    let importEmojiPickerImported = false;
    const dispatch = createEventDispatcher();
    
    onMount(() => {
      // Dynamically import the emoji picker to ensure it's client-side only
      import('emoji-picker-element')
        .then(() => {
            importEmojiPickerImported = true;
        })
        .catch(console.error);
    });

    const handleClickEmoji = async (event: any) => {
        // using browser native api here to avoid race condition
        emojiElement.value = event.detail.unicode;
        form.requestSubmit();
    };

    const formAction:
        SubmitFunction<Record<string, unknown> 
        | undefined, Record<string, unknown> 
        | undefined>
        = async () => {
            try {
                
                return async (res: any) => {
                    console.log(res.result.data.content);
                    dispatch("addReaction", res.result.data.content);
                }
            } catch (error) {

            }
        };
  
  </script>

  <div>
    <button class="emoji-picker-toggle">+</button>
  </div>
  
  {#if importEmojiPickerImported}
    <form 
        bind:this={form}
        method="POST" 
        action="?/addReaction"
        use:enhance={formAction}
    >
        <input type="hidden" name="content" bind:this={emojiElement}/>
        <input type="hidden" name="uuid" value={$page.url.pathname.substring(1)} />
        <emoji-picker 
            on:emoji-click={handleClickEmoji}
            class="dark"
        />
    </form>

  {/if}

  <style>

    div {
        height: 20px;
        width: 100%;
    }

    emoji-picker {
        border-radius: 2px;
        position: absolute;
        right: 0;
    }

  </style>
  