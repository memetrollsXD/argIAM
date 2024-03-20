<script lang="ts">
  import { browser } from '$app/environment';
  let username: string = '';
  let password: string = '';
  let errorP: HTMLParagraphElement;
  let login = false;
  let flag: string = '';

  function getCookie(name: string) {
    if (browser) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const lastPart = parts.pop();
        if (lastPart) {
          return lastPart.split(';').shift();
        }
      }
    } else {
      return '';
    }
  }

  async function onLoginClick() {
    const req = await fetch(`/api/ops/bandera/check`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('token')?.toString() || ''
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const rsp = await req.json();

    if (rsp.error) {
      errorP.innerText = rsp.error;
    } else if (rsp.flag) {
      login = true;
      flag = rsp.flag;
    }
  }

  async function exportClick() {
    const req = await fetch(`/api/_notpartofthechallenge/exportflag`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('token')?.toString() || ''
      },
      body: JSON.stringify({
        flag
      })
    });
    const rsp = await req.json();

    if (rsp.success) {
      alert('Flag exported to XeonDB');
    } else {
      alert('Failed to export flag to XeonDB');
    }
  }
</script>

<div class="main-container">
  {#if !login}
    <!-- <form action="#"> -->
    <table bgcolor="#ffffff" border="0" cellspacing="0" cellpadding="0" width="100%">
      <tr
        ><td align="center"
          ><center>
            <table bgcolor="#ffffff" border="0" width="350">
              <tr
                ><td class="header" align="center"
                  ><b>BANDERA Login</b>
                  <br />
                  <small class="center">Restricted Access | Use HOKA (Manager) Authorization</small
                  ></td
                >
              </tr>

              <tr
                ><td align="left">
                  <table bgcolor="#ffffff" align="center" border="0" width="100%">
                    <tr
                      ><td align="right" width="30%">Username:</td>
                      <td align="left" width="*"
                        ><input type="text" name="login_username" bind:value={username} />
                      </td>
                    </tr>

                    <tr
                      ><td align="right" width="30%">Password:</td>
                      <td align="left" width="*"
                        ><input type="password" name="secretkey" bind:value={password} />
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr
                ><td align="left"
                  ><center
                    ><p bind:this={errorP} />
                    <button on:click={onLoginClick}>Login</button>
                  </center></td
                >
              </tr>
            </table>
          </center></td
        >
      </tr>
    </table>
    <!-- </form> -->
  {:else}
    <div class="main-container">
      <h1>BANDERA</h1>
      <p>Log out IMMEDIATELY after your work</p>
      <p>Flag: {flag.replace(/{.*}/, '{...}')}</p>
      <ul>
        <li><a on:click={exportClick} href="#">Export to XeonDB</a></li>
        <li>
          <a on:click={() => browser && window.location.reload()} href="../ops/bandera">Log out</a>
        </li>
      </ul>
    </div>
  {/if}
</div>

<style>
  .main-container {
    margin: 0 auto;
    width: 100%;
  }

  table {
    background-color: #ffffff;
  }

  td.header {
    background-color: #dcdcdc;
  }
</style>
