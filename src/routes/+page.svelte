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
  let size = 4;
  $: grid = state !== "start" ? createGrid(size) : null;

  let timerId = null;
  let time = 20;

  // game running functions
  function startGameTimer() {
    function countdown() {
      state === "playing" && (time -= 1);
      console.log(time, "xx");
    }

    timerId = setInterval(countdown, 1000);
  }


  function resetGame(){
    timerId && clearInterval(timerId)
    selected.update(()=>[])
    matches.update(()=>[])
    timerId = null
    time = 20
    // console.log(grid)
    
  }
  function gameWon() {
    state = "won";
    resetGame()
  }
  function gameLost() {
    state = "lost";
    resetGame()
  }


  // reactive declearations
  $: if (grid) {
    let maxMatches = grid.length / 2;
    maxMatches === matched_values.length && gameWon();
  }
  $: selected_value.length === 2 && matchCards(grid);
  $: if (state == "playing") {
    !timerId && startGameTimer();
  }
  $: time == 0 && gameLost();
  $: ( matched_values.length * 2 / size ) == 1 && gameWon()
</script>

<!-- UI -->
{#if state === "start"}
  <h1>mismatched</h1>
  <div class="range">
    <input
      type="range"
      min="8"
      max="40"
      step="4"
      bind:value={size}
    />
    <p>Grid Size: {size}</p>
  </div>
  <button on:click={() => (state = "playing")}>Play</button>
{/if}

{#if state === "playing"}
  <h1>Match pairs</h1>



  <div class="container">

    <div class="headerContainer">
      <span class="pairs">{matched_values.length}/{size / 2} pairs found</span>
      <span class="timer" class:pulse={time <= 10}>{time}</span>
    </div>
    <div class="cards">
      {#each grid as card, idx}
        {@const isSelected = selected_value.includes(idx)}
        {@const isSelectedOrMatched =
          selected_value.includes(idx) || matched_values.includes(card)}
        {@const match = matched_values.includes(card)}

        <button
          class="card"
          class:selected={isSelected}
          class:flip={isSelectedOrMatched}
          class:matched={match}
          disabled={isSelectedOrMatched}
          on:click={() => selectCard(grid, idx)}
        >
          <div class="back" class:match>{card}</div>
        </button>
      {/each}
    </div>
  </div>
  <h1>-</h1>
{/if}

{#if state === "lost" || state ==="won"}
  <h1>You { state }! { state == "won" ? '🎉🎊':'💩🫠'}</h1>
  <div class="range">
    <input
      type="range"
      min="8"
      max="40"
      step="4"
      bind:value={size}
    />
    <p>Grid Size: {size}</p>
  </div>
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
    grid-template-columns: repeat(4, 1fr);
    gap: 0.4rem;
  }
  .back:not(.match){
      position: absolute;
      inset:0;
      display: grid;
      place-content: center;
      backface-visibility:hidden;
      rotate: y 180deg;
    }
  .card {
    height: 140px;
    width: 140px;
    font-size: 4rem;
    background-color: var(--bg-2);
    transition: rotate 0.3s ease-out;
    transform-style: preserve-3d;


    &.selected {
      border: 4px solid var(--border);
      rotate: y 180deg;
      pointer-events: none;
    }

    &.matched {
      pointer-events: none;
    }

    & .match {
      transition: opacity 0.3s ease-out;
      opacity: 0.4;
    }
  }

  .headerContainer {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Two equal columns */
    grid-template-rows: auto; /* Rows auto-adjust to content */
    place-content: center;
    padding: 2rem;
  }
  .pairs {
    grid-column: 1;
  }
  .timer {
    grid-column: 2;
    transition: color 0.3s ease;
    justify-self: end;
  }

  .pulse {
    color: var(--pulse);
    animation: pulse 1s infinite ease;
  }
  @keyframes pulse{
    to{scale:1.4}
  }
</style>
