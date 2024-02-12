<script lang="ts">
    import Icon from "@iconify/svelte";
    import SaveIcon from "../../../assets/icons/save.json";
    import ShareIcon from "../../../assets/icons/share.json";

    export let uuid: string;
</script>

<button type="submit">
    {uuid ? "Save your work" : "Share your work"}
    <Icon icon={uuid ? SaveIcon : ShareIcon } width="16"/>
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