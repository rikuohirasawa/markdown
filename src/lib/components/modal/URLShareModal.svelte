<script lang="ts">
    import Modal from "./Modal.svelte";
    import URLwrapper from "./URLwrapper.svelte";

    export let showModal = false;
    export let dynamicShareURL = "";
    $: staticShareURL = dynamicShareURL + "/preview";

</script>

<Modal bind:showModal>
	<div slot="header">
        <h2>Work Saved</h2>
        <p class="text-light">Use the link below to share your work </p>
	</div>
    <URLwrapper url={staticShareURL}/>
    <p class="text-light">Or make changes to your work here</p>
    <URLwrapper url={dynamicShareURL}/>
    <p class="text-light" style="font-size: 12px;">NOTE: navigator.clipboard does not work on http - so its not working here but just imagine it copies to your clipboard and a toast appears</p>
</Modal>

<style>
    .text-light {
        font-weight: 200;
    }
    
</style>