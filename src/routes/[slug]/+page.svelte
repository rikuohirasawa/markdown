<script lang="ts">
    import Editor from "$lib/components/Editor.svelte";
    import { type Reaction } from "$lib/utils";
    import ReactionsDisplay from "$lib/components/reactions/Display.svelte";

    export let data: {  uuid: string, content: string, reactions: Reaction[] };
    const { content } = data;
</script>

<Editor markdownContent={content} />
<ReactionsDisplay {data} />
