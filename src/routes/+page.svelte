<script lang="ts">
    import Editor from "$lib/components/Editor.svelte";
    import { enhance } from "$app/forms";
    import Modal from "$lib/components/ui/Modal.svelte";
    import Preview from "$lib/components/Preview.svelte";
    export let data;
    export let form;
    export let markdownContent = "";

    let loading = false;
    const formAction = (input: any) => {
        // console.log(input)
        loading = true;
        return async (res: any) => {
            const { update } = res;
            console.log(res.result.data)
            loading = false;
            await update();
        }
    }
    if (form) {
        console.log(form)
    }
</script>
<Editor 
    
    />
<form method="POST" action="?/create" use:enhance={formAction}>
    <label>add a toto:

        <input name="description"
        />
    </label>
    <button type="submit">submit</button>

</form>
