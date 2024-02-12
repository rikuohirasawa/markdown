<script lang="ts">
    import toast from "svelte-french-toast";
    import type { SubmitFunction } from "@sveltejs/kit";
    import Icon from "@iconify/svelte"
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";
    import type { ActionResultExtended } from "$lib/utils";
    import MarkdownPreview from "./MarkdownPreview.svelte";
    import ShareButton from "./ShareButton.svelte";
	import DarkModeButton from "./DarkModeButton.svelte";
    import ToggleHtmlButton from "./ToggleHTMLButton.svelte";
    import { createCollapsible, melt } from '@melt-ui/svelte';
    import { slide } from 'svelte/transition';
    import ChevronUpIcon from "../../assets/icons/chevronUp.json";
    import ChevronDownIcon from "../../assets/icons/chevronDown.json";
    import UrlShareModal from "./URLShareModal.svelte";

    let showModal = false;
    let shareableURL = "";
    
    export let markdownContent = "";

    // on homepage this will assign an empty string - for which a condition exists in the backend
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

<UrlShareModal bind:showModal dynamicShareURL={shareableURL}/>
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
                <div class="buttons-row">
                    <DarkModeButton />
                    <ToggleHtmlButton />
                </div>
                <ShareButton {uuid} />
            </div>
            {/if}
        </div>
    </form>
    <MarkdownPreview markdown={markdownContent}/>
</div>

<style>
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

    .buttons-row {
        display: flex;
        gap: 8px;
        align-items: center;
        padding-bottom: 4px;
    }
    
</style>