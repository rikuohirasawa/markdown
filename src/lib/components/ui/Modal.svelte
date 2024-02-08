<script lang="ts">
	import Icon from "@iconify/svelte"

	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<!-- svelte-ignore a11y-autofocus -->
		<button 
			autofocus 
			on:click={() => dialog.close()}
			class="close-btn"
		>
			<Icon icon="material-symbols:close" width="18" color="var(--text-light)"/>
		</button>
		<!-- <hr /> -->
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
		margin: 0;
		position: fixed;
		top: 50vh;
		left: 50vw;
        transform: translate(-50%, -50%);
		background: var(--bg-dark);
		color: var(--text-light);
	}
	hr {
		border: none;
		border-top: 1px solid var(--white-med);
	
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
		position: relative;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
        from {
            transform: scale(0.95) translate(-50%, -50%);
        }
        to {
            transform: scale(1) translate(-50%, -50%);
        }
    }
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 30px;
		width: 30px;
		border-radius: 50%;
		background: var(--bg-dark-subtle);
		position: fixed;
		top: 5%;
		right: 2%;
	}
</style>