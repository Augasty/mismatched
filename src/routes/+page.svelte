<script>
// @ts-nocheck

  import { createGrid, matchCards, selectCard } from "./functions";
  import { selected, matches } from "./store";

  let selected_value;
  let matched_values;

  selected.subscribe((value) => {
    selected_value = value;
  });
  matches.subscribe((value) => {
    matched_values = value;
  });
  let state = "start";
  let size = 20;
  $: grid = state !== "start" ? createGrid(size) : null;




  // range update
  let cursize = 20;
  function handleRangeInput(event) {
    cursize = event.target.value;
  }


  $: if (grid) {
    let maxMatches = grid.length / 2;
    maxMatches === matched_values.length && gameWon();
  }
  $: selected_value.length === 2 && matchCards(grid);

  function gameWon() {
    state = "won";
  }

</script>











<!-- UI -->
{#if state === "start"}
  <h1>mismatched</h1>
  <div class="range">
    <input
      type="range"
      min="10"
      max="80"
      step="5"
      bind:value={size}
      on:input={handleRangeInput}
    />
    <p>Selected value: {size}</p>
  </div>
  <button on:click={() => (state = "playing")}>Play</button>
{/if}

{#if state === "playing"}

<h1>Match pairs</h1>
<div class="container">
  <div class="cards">
    {#each grid as card, idx}

    {@const isSelected = selected_value.includes(idx)}
        <button class="card" 
        class:selected={isSelected}        
        on:click={() => selectCard(idx)}>
          <div>{card}</div>
        </button>
      {/each}
    </div>
  </div>
  <h1>-</h1>
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

  .container {
    display: grid;

    place-content: center;
    padding: 2rem;
  }
  .cards {
    display: grid;

    place-content: center;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.4rem;
  }

  .card {
    height: 140px;
    width: 140px;
    font-size: 4rem;
    background-color: var(--bg-2);

    &.selected {
      border: 4px solid var(--border);
    }
  }
</style>
