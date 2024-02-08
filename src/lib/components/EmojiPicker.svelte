<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';
    import { createPopover, melt } from '@melt-ui/svelte';
    import { fade } from 'svelte/transition';
    import Icon from "@iconify/svelte"

	import { enhance } from '$app/forms';
    import { page } from "$app/stores";
    import toast from "svelte-french-toast";
    import type { ActionResultExtended } from '$lib/utils';
	import type { SubmitFunction } from '@sveltejs/kit';
    
    let form: HTMLFormElement;
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

    const { 
        elements: { trigger, content, arrow, close },
        states: { open },
    } = createPopover({
        forceVisible: true,
    });
  </script>

    <button class="emoji-picker-toggle" use:melt={$trigger}>
        <Icon icon="mdi:add-bold" width="16"/>
    </button>
  
  {#if importEmojiPickerImported && $open}
    <form 
        use:melt={$content}
        transition:fade={{ duration: 100 }}
        bind:this={form}
        method="POST" 
        action="?/addReaction"
        use:enhance={formSubmitHandler}
    >
        <input type="hidden" name="content" bind:this={emojiElement} />
        <input type="hidden" name="uuid" value={$page.url.pathname.substring(1)} />
        <emoji-picker on:emoji-click={handleClickEmoji} class="dark" />
    </form>
  {/if}

  <style>

    button {
        padding: 4px 8px;
        height: 30px;
        margin: 0;
        background: var(--bg-dark);
        color: var(--text-light);
        border-radius: 4px;
    }

    form {
        position: absolute;
        top: 0%;
        right: 100%;
    }

    emoji-picker {
        border-radius: 8px;
        top: 0;
    }

  </style>
  