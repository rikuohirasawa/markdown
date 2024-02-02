<script lang="ts">
        import Editor from "$lib/modules/Editor.svelte";
        export let data: { id: number, content: string, uuid: string };
        const { content } = data;
</script>

<Editor 
    markdownContent={content}
/>