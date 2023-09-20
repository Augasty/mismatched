<script>
  import { createGrid } from "./emoji";
  const statetype = ["start", "playing", "paused", "won", "lost"];

  let state = statetype[0];
  let size = 20;
  let grid = createGrid(size);

  let maxMatches = grid.length / 2;

  let selected = [];
  let matches = [];

  console.log(grid);
</script>

{#if state === 'start'}
<h1>mismatched</h1>
<button on:click={()=> state = 'playing'}>Play</button>
{/if}

{#if state === 'playing'}
<div class="cards">
    {#each grid as card,idx}
    <button class="cards">
        <div>{card}</div>
    </button>
    {/each}
</div>
{/if}