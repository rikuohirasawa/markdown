<script lang="ts">
    import { theme, toggleDarkMode } from "$lib/stores/theme";
    import Icon from "@iconify/svelte";
    import SunIcon from "../../assets/icons/sun.json";
    import MoonIcon from "../../assets/icons/moon.json";

</script>

<button on:click={toggleDarkMode} type="button">
    {#if $theme.darkMode}
        <Icon icon={SunIcon} width="16" color="var(--accent-green)"/>
    {:else}
        <Icon icon={MoonIcon} width="16"/>
    {/if}
</button>

<style>
    button {
        height: 100%;
        padding: 0px 8px;
        background: inherit;
    }
</style>