<script lang="ts">
    import toast from "svelte-french-toast";
    import Icon from "@iconify/svelte"
    import CopyIcon from "../../assets/icons/copy.json";

    export let url: string;
</script>

<div class="url-wrapper">
    <a href={url} target="_blank">{url}</a>
    <button 
        disabled
        style="cursor: not-allowed;"
        class="clipboard-button"
        on:click={()=>{
            navigator.clipboard.writeText(url);
            toast.success("Copied to clipboard", { position: "top-center" });
        }}
    >
    <Icon icon={CopyIcon} width="20" color="var(--bg-primary)"/>
    </button>
</div>

<style>
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
    }
    ::-webkit-scrollbar-track {
        background: #888; 
        border-radius: 12px;
    }
    ::-webkit-scrollbar-thumb {
        height: 2px;
    }
</style>