<script>
    import { SvelteUIProvider } from '@svelteuidev/core';
    import { Toaster } from 'svelte-french-toast'
</script>

<Toaster/>
<SvelteUIProvider withNormalizeCSS withGlobalStyles themeObserver="dark">
    <slot/>
</SvelteUIProvider>

<style>
    :global(*) {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
  }
    :global(html, body) {
        height: 100%;
        width: 100%;
        max-width: 100vw;
        overflow: hidden;
  }
</style>