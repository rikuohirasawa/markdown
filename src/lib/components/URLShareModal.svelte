<script lang="ts">
    import toast from "svelte-french-toast";
    import Icon from "@iconify/svelte"
    import Modal from "./ui/Modal.svelte";
    import CopyIcon from "../../assets/icons/copy.json";

    export let showModal = false;
    let staticShareURL = "";
    let dynamicShareURL = "";
</script>

<Modal bind:showModal>
	<div slot="header">
        <h2>Work Saved</h2>
        <p class="text-light">Use the link below to share your work </p>
        <p class="text-light" style="font-size: 12px;">NOTE: navigator.clipboard does not work on http - so its not working here but just imagine it copies to your clipboard and a toast appears</p>
	</div>
    <div class="url-wrapper">
        <a href={dynamicShareURL} target="_blank">{dynamicShareURL}</a>
        <button 
            disabled
            style="cursor: not-allowed;"
            class="clipboard-button"
            on:click={()=>{
                navigator.clipboard.writeText(dynamicShareURL);
                toast.success("Copied to clipboard", { position: "top-center" });
            }}
        >
            <Icon icon={CopyIcon} width="20" color="var(--bg-primary)"/>
        </button>
    </div>
</Modal>

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

    .buttons-row {
        display: flex;
        gap: 8px;
        align-items: center;
        padding-bottom: 4px;
    }
    
</style>