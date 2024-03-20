<script lang="ts">
  import { browser } from '$app/environment';

  if (browser) {
    document.querySelector('html')!.style.backgroundColor = 'black';
  }
</script>

<div class="main-container">
  <h1>Insider</h1>
  <p>
    You are an employee at [REDACTED]. Your job is to help the hacker get inside without raising any
    red flags
  </p>
  <p>You may share information, but you may <u>NOT</u> share your own credentials.</p>
  <a href="/insider/ops/login">Log in with insider@arg.iam:insider</a>
</div>

<style>
  h1, a {
    color: #1beab6;
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
