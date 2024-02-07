<script lang="ts">
    import toast from "svelte-french-toast";
    import type { SubmitFunction } from "@sveltejs/kit";
    import Modal from "$lib/components/ui/Modal.svelte";
    import MarkdownPreview from "./MarkdownPreview.svelte";
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";
    import type { ActionResultExtended } from "$lib/utils";

    let showModal = false;
    let shareableURL = "";
    
    export let markdownContent = "";
    let form: HTMLFormElement;

    // on homepage this will assign an empty string - which will be handled in the backend
    const uuid = $page.url.pathname.substring(1);

    const formSubmitHandler: SubmitFunction = () => {
        return ({ result }) => {
            if (result.status === 422) {
                toast.error("Enter some markdown to share", {
                    position: "bottom-center",
                    icon: "🖥️"
                });
            } else if (result.status === 204) {
                toast.success("Successfully saved your work", {
                    position: "bottom-center",
                    icon: "💾"
                });
            } else {
                const res = result as ActionResultExtended;
                shareableURL = res.data.content;
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
    <div>Your shareable link:</div>
    <a href={shareableURL} target="_blank">{shareableURL}</a>
    <div>Make sure to save your link somewhere safe - as this is the only time you will have access to it</div>
</Modal>

<div class="flex-row">
    <form 
        method="POST" 
        action="/?/saveMarkdown" 
        use:enhance={formSubmitHandler}
    >
        <input type="hidden" name="uuid" value={uuid} />
        <textarea 
            name="content"
            placeholder="Enter code here"
            bind:value={markdownContent}
            />
        <button type="submit">{uuid ? "Save your work" : "Share your work"}</button>
    </form>
    <MarkdownPreview markdown={markdownContent}/>
</div>

<style>
    
    .flex-row {
        display: flex;
    }
    form {
        width: 50%;
        height: 100vh;
    }
    textarea {
        width: 100%;
        height: 90%;
        padding: 12px;
    }
    
</style>