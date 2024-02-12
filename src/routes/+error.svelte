<script>
    import Icon from "@iconify/svelte";
    import { page } from "$app/stores";
    import BombIcon from "../assets/icons/bomb.json";
</script>

<div>
    <h1>{$page.status} </h1>
    <Icon icon={BombIcon} width="100" />
    <h2>{$page.error?.message}</h2>
</div>

<style>
    div {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        align-items: center;
    }
</style>
