<script lang="ts">
    import toast from "svelte-french-toast";
    import type { SubmitFunction } from "@sveltejs/kit";
    import Icon from "@iconify/svelte"
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";
    import type { ActionResultExtended } from "$lib/utils";
    import Modal from "$lib/components/ui/Modal.svelte";
    import MarkdownPreview from "./MarkdownPreview.svelte";
    import ShareButton from "./ShareButton.svelte";

    let showModal = false;
    let shareableURL = "";
    
    export let markdownContent = "";

    // on homepage this will assign an empty string - which will be handled in the backend
    const uuid = $page.url.pathname.substring(1);

    const formSubmitHandler: SubmitFunction = () => {
        return ({ result }) => {
            if (result.status === 422) {
                toast.error("Enter some markdown to share", {
                    position: "top-center",
                    icon: "🖥️"
                });
            } else if (result.status === 200) {
                toast.success("Successfully saved your work", {
                    position: "top-center",
                    icon: "💾"
                });
            } else if (result.status === 302) {
                const res = result as ActionResultExtended;
                shareableURL = res.location || $page.url.origin;
                showModal = true;
                markdownContent = "";
            }
        }
    };
  
</script>

<Modal bind:showModal>
	<div slot="header">
        <h2>Work Saved</h2>
        <div><small>Use the link below to share your work</small></div>
	</div>
    <div class="url-wrapper">
        <a href={shareableURL} target="_blank">{shareableURL}</a>
        <button on:click={()=>{
            navigator.clipboard.writeText(shareableURL);
            toast.success("Copied to clipboard", {
                    position: "top-center",
                });
        }}><Icon icon="solar:copy-line-duotone" width="16" color="white"/></button>
    </div>
    <div>Make sure to save your link somewhere safe - as this is the only time you will have access to it</div>
</Modal>

<div class="flex-row">
    <form 
        method="POST" 
        action="/?/saveMarkdown" 
        use:enhance={formSubmitHandler}
    >
        <input type="hidden" name="uuid" value={uuid} />
        <div class="flex-col">
            <textarea 
                name="content"
                placeholder="Enter markdown here"
                bind:value={markdownContent}
                />
            <div class="form-footer">
                <ShareButton {uuid} />
            </div>
        </div>
    </form>
    <MarkdownPreview markdown={markdownContent}/>
</div>


<style>

    /* modal styles */
    .url-wrapper {
        display: flex;
        justify-content: center;
        gap: 20px;
        align-items: center;
        padding: 1rem;
        background: var(--bg-dark-subtle);
        border-radius: 6px;
    }
    .url-wrapper a {
        color: inherit;
        overflow-x: auto;
        white-space: nowrap;
        padding: 8px;
    }

    .url-wrapper button {
        padding: 10px;
        border-radius: 4px;
        background: var(--bg-dark);
        outline: none;
        border: none;
        cursor: pointer;

        &:hover {
            opacity: 0.8;
        }
    }

    ::-webkit-scrollbar {
        width: 4px;
        height: 4px;
        border-radius: 12px;

    }
    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }
    ::-webkit-scrollbar-thumb {
        background: #888; 
        border-radius: 12px;
        height: 2px;
    }
    .flex-row {
        display: flex;
    }
    form {
        width: 50%;
    }
    .flex-col {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    textarea {
        width: 100%;
        flex-grow: 1;
        padding: 12px;
        background: var(--bg-dark);
        color: var(--text-light);
        resize: none;
        overflow-y: auto;
        border: none;

        &:focus {
            outline: none;
        }
    }

    .form-footer {
        border-top: 1px solid var(--white-soft);
        background: var(--bg-dark);
        height: fit-content;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        max-height: 40px;
    }
    button {
        padding: 10px 25px;
    }
    
</style>