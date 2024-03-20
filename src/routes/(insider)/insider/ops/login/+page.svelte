<script lang="ts">
  let username = '';
  let password = '';
  let errEl: HTMLParagraphElement;

  function login() {
    fetch('/api/ops/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          errEl.innerHTML = res.error;
        } else {
          // Set cookie
          document.cookie = `token=${res.sessionId}; path=/insider/ops; max-age=86400`;

          window.location.href = res.href;
        }
      });
  }
</script>

<div class="main-container">
  <div class="login-panel">
    <h1 class="login-panel-hd">Log In</h1>
    <form action="#" id="login-form">
      <input
        type="text"
        name="login"
        placeholder="Email or Username"
        aria-label="Email or Username"
        title="Email or Username"
        bind:value={username}
        class="input name-input"
      /><br />
      <input
        type="password"
        name="password"
        placeholder="Password"
        aria-label="Password"
        title="Password"
        bind:value={password}
        class="input passwd-input"
        autocomplete="off"
      />

      <p class="error" bind:this={errEl} />

      <label class="checkbox-label remember">
        <input type="checkbox" name="remember_me" class="vam remember-input" />
        <span class="vam">Remember me for 7 days </span>
      </label>

      <!-- <a href="/accounts/password/reset/" class="normal forgot-passwd">Forgot password?</a> -->

      <button type="button" on:click={login} class="submit btn btn-primary btn-block">Log In</button
      >
    </form>

    <div class="login-panel-bottom-container">Confidential - Internal Use Only</div>
  </div>
</div>

<style>
  /* Card style */
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    background-image: url('/ops_bg.jpg');
  }

  .login-panel {
    -webkit-text-size-adjust: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica,
      Arial, sans-serif;
    font-weight: 400;
    text-align: left;
    -webkit-tap-highlight-color: transparent;
    font-size: 13px;
    line-height: 1.5;
    color: #333;
    word-wrap: break-word;
    box-sizing: border-box;
    background: #f5f6f7;
    border-radius: 3px;
    padding: 20px 60px;
    width: 390px;
    margin: 0 auto;
    box-shadow: 0 0 8px #a7a6a9;
  }

  .login-panel-hd {
    font-size: 18px;
    font-weight: normal;
    text-align: center;
    margin: 5px 0 15px;
  }

  input[type='text'],
  input[type='password'] {
    margin: 0;
    border: 1px solid #cdcdcd;
    padding: 2px 10px;
    height: 36px;
    width: 248px;
    font-size: 14px;
    border-radius: 3px 3px 0 0;
    border-bottom-width: 0;
  }

  .login-panel .remember {
    margin: 20px 0 10px;
    display: block;
  }

  .login-panel .passwd-input {
    border-radius: 0 0 3px 3px;
    margin-bottom: 10px;
    box-sizing: content-box;
    display: inline-block;
  }

  .error {
    color: #ff0000;
    font-size: 12px;
    margin: 0 0 10px;
    display: block;
  }

  button {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 0.9375rem;
    line-height: 1.84615;
    border-radius: 3px;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    color: #fff;
    background-color: #31263e;
    border-color: #3c2f4c;

    display: block;
    width: 100%;

    font-weight: 600;
    letter-spacing: 0.03em;
    font-size: 0.8125rem;
    min-width: 2.375rem;

    margin: 20px 0 15px;
    background-image: none;
    height: 42px;
  }

  button:not(:disabled):not(.disabled) {
    cursor: pointer;
  }
</style>
