<script lang="ts">
    import { onMount } from 'svelte';
    import { io } from 'socket.io-client';
    import { type Reaction, debounce } from "$lib/utils";
    import MarkdownPreview from '$lib/components/MarkdownPreview.svelte';

    export let data: {  uuid: string, content: string, reactions: Reaction[] };
    const { uuid, content, reactions } = data;
    export let markdownContent = content;
    let textAreaElement: HTMLTextAreaElement;

    const socket = io();

    onMount(() => {
        socket.emit("joinRoom", uuid);
    });

    const updateMarkdown = debounce(() => {
        socket.emit("updateMarkdown", { uuid, content: markdownContent});
    }, 200);

    socket.on('markdownUpdated', (res: {uuid: string, content: string}) => {
        markdownContent = res.content;
    })
</script>

<div class="flex-row">
    <textarea 
        bind:this={textAreaElement}
        on:input={updateMarkdown}
        placeholder="Enter markdown here"
        bind:value={markdownContent}
    />
    <MarkdownPreview markdown={markdownContent}/>
</div>

<style>
    .flex-row {
        display: flex;
        height: 100vh;
        width: 100%;
    }

    textarea {
        width: 50%;
        padding: 12px;
        background: var(--bg-primary);
        color: var(--text-light);
        resize: none;
        overflow-y: auto;
        border: none;
        letter-spacing: 1px;

        &:focus {
            outline: none;
        }
    }
    
</style>