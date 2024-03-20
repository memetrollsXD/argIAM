<script lang="ts">
  import { browser } from '$app/environment';

  let isShiftDown = false;
  let curData: {
    isHackerTaken: boolean;
    isInsiderTaken: boolean;
    curIp: string;
    curRole: string;
  } | null = null;

  function insider() {
    fetch('/api/_notpartofthechallenge/rolestatus', {
      method: 'POST',
      body: JSON.stringify({
        role: 'insider'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      window.location.href = '/insider';
    });
  }

  function hacker() {
    fetch('/api/_notpartofthechallenge/rolestatus', {
      method: 'POST',
      body: JSON.stringify({
        role: 'hacker'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      window.location.href = '/hacker';
    });
  }

  function reset() {
    fetch('/api/_notpartofthechallenge/rolestatus', {
      method: 'DELETE'
    }).then(() => {
      window.location.reload();
    });
  }

  if (browser) {
    window.addEventListener('keydown', (e) => {
      if (e.shiftKey) isShiftDown = true;
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'Shift') isShiftDown = false;
    });

    function update() {
      fetch('/api/_notpartofthechallenge/rolestatus')
        .then((res) => res.json())
        .then((data) => {
          curData = data;
        });
    }

    update();
    setInterval(update, 1000);
  }
</script>

<div class="main-container">
  <h1>argIAM</h1>
  <p>2-person CTF: 1 insider, 1 hacker. Choose a role and your IP will be bound to the role.</p>
  <div class="btn-container">
    {#if curData}
      {#if !curData.isInsiderTaken}
        <button on:click={insider}>Insider</button>
      {:else if curData.curRole === 'insider'}
        <button on:click={insider}>Insider (you)</button>
      {:else}
        <button disabled>Insider (taken)</button>
      {/if}

      {#if !curData.isHackerTaken}
        <button on:click={hacker} class="hacker">Hacker</button>
      {:else if curData.curRole === 'hacker'}
        <button on:click={hacker} class="hacker">Hacker (you)</button>
      {:else}
        <button disabled class="hacker">Hacker (taken)</button>
      {/if}
    {:else}
      <p>(Loading...)</p>
    {/if}

    {#if isShiftDown}
      <button class="reset" on:click={reset}>Reset roles</button>
    {/if}
  </div>
</div>

<style>
  :global(html) {
    background: black;
  }

  button {
    background: #1beab6;
    border: none;
    border-radius: 5px;
    color: black;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    box-shadow: 0 0 10px #1beab6;
    margin: 1rem 1.5rem;
  }

  .hacker {
    background: #ea1b4f;
    box-shadow: 0 0 10px #ea1b4f;
  }

  .reset {
    background: red;
    box-shadow: 0 0 10px red;
    color: white;
  }

  .btn-container {
    display: flex;
    justify-content: space-around;
  }

  :global(html) {
    background: black;
  }

  .main-container {
    color: white;
    font-family: monospace;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
    text-align: center;
  }
</style>
