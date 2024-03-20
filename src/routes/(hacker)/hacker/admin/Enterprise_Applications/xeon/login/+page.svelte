<script lang="ts">
    import BigBrainHashing from "$lib/BigBrainHashing";

  let username = '';
  let password = '';
  let errEl: HTMLParagraphElement;

  function login() {
    fetch('/api/ea_xeondb/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password: BigBrainHashing.hashPassword(password) })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          errEl.innerHTML = res.error;
        } else {
          // Set cookie
          document.cookie = `xdbtoken=${res.sessionId}; path=/hacker/admin/Enterprise_Applications/xeon; max-age=86400`;

          window.location.href = res.href;
        }
      });
  }
</script>

<div class="main-container">
  <!-- Simple login form -->
  <form>
    <label for="username">Username</label>
    <input
      type="text"
      id="username"
      name="username"
      placeholder="Enter your username"
      required
      bind:value={username}
    />
    <label for="password">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      placeholder="Enter your password"
      required
      bind:value={password}
    />
    <p class="error" bind:this={errEl} />
    <button type="button" on:click={login}>Login</button>
  </form>
</div>

<style>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #495a79;
    overflow-y: hidden;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 300px;
    background-color: #394476;
    color: white;
    border-radius: 5px;
  }

  label {
    margin-bottom: 10px;
  }

  input {
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 80%;
  }

  button {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 80%;
    background-color: #ccc;
    cursor: pointer;
  }

  .error {
    color: red;
  }
</style>
