<script lang="ts">
  import { browser } from '$app/environment';

  let host = "challengesrv";

  if (browser) {
    host = window.location.host;
    document.querySelector('html')!.style.backgroundColor = 'black';
  }
</script>

<div class="main-container">
  <h1>Hacker</h1>
  <p>You are a pentester. Your job is to get inside [REDACTED] and privesc to the top.</p>
  <p>You can <u>ONLY</u> share credentials.</p>
  <p><u>Tip: Do not target routes containing ("_notpartofthechallenge").</u></p>
</div>

<style>
  h1 {
    color: #ea1b4f;
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
