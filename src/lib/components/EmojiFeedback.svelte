<script lang="ts">
    export let emoji = '';
</script>

  <div class="emoji-animation" 
  >
    {emoji}
  </div>

<style>
    .emoji-animation {
      font-size: 2rem;
      position: fixed;
      top: 20%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: popAndFade 1.25s ease forwards;
    }
    @keyframes popAndFade {
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