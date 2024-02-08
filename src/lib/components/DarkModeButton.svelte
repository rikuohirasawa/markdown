<script lang="ts">
    import { theme, toggleDarkMode } from "$lib/stores/theme";
    import Icon from "@iconify/svelte"
</script>

<button on:click={toggleDarkMode} type="button">
    {#if $theme.darkMode}
        <Icon icon="fa6-solid:sun" width="16"/>
    {:else}
        <Icon icon="fa6-solid:moon" width="16"/>
    {/if}
</button>

<style>
    button {
        height: 100%;
        padding: 10px;
        margin-left: 2px;
    }
</style>