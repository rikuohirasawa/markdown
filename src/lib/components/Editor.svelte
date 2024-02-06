<script lang="ts">
    import toast from "svelte-french-toast";
    import Modal from "$lib/components/ui/Modal.svelte";
    import MarkdownPreview from "./MarkdownPreview.svelte";
    import { enhance } from "$app/forms";

    let showModal = false;
    let shareableURL = "";
    
    export let markdownContent = "";
    export let isSaved = false;
    export let form: HTMLFormElement;

    const formAction = async () => {
        try {
        return async (res: any) => {
            const status = res.result.status;
            if (status === 422) {
                return toast.error("Enter some text to share", {
                    position: "bottom-center",
                    icon: "🖥️"
                });
            }
            const { update } = res;
            shareableURL = res.result.data.content;
            showModal = true;
            await update();
        };
        } catch (error) {
            return toast.error("Failed to save your work");
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
    <form method="POST" action="?/saveMarkdown" use:enhance={formAction}>
        <div class="input-container">
            <textarea 
                name="content"
                class=""
                placeholder="Enter code here"
                bind:value={markdownContent}
                />
            <button type="submit">Click to share</button>
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
        height: 100vh;
    }
    .input-container {
        height: 100%;
    }
    textarea {
        width: 100%;
        height: 90%;
        padding: 12px;
    }
</style>