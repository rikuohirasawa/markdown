<script lang="ts">
    import { marked } from "marked";
    import { Button } from '@svelteuidev/core';
    import Modal from "$lib/components/Modal.svelte";
    
    let showModal = false;
    export let markdownContent = "";

    $: compiledMarkdown = marked(markdownContent);

    const validateMarkdown = (text: string) => {
        if (text.trim().length === 0) {
            return false;
        };
        return true;
    };

    const callApi = async (action: string, params: { content: string }) => {
        validateMarkdown(markdownContent);
        const response = await fetch("/api", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, params })        
        });
    };

    let opened = false;
</script>

<Modal bind:showModal>
	<h2 slot="header">
		modal
		<small><em>adjective</em> mod·al \ˈmō-dəl\</small>
	</h2>
    <div>Modal content</div>
</Modal>
<div class="flex-row">
    <div class="input-container">
        <textarea 
            class=""
            bind:value={markdownContent} 
            placeholder="Enter code here"
        />
        <div class="input-footer">
            <Button on:click={async ()=>{
                // const response = await fetch("/api");
                callApi("insertURL", { content: markdownContent })
            }}>Click to share</Button>
        </div>
    </div>
    <div class="markdown-output"> 
        {@html compiledMarkdown}
    </div>
</div>

<style>
    .flex-row {
        display: flex;
    }
    .input-container {
        height: 100vh;
        width: 50%;
    }
    textarea {
        width: 100%;
        height: 90%;
        padding: 12px;
    }
    .input-footer {
        height: 100%;
        border: 1px solid green;
    }
    .markdown-output {
        width: 50%;
        border: 1px solid red;
        padding: 12px;
    }
</style>