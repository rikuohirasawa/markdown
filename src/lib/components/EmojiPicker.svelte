<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';
    import { createPopover, createTooltip, melt } from '@melt-ui/svelte';
    import { fade } from 'svelte/transition';
    import Icon from "@iconify/svelte";
    import { v4 as uuidv4 } from 'uuid';
	import { enhance } from '$app/forms';
    import { page } from "$app/stores";
    import toast from "svelte-french-toast";
    import type { ActionResultExtended, SelectedReaction } from '$lib/utils';
	import type { SubmitFunction } from '@sveltejs/kit';
    import AddIcon from "../../assets/icons/add.json";
    
    let form: HTMLFormElement;
    let emojiElement: HTMLInputElement;
    let importEmojiPickerImported = false;
    let selectedReaction: SelectedReaction;
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
        selectedReaction = { emoji: event.detail.unicode, feedbackId: uuidv4()};
        form.requestSubmit();
    };

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

    const { 
        elements: { trigger, content, arrow, close },
        states: { open },
    } = createPopover({
        forceVisible: true,
    });

    // tooltip triggers - prefixed by tt
      const {
            elements: { trigger: ttTrigger, content: ttContent, arrow: ttArrow },
            states: { open: ttOpen },
        } = createTooltip({
            positioning: {
                placement: 'left',
            },
            openDelay: 0,
            closeDelay: 0,
            closeOnPointerDown: false,
            forceVisible: true,
        });

  </script>

    <button class="emoji-picker-toggle" use:melt={$trigger} use:melt={$ttTrigger}>
        <Icon icon={AddIcon} width="16"/>
    </button>
    {#if $ttOpen}
        <div class="tooltip" use:melt={$ttContent} transition:fade={{duration: 100}}>
            <div use:melt={$ttArrow}/>
            <div>Add reaction</div>
        </div>
    {/if}
  
  {#if importEmojiPickerImported && $open}
    <form 
        use:melt={$content}
        transition:fade={{ duration: 100 }}
        bind:this={form}
        method="POST" 
        action="/[slug]?/addReaction"
        use:enhance={formSubmitHandler}
    >
        <input type="hidden" name="content" bind:this={emojiElement} />
        <input type="hidden" name="uuid" value={$page.url.pathname.substring(1, 37)} />
        <emoji-picker on:emoji-click={handleClickEmoji} class="dark" />
    </form>
  {/if}

  <style>

    button {
        padding: 4px 8px;
        height: 30px;
        background: var(--bg-primary);
        color: var(--text-light);
    }

    .tooltip {
        width: fit-content;
        background: var(--bg-primary);
        font-size: 12px;
        padding: 8px;
        border-radius: 2px;
    }

    form {
        position: absolute;
        top: 0%;
        right: 100%;

        @media screen and (max-width: 875px){
            left: 50%;
            right: auto;
        }
    }

    emoji-picker {
        border-radius: 8px;
        top: 0;
    }

  </style>
  