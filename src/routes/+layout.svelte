<script>
    import { SvelteUIProvider } from '@svelteuidev/core';
</script>

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
  }
</style>