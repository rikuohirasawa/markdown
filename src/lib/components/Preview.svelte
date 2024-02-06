<script lang="ts">
    export let markdown: string;
    let iframe: HTMLIFrameElement;

    $: if (iframe && iframe.contentWindow) {
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(markdown);
        iframe.contentWindow.document.close();
    };
</script>

<iframe 
    bind:this={iframe} 
    title="output-preview"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-downloads allow-pointer-lock"
    />

<style>
    iframe {
        width: 50%;
        border: none;
        background: white;
    }
</style>

<!-- dummy code to test in browser

<html>
<div>hello</div>
<button>click me</button>
</html>
<script>
document.querySelector("button").addEventListener("click", ()=>{console.log("clicked")})
</script> 

-->