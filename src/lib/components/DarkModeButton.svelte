<script lang="ts">
    import { theme, toggleDarkMode } from "$lib/stores/theme";
    import Icon from "@iconify/svelte";
    import SunIcon from "../../assets/icons/sun.json";
    import MoonIcon from "../../assets/icons/moon.json";

    export let iconSize = 16;
</script>

<button on:click={toggleDarkMode} type="button">
    {#if $theme.darkMode}
        <Icon icon={SunIcon} width={iconSize} color="var(--accent-green)"/>
    {:else}
        <Icon icon={MoonIcon} width={iconSize}/>
    {/if}
</button>

<style>
    button {
        height: 100%;
        padding: 0px 8px;
        background: inherit;
    }
</style>