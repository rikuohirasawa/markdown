<script lang="ts">
  import { onMount } from "svelte";

    export let emoji = '';

    let style = "opacity: 1;";

    onMount(() => {
          style = `animation: popAndFade 1.25s ease forwards;
          position: fixed;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;`;
      });
</script>

  <div class="emoji-animation" {style}
  >
    {emoji}
  </div>

<style>
    @keyframes -global-popAndFade {
    0% {
      transform: translateX(-50%) scale(0);
      opacity: 1;
    }
    20% {
      transform: translateX(-50%) scale(1.2);
      opacity: 1;
    }
    40% {
      transform: translateX(-50%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateX(-50%) translateY(-800px) scale(1); /* Adjust this value based on your screen size */
      opacity: 0;
    }
  }
  </style>