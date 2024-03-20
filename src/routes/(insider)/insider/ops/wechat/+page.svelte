<script lang="ts">
  import { onMount } from 'svelte';
  import ChatItem from './ChatItem.svelte';

  async function getInitialMessages(): Promise<{ name: string; sender: string; content: string; }[]> {
    const _rsp = await fetch('/api/_notpartofthechallenge/datingsim');
    const rsp = await _rsp.json();

    return rsp.messages;
  }
</script>

<main>
  <h1>WeChat Collaboration Platform</h1>

  <div class="messages">
    {#await getInitialMessages()}
      <p>Loading...</p>
    {:then messages}
      {#each messages as message}
        <ChatItem {message} />
      {/each}
    {/await}
  </div>

  <div class="input">
    <input placeholder="Chat is only open during work hours" disabled/>
    <button>Send</button>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    width: 100%;
  }

  .messages {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    width: 80%;
    height: 80vh;
    overflow-y: scroll
  }

  .input {
    display: flex;
    gap: 10px;
    width: 80%;
  }

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
