<script lang="ts">
    import Icon from "@iconify/svelte"
    export let uuid: string;
</script>

<button type="submit">
    {uuid ? "Save your work" : "Share your work"}
    <Icon icon={uuid ? "mdi:content-save" : "mdi:share" } width="16"/>
</button>

<style>
    button {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: var(--accent-green);

        &:hover {
            opacity: 0.8;
        }
    }
</style>