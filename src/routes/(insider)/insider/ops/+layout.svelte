<script lang="ts">
  import { browser } from '$app/environment';

  console.log(
    '%c' + 'argIAM',
    'font-size: 50px; font-weight: bold; color: #44355b; text-shadow: 3px 3px 0 #fff, 6px 6px 0 #44355b'
  );
  console.log("You are not supposed to be here.")

  browser && fetch("/api/ops/auth/check").then(x => x.json()).then(x => {
    if (x.status === 200) {
      // ...
    } else {
      window.location.href = "/insider/ops/login"
    }
  });
</script>

<!-- Basic side panel -->
<div class="main-container">
  <div class="side-panel sp-left">
    <div class="header">
      <div class="logo">
        <img
          src="https://yt3.ggpht.com/XzsOUm_E4_MvUEKRL-0jQmCNmwJ6BneWtvTIh3VUqMLaFoETK55hE-i2_puMSzguEk_N7kYcRK0=s88-c-k-c0x00ffffff-no-rj"
          alt="argIAM logo"
        />
      </div>
      <div class="title">
        <h1>argIAM</h1>
      </div>
      <div class="links">
        <a href="/insider/ops">Home</a>
        <a href="/insider/ops">Ops</a>
        <a href="/insider/ops/wechat">WeChat</a>
        <a href="/insider/ops/monitoring">Performance</a>
        <a href="/insider/ops/bandera">BANDERA</a>
      </div>
    </div>
  </div>

  <slot class="side-panel sp-right" />
</div>

<style>
  :global(body) {
    margin: 0;
  }

  .main-container {
    margin: 0;
    display: flex;
    flex-direction: row;
    height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica,
      Arial, sans-serif;
  }

  .side-panel {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100%;
    background-color: #44355b;
    color: #fff;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  .logo {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .logo img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .title {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .title h1 {
    font-size: 1.5rem;
    font-weight: 400;
  }

  .links {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .links a {
    width: 100%;
    padding: 10px 0;
    text-align: center;
    text-decoration: none;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 400;
  }

  .links a:hover {
    background-color: #fff;
    color: #1a1a1a;
  }

  .sp-left {
    /* border-right: 1px solid #fff; */
  }

  .sp-right {
    padding: 20px;
  }
</style>
