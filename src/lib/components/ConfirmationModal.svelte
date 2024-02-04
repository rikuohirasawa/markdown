<script lang="ts">
    import Modal from "./ui/Modal.svelte";
    export let showModal: boolean;
</script>

<Modal 
    bind:showModal
>
    <h2 slot="header">Input some code to save your work</h2>
</Modal>