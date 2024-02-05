<script lang="ts">
    import { marked } from "marked";
    import { Button } from '@svelteuidev/core';
    import toast from "svelte-french-toast";
    import Modal from "$lib/components/ui/Modal.svelte";
    
    let showModal = false;
    let shareableURL = "";
    
    export let markdownContent = "";
    export let isSaved = false;

    $: compiledMarkdown = marked(markdownContent);

    const validateMarkdown = (text: string) => {
        if (text.trim().length === 0) {
            return false;
        };
        return true;
    };

    const callApi = async (action: string, params: { content: string }) => {
        try {
            if (isSaved) {
                // update data in db instead of creating new
                console.log("saved");
        };
        if (validateMarkdown(markdownContent)) {
            const response = await fetch("/api", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, params })        
            });
            const data = await response.json();
            shareableURL = data.content;
            showModal = true;
            return;
            }
            toast.error("Enter some code to share", {
                position: "bottom-center",
                icon: "🖥️"
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to save your work");
        };
    };
</script>

<Modal bind:showModal>
	<div slot="header">
        <h2>Work Saved</h2>
        <div><small>Use the link below to share your work</small></div>
	</div>
    <div>Your shareable link:</div>
    <a href={shareableURL} target="_blank">{shareableURL}</a>
    <div>Make sure to save your link somewhere safe - as this is the only time you will have access to it</div>
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
    }
    .markdown-output {
        width: 50%;
        padding: 12px;
        border-left: 1px solid;
    }
</style>