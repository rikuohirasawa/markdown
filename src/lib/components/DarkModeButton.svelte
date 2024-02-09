<script lang="ts">
    import { theme, toggleDarkMode } from "$lib/stores/theme";
    import Icon from "@iconify/svelte"
</script>

<button on:click={toggleDarkMode} type="button" class={$theme.darkMode ? "dark-mode" : "light-mode"}>
    {#if $theme.darkMode}
        <Icon icon="fa6-solid:sun" width="16" color="var(--bg-primary)"/>
    {:else}
        <Icon icon="fa6-solid:moon" width="16"/>
    {/if}
</button>

<style>
    button {
        height: 100%;
        padding: 0px 8px;
    }

    .dark-mode {
        background: var(--accent-green);
    }

    .light-mode {
        background: var(--accent-green);
    }
</style>