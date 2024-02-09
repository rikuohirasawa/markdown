<script lang="ts">
        import Icon from "@iconify/svelte";
        import toast from "svelte-french-toast";
        import HTMLicon from "../../assets/icons/html.json";
        import { toggleHtml, htmlStore } from "$lib/stores/html";
        import { theme } from "$lib/stores/theme";
</script>

<button on:click={()=>{
    toast.success("HTML mode " + ($htmlStore ? "disabled" : "enabled"), {
        position: "top-center",
        icon: $htmlStore ? "🛑" : "✅",
    });
    toggleHtml();
    }} type="button" class={$htmlStore ? "html-enabled" : ""}>
    <Icon icon={HTMLicon} width="20" color={ $theme.darkMode ? "var(--accent-green)" : "inherit" }/>
</button>

<style>
    button {
        height: 100%;
        padding: 0px 8px;
        background: inherit;
    }

    .html-enabled {
        opacity: 0.6;
    }
</style>