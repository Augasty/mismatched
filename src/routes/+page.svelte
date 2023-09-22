<script>
  // @ts-nocheck

  import { createGrid, matchCards, selectCard } from "./functions";
  import { selected, matches, toggleValue } from "./store";
  import Toggle from "./Toggle.svelte";
  import "./page.css";

  let selected_value;
  let matched_values;
  let curr_toggleValue;

  toggleValue.subscribe((value) => {
    curr_toggleValue = value;
  });
  selected.subscribe((value) => {
    selected_value = value;
  });
  matches.subscribe((value) => {
    matched_values = value;
  });

  let time;
  let state = "start";
  let size = 8;
  let timerId = null;

  $: grid = state !== "start" ? createGrid(size) : null;
  $: time = size * 2 + 4;

  // game running functions
  function startGameTimer() {
    function countdown() {
      state === "playing" && (time -= 1);
      // console.log(time, "xx");
    }

    timerId = setInterval(countdown, 1000);
  }

  function resetGame() {
    timerId && clearInterval(timerId);
    selected.update(() => []);
    matches.update(() => []);
    timerId = null;
    time = size * 2 + 4;
    // console.log(grid)
  }
  function gameWon() {
    state = "won";
    resetGame();
  }
  function gameLost() {
    state = "lost";
    resetGame();
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
  $: time == -1 && gameLost();
  $: if ((matched_values.length * 2) / size == 1) {
    setTimeout(() => gameWon(), 500);
  }
</script>

<!-- UI -->
{#if state === "start"}
  <h1>mismatched</h1>
  <div class="range">
    <input type="range" min="8" max="40" step="4" bind:value={size} />
    <p class="grid-size-text">Grid Size: {size}</p>
  </div>
  <p class="grid-size-text">Use {curr_toggleValue?'face':'animal'} emojis</p>
  <Toggle />

  <button class="bgbutton" on:click={() => (state = "playing")}>Play</button>
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

{#if state === "lost" || state === "won"}
  <h1>You {state}! {state == "won" ? "🎉🎊" : "💩🫠"}</h1>
  <div class="range">
    <input type="range" min="8" max="40" step="4" bind:value={size} />
    <p class="grid-size-text">Grid Size: {size}</p>
  </div>
  <button class="bgbutton" on:click={() => (state = "playing")}
    >Play again</button
  >
{/if}
