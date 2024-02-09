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
	import DarkModeButton from "./DarkModeButton.svelte";
    import { createCollapsible, melt } from '@melt-ui/svelte';
    import { slide } from 'svelte/transition';
    import ChevronUpIcon from "../../assets/icons/chevronUp.json";
    import ChevronDownIcon from "../../assets/icons/chevronDown.json";
    import CopyIcon from "../../assets/icons/copy.json";

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

    const {
        elements: { root, content, trigger },
        states: { open },
    } = createCollapsible({ defaultOpen: true });
</script>

<Modal bind:showModal>
	<div slot="header">
        <h2>Work Saved</h2>
        <p class="text-light">Use the link below to share your work</p>
	</div>
    <div class="url-wrapper">
        <a href={shareableURL} target="_blank">{shareableURL}</a>
        <button 
            class="clipboard-button"
            on:click={()=>{
                navigator.clipboard.writeText(shareableURL);
                toast.success("Copied to clipboard", { position: "top-center" });
            }}
        >
            <Icon icon={CopyIcon} width="20" color="var(--bg-primary)"/>
        </button>
    </div>
    <p class="text-light">Make sure to save your link somewhere safe - as this is the only time you will have access to it</p>
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
                autofocus
                name="content"
                placeholder="Enter markdown here"
                bind:value={markdownContent}
                />
            <div use:melt={$root}>
                <button type="button" use:melt={$trigger} class="toggle-collapse">
                    {#if $open}
                        <Icon icon={ChevronDownIcon} width="16" color="var(--white-med)"/>
                    {:else}
                        <Icon icon={ChevronUpIcon} width="16" color="var(--white-med)"/>
                    {/if}
                </button>
            </div>
            {#if $open}
            <div class="form-footer" use:melt={$content} transition:slide>
                <DarkModeButton />
                <ShareButton {uuid} />
            </div>
            {/if}
        </div>
    </form>
    <MarkdownPreview markdown={markdownContent}/>
</div>

<style>
    /* modal styles */

    .text-light {
        font-weight: 200;
    }
    .url-wrapper {
        display: flex;
        justify-content: center;
        gap: 20px;
        align-items: center;
        padding: 1rem;
        background: var(--bg-secondary);
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
        background: var(--accent-green);
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

    .toggle-collapse {
        border-top: 1px solid var(--white-soft);
        background: var(--bg-primary);
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 4px 12px;
        border-radius: 0;
    }
    .form-footer {
        border-top: 1px solid var(--white-soft);
        background: var(--bg-primary);
        height: fit-content;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        max-height: 40px;
    }
    
</style>