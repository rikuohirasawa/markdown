<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';
    import { page } from "$app/stores";
    import toast from "svelte-french-toast";
    import type { ActionResultExtended } from '$lib/utils';
    
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

    const formAction = async () => {
            try {
                return async ({ result }: { result: ActionResultExtended }) => {
                    dispatch("addReaction", result.data.content);
                };
            } catch (error) {
                return toast.error("Failed to add reaction", {
                    position: "bottom-center",
                    icon: "😔"
                }); 
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
  