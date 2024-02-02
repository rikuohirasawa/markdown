<script lang="ts">
    export let onClick = (e: MouseEvent) => {};
</script>

<button on:click={onClick}>
    <slot></slot>
</button>