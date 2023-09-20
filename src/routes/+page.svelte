<script>
  import { createGrid } from "./emoji";
  const statetype = ["start", "playing", "paused", "won", "lost"];

  let state = statetype[0];
  let size = 20
  $: grid = state !== "start" ? createGrid(size) : null;
  if (grid){

    let maxMatches = grid.length / 2;
  }

  let selected = [];
  let matches = [];

  $:console.log(size,grid);

  // range update
  let cursize = 20
  function handleRangeInput(event) {
    cursize = event.target.value;
  }
  
</script>








{#if state === "start"}
  <h1>mismatched</h1>
  <div class="range">

    <input type="range" min="10" max="80" step="5" bind:value={size} on:input={handleRangeInput}/>
    <p>Selected value: {size}</p>
  </div>
  <button on:click={() => (state = "playing")}>Play</button>
{/if}

{#if state === "playing"}

  <h1>Match pairs</h1>
  <div class="cards">
    {#each grid as card, idx}
      <button class="card">
        <div>{card}</div>
      </button>
    {/each}
  </div>
{/if}

{#if state === "lost"}
  <h1>You lost! 💩</h1>
  <button on:click={() => (state = "playing")}>Play again</button>
{/if}

{#if state === "won"}
  <h1>You win! 💩</h1>
  <button on:click={() => (state = "playing")}>Play again</button>
{/if}


<style>
  .range {
    text-align: center;
    padding: 20px;
  }

  .cards{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.4rem;
  }

  .card {
    height: 140px;
    width: 140px;
    font-size: 4rem;
    background-color: var(--bg-2);

    &.selected{
      border: 4px solid var(--border);
    }
  }
</style>