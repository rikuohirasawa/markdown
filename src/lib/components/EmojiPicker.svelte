<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';
    import { apiInstance } from '$lib/utils';
    import { type Reaction } from '$lib/utils';
    export let markdownId: string;
    export let reactionsArray: Reaction[];
    let importEmojiPicker: any;

    const dispatch = createEventDispatcher();
    
    onMount(() => {
      // Dynamically import the emoji picker to ensure it's client-side only
      import('emoji-picker-element')
        .then((module) => {
            console.log(module);
            importEmojiPicker = module.Picker;
        })
        .catch(console.error);
    });

    const handleClickEmoji = async (event: any) => {
        const emoji = event.detail.unicode;
        try {
            const response = await apiInstance("insertReaction", {
                emoji,
                markdown_id: markdownId,
            });
            dispatch("addReaction", {
                content: response.content,
            })
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    };
  
  </script>
  <div>
    <button class="emoji-picker-toggle">+</button>
  </div>
  
  {#if importEmojiPicker}
    <emoji-picker 
        on:emoji-click={handleClickEmoji}
        class="dark"
    />
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
/* 
    .tooltip:not(.shown) {
          display: none;
      } */
      
  </style>
  