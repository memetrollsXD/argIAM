<script lang="ts">
  import { browser } from '$app/environment';

  interface DBRsp {
    id: number;
    otp: string;
    user: string;
    timestamp: number;
    sn: number;
    status: string;
  }

  async function fetchLogData() {
    // @ts-ignore
    const res = await fetch('/api/ea_xeondb/entries/', {
      headers: { 'Content-Type': 'application/json', 'X-XDB-Token': getCookie('xdbtoken') }
    });
    if (res.status == 401 && browser) {
      window.location.href = 'xeon/login/';
      return [];
    }
    const data = await res.json();
    return data as DBRsp[];
  }

  async function manageEntry(id: string, method: 'INSERT' | 'DELETE', ins?: Partial<DBRsp>) {
    const body = { id: id, ...ins, method: method };

    // @ts-ignore
    const res = await fetch('/api/ea_xeondb/entries/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-XDB-Token': getCookie('xdbtoken') },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (browser) window.location.reload();
    return data as DBRsp;
  }

  function getCookie(name: string) {
    const value = `; ${browser ? document.cookie : ''}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }
</script>

<div class="container-scroller s-g_YC7JWuLG0S">
  <div class="container-fluid page-body-wrapper s-g_YC7JWuLG0S">
    <div class="main-panel s-g_YC7JWuLG0S">
      <div class="content-wrapper s-g_YC7JWuLG0S">
        <div class="row s-g_YC7JWuLG0S">
          <div class="col-xl-6 grid-margin stretch-card flex-column s-g_YC7JWuLG0S">
            <h5 class="mb-2 text-titlecase mb-4 s-g_YC7JWuLG0S">Status statistics</h5>
            <div class="row s-g_YC7JWuLG0S">
              <div class="col-md-6 grid-margin stretch-card s-g_YC7JWuLG0S">
                <div class="card s-g_YC7JWuLG0S">
                  <div class="card-body d-flex flex-column justify-content-between s-g_YC7JWuLG0S">
                    <div class="chartjs-size-monitor s-g_YC7JWuLG0S">
                      <div class="chartjs-size-monitor-expand s-g_YC7JWuLG0S">
                        <div class=" s-g_YC7JWuLG0S" />
                      </div>
                      <div class="chartjs-size-monitor-shrink s-g_YC7JWuLG0S">
                        <div class=" s-g_YC7JWuLG0S" />
                      </div>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center mb-2 s-g_YC7JWuLG0S"
                    >
                      <p class="mb-0 text-muted s-g_YC7JWuLG0S">Executions</p>
                      <p class="mb-0 text-muted s-g_YC7JWuLG0S">+1.37%</p>
                    </div>
                    <h4 class="s-g_YC7JWuLG0S">1352</h4>
                    <canvas
                      id="transactions-chart"
                      class="mt-auto chartjs-render-monitor s-g_YC7JWuLG0S"
                      height="65"
                      style="display: block; width: 725px; height: 65px; /*savepage-canvas-image*/ background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUYAAABBCAYAAACtpQ38AAAAAXNSR0IArs4c6QAAFExJREFUeF7tXXl8FFWer1dXdycdrlwkMAMBRLlCMIRjh48cKuN48FHcnWvXAVwH1PmoM+yo6wUyjvNh19FdPzIOOIwQnfms+1EHhwEGQRcVh+FIJHKFQ3JwJHR3EiGdvup4tZ9XnepU9ZH0Vd1VnZd/mqKqq9/7/n6/b/2u9woQ+A8jgBHACAxyBL7+7cixNCVuISRiAYICDHI88PQxAhiBQYwAIkQKiGsBIJbLhFgwmmCu+76EiXEQKwWeOkZgsCIge4iksIwgwPMKBsyM1RJ742oJe4yDVSt0nDdSuOEPXWnR8SfwrTECKSHg3lS0Vk2I7I0/g+yMICEqf9hjTAli/GU1At0bi7cQgFgwZJWrAiODETAaAuGESJXNlthvvQzJgtFBUkRs2EuPWSFGeYCQ+LTgoY5PjAYeHk9yCLh/W7SAIME+9G2JIFowOSaHo1G/hWxWAqB1yErXVqOOMda4kG5KJNgCCGKszH8FoyTrvJdEauRcSSIkAhBA5sMgLwaPM06M7jeK9ymVH2RABCDWmRHseJUDhZbo2lwPL9VylclRIrYOedC1Il6c8HXGREAuTpDiPoVUZJuViE8IkvjU6HYbUWm2l0v0+HshO+MxcSC0M0qMivEAe7kk9bSFfhuBDQhpa8GqjnUDDdgs57vfKF5OQGI+qnblugeF5gokYguSje3efZzv/YVsUE7S87kkU7PoXrrGqQ49kc2S9tGSeOUwqdzfqCQZXlhBY2fGLxURIUoSQQAgP7j7/cwYMao9CuutWzmAQHYcIsXzH1Ci44gMtgK0KFHrzOhhRat0hZQohz2o7k3FzcijYP/hRZ6ZsFQU2w+R/r3LMTmmi6EyfJ/w0JOpfFhgqx4R0DCg+zIQzv+Jgo4jpGK3atvNpicZtdKsGnsiMGaEGFFSXukTst26JUCWzYbqQQpfbaP48x/QCGw1kQBJqjVDHlJ+sgKwQEkRyHkMe5nEjLtboMbfK/q23WKVvWIorTDDfBJRIMWrIEtroO3btQHlu0imgQPPsARJX5Ik4Tmjh12JzDlXr430tMok69xfceH2qswfutsAdBwiI2w3C+F2RKW58iEe2R5ZUK6pNscrO92JUU2K1lt+H6DKZol95R+lDBT8REAL5/9E88c3MWp33YhhdrSnEyJDumKJQI9fKgQFEpwX17CBQXPKtZA6iIHYjGRlvWVzgCqbIwbLepHzzsWHQrxGZobr1MUzNF5m2iqerXqEV8szlt2i/4fuS0B0HKHEpj9ToqOOylS4LaesJGJtqLBiL5Ost2z1q+2vv3HHmp+uxKhmcevNm/10+Sw5xlf+lFg//FjqQe76BzTftJ2RPO3yGJU8pADp2myG2XJ1jgDLFUHIY88vk9hxS3i26id8tPmh+Xj33m8jPO1AAsSKXPGelPQIVXGXYP3Wi4Fo8uQafsNwxzexSH4ipBZmU3ZmIKhMjzHiAZ9fJuXd+qYP2EdJsewzHvsVHYcpoWk7LTrqdSHJ8MIKskHb3BcC5EjkeAX/kh2//F29BKFOyFtv3uSjSmcPWAkKHwvsuUyKzsOU2LSDFp1BgJU8ZCbD7KjeYf5ISFfcJdDj7hZI+yhNaiAapnzTNoY7uM6SKwSh9jDyf9jQE0uPkAy5g2ssSH655jHrZTuZum+Elzj1xxxb+RMunb8fzYZDjg4gWiSCqE3EUYioNPfaYbrHrQsxaqqUN2/0kqV9LK4FXdVRGVUafecRwPzxjazQvFMTZuvV7qOQYbh3CPJHQqbiTp6pfJjTdIQOMH502vfRA3nQ+QWVC60soYLLnDV+ZtzdfHRj6k2R9FwmAwfXWuW54x7HdPJOUveKRi7Wm3/ni3zAx2+f/clfORckySOU0LSDQbqg/L8cDQ5AkhH5T40dxoIh+fGnnRjVTyF29rN+euwSXuOXKikoFSqJnIfuy6TY8heaP/mmRQNsmtp9YnqHY2/nUchI5o+CiYw3lHJDFb2ey6R/xz358rihtNCshZhQwaV4hmhdtMkbDx5o7oF9D9kkzxUyFx4MSTGSAb4U4SVOvj/AVD7Y5yWmaJ9qfZenG+N+SB+gq54SmnYy0HU0KkmKIiUvAIlY0zzl/gAzrXfMOo03rcSoIcVZz/jocUt4ZYlNHA5V5CX9ED70tJFi03ZGaNnFSF5HqN0HFWoSzUPG9g5LIT3mdp6Z9mCo2qoZZBIPJKF5O8MdftFmVs9JXXCxLNzgpUpq5DaOeOSLZObfcY89eK25exz7WlqkrWZYxRXuJVIlMwRm1ho/mV8eOw2UhH4nYx9IL6CzjhIdX9Bi619DEWG4TkWMWcfxpY0Y1aTITF7uZ6auDESGmuEzSc8x37Sdha27GdHVQPc+pOTu/IHykFG9w7xSSI/9DkdV3MnL3qGG2VMfL/RcJvnDv7ShsZrRc1IKLvSY2zh29lpfovig+ft3/mOBmckxvDVE0Tn0UDYiSapTW6BXvzNpn30EN7D9IP0QHXW05GqghNbdci8sGjNb87SPKp0lJKpvyV6fFmJUkyL1zW9zljlrvNmIGmBPGyk272D5xlqrOsxW5yFjeod5pZCZssJPV9yV1uRzNBzQOP27/mmI2Xob1XK23v5uN2nvx9voRwGE5r+w3JH1eQRJXZIk0TQ9juFeFzNpmR96rpDihQ97m9l76b53JVe2STJ8vGTxdMG68PWYhbJs2Gx/v4nshPC0kWTpzNhRiU6DTpkY1cZCFlcK1vkb3PHknELz0SFHAD3tpNiykxVad1skr7MvzAbyOk95h97gk6gE0mNuC1Bj7+BIe1kwpNBhPNHw4E9stvKNb9kIQHxSsNK1UCf5pvW2irfITPqRj5n6gD8VvJT5m+XhoNZzpDeWmU95yNJqAekL0jfoqqdFZwMjXthjCJLUeolBPZdlliH91tO+M8EvKRGjOt9EFVXyloWvufsWISp9vipJyJ60skhR//MSIkhnHSO27mHFjmN9uYu8EshOWuajx90ZkMejIJ3B8UnudtL32aNDCK+TNENvY8jQ8kpg3h3vXu3r404eP/7kZhvf+LacbzVyj6M6dO7T8+j6K7nbSOhto4SW3ax4YW+oQJipcDsil4jscsFr7qAnkFn7C/1eFuwrVf1Mmhi1pDiNt8x/tTuDDlfCDyREkkLLLgs95V996kln8wEqtOy0cPUv241ODAhs96ZiuTXfMu+lbqq0OtSekwp+SCaBuvV22HFcXhVkRHJUr/FnbvhnbyL6g+YHe9pQrswiXvxYd5LU5D5txdBS/UQPWVrNG0XfjcwPqtSbTONJEaN6KyKycCpvnf/f19Iasw2im/k//elQ2HmCMXIhRiEHPWQNPe0UV/cfdhkDA/U4qnUc5JWIluqf95DFN8bo1xxYYdE8CW87KbTusQgXPgrlwNPhSUbkErFNDiyQAa5ImBjVQpAN5aZXrqY8ikF8A2Qw/j3LRsgQGLC3UVNwWVzbReaXJbyCaSDxIgwCnz8+VPI6DdH8HpafEy3zXrqWznnLJOlpJ/kLe62w8ziD5q3yWOLqqFCu12wNhgh8xmo3WZI8gQ8kq8FyPmFiDK2PLZzKWW56WZVrUm0NrlTl8Wdca/CF1l1W7uircpXaaDtfhwouE7/vYaas8Kj2iEhmbX5MPFDI6d+7ojBoeNnrcdTkE7+xyG+pfrI7tOW9TvqMcpJiy4dW4dL/WeMlyYhc4uhFfkvNk916yWew3TchYgxtNGsrEq2LazuCW4IrW4Pjz2TxkDwOijv66yGw8xRrpJBa8ZxAhuSNcPB/dH9RNsgxohWn6pFuZsx3fJnWb9HTTsELe6zCxY9tkq8jqidJkMR85WVOSDZs1c+6yZIqLln9w9+L5LG4iVFNirbFW12DxaXO1Dyh5wrl/+gBVOEwzL6NSsHFOveFLrJkhu79nQhroXW3jWvYMJQA1CVCEjZnYgdwTSuOrUi0VD12LVPz7U+/kE6IrR/axK6TLHpohl9LjVrgs8z8Oc7v62CkcRFjHykWimzVo1ep4iqub9e9tEZUg81j18yXq3t5mNj2mSF6G5V9NMkRkzjrvPWdmZS30Pi2nT/3XkEmHhLq0BnN1TJvfadOEXNKETn0OCjxwh6b2HnSIvmcFLZDfXlnQGIMtSvYCkXL9EeuUiVV0dcN68Dag+2WKJT0HXi6iPB1UtnsbVR7UJY5z3dmQ+Z849sF/Ln3ZXLUo40nInS+7l43M+m+YL8f/hv0CPRLjOoeLrbmOdlABnqJDD4f38t2YuHEte7JE09sGqYXIcSj8aH10BPucdMT/8Udz8uD0i13FEYKZ98pENv256UbC80OM7ZCkZ328FWyqCq00W425ptu/PD9UrPDmMSofiWBpebZDrJ4eiBmLKBYW6wYBJ8PIhAnPoGDzxXBrtOWbBRiNHtp3vHu5ah7aITPQyf5Sl4HxR3bMFzGIk0Ve23ofEPAMueFjtDDIk75RMhRp/mrXwCfiP7g8amW9qrf+JKAfKMSo5oUmZpnXHRRZUDOMSmvHVR+Fx8HVzimGQ/ocdDcZ4+OlI0hw72Nyga0styLK4MRQprnl8j9hB4HLRxZVyT5OlPajSg8dKbH3d3N3PCD7mzPD/9+dvUrFv4RxKh+olpqnnKSRZU4pxhP/Jnma/iLH+cLJzaPSJenFM/wQgWX4dcHLHOed8bznUxcI8oPip+WBX8r8R5HzSoWW6HATl3ZhfU6E5Iz729oiFEdRjHVTzjpoul+qKqbkuhtYIREhH8qnI/Ppw8fweug4YmNI8Svz1ozEVKr174z1U86yaJpfkWeRpAv9Dpofv/q8kTJUbOKxVYo0DOfcdJ5pYJaj40wP9T5ju0nffaTqnxDxKhWIEv14w5kGPoWxDPZAGLEBoyB5y96XTS3/99GZaRt5Y3ifWhLNmrk3B52+sOdcS3ZSakBZeD5h+sff2mfXTi5Je7VMeqUkJHnhe3MePYpE6O6SkdPXtbBjF7UgzYnRBsZ9jEvPs4GHoEvXy+CjkN2Pfdt1DwUF29tCXouxpQ3d+5/h4nNu+Sqfax3VUfkEycv66BGL+rJhvyw/SiesDH1KZZ8gPaVBMtc9Oj5PZpNd5S6f0TrdW/+AJ8PVqV0wgcVYgL1/1lG+LtovXobQwWXyeaQv3D2vWF8y67h0dp4NK041hECO3m5i5Kjn3APFetvMGXbuz8qxkfTNgKUZV9U6Sw3W7nKBaFEECRA1VCCJAGBj7OPh9D2SYHY+Ad5uWC6m51Db/wbNt5nqXm63QzylvwuWvxq23DRcVjTAK5pxTHRfLC9GY9vZGKkSmvc7NQfO0P9OEruSOnPwcdBjzCLeATq15fDq+dt6SzEqAsu7PRH26jiab6+Hc2zO9+B8IY+J82ferNExqT3vcTKayvoMbd1MROWfp1NeQ00fnze2PoF/A2vt9D2Ul7lKCoPsN5PiSABQA5k2P8rx/h8JvARepwMf2jNmHT2NoY2oC2d2c1MecDZGyiYRv6S18nwDf9VLvm/ll9bAazDefr6+5x00WRfn75i/cyEfuYaPwD+3HtnzdttNLhGLlz+bIhw5n9K09HbqHkH+JxftJB5xUnvTp1NKUCvi+GPvjIKoHxi9eOXsjkW/Nu5gwDgzrxzJnq7gDLJWG0V+HxvT12MtX7pxwf6Ohjx9Ful8FpzXqohtVJwoSd+9wpVflN3zOJEzP2O0j8/rR7Gf3+EC2kr4pP9Ptb/foqHJpC/HvID/Jl3TucOz+f+TKDPxXCHfjEuld7GUMFlaIWXnbH6Yu6jhmeIEUgMARBo/MNp47VXGrG92DhtuEJj7UjoahiaTG+jZoXLlJUXQeEkL5Y/1rfE2+2NYw966C/gGt9qTIxL8dXZRkDydjLcsddGEZzbmmhvY2jT4aKqa+zk+9qzPRf8+xgBIyIAAie3njLiwPCY+kdAvHJgqPjVtvJEehs1zfwzn/wKWFFeDv9hBDAC4QgA7uSbJzEs5kSAP/abMbD7Qn68hZjQGx5H3eSiK+7A7+0xp9jxqDOAAAic+N0J/JYwc77tkPB1MdwXv54o68kA+zaG1kOzQ3hLzVNnM/32O/x7+C2aZuIZwB3fdDy4vFv5U7YPwMdBBIyNh3DlwHCxaYe8A09/76RWln4yk37UTA6/wYPljfXbDPqdLfsDgS83HpNX/Cl/SnkKHwcRMDge0NvBiuffHy31XIoZUivbbwH7aA8zdVUTljfWd2zvvQjEsG/Affn6l9hQzG0o8OpZO3/6j1F7GzUFl+mPnSZtIzgsb3PLG8tPf/mBQMNrDXr0AeG+qMz2eXHn3v2G1NU4Iry3MVRwKZtzhf7mYgeWS2blgvE2J96Aa3j1qLKFJP4MbmVqRhwkfwfLNdZWEJzHpvQ29hVcCjjLjMdOmXFeZpUHHrc57UiRGwjUv/IFQZLyMSAJQoKQkI+VFcDKMT5veHyg68gIoXXPGKW3kSbFZiRHZuL3zoEhE3qwfLF+Y/uOj98AV/9KfdRXd4QXX2JsgDxI15hHFqsMgg93qvY6ydNWoAwQ5Je72cnLzsXaoBnLL2N7gOA9LtQ5O4PzCwjUv1SHc4y5s1YW+rtY/sTmaYre0ROWnqWGTXDjXJc5c11YbtmRGwjUra/DfYy51ccpuhoKxQsfjwXDrutkxi9pwfLNLflieeovT+A79KsjsUJpuRTRz3aM+Lwx8YGBqxbY+tex7PU/OIPlFztUxvprTP1V2pGyKR8QOPTiYdwXpX9fFG6o7b+hFuOD8THSggrgO7juEEmQBCQggT8xDlgPsB1gHiAJEDi47qDKX8L/xAhgBDACgx4B4Pv7mr8rKMRqb8bngwhgfKK3LWP9wPqRa/YBAgeePZCdgjhuRMC440ax3GkUyy17Br6/Pf038y6EwwuvzL3wCssPy8+YC1WB//N//xx7LthzwZ5Lbnk8WJ6pyRP49j+xH9MCVqPU1Ajjh/HLLffq/wEwWA+F4VAEFwAAAABJRU5ErkJggg==) !important; background-attachment: scroll !important; background-blend-mode: normal !important; background-clip: content-box !important; background-color: transparent !important; background-origin: content-box !important; background-position: center center !important; background-repeat: no-repeat !important; background-size: 100% 100% !important;"
                      width="725"
                      data-savepage-canvasdatauri="data:image/png;base64,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"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-6 grid-margin stretch-card s-g_YC7JWuLG0S">
                <div class="card s-g_YC7JWuLG0S">
                  <div class="card-body d-flex flex-column justify-content-between s-g_YC7JWuLG0S">
                    <div class="chartjs-size-monitor s-g_YC7JWuLG0S">
                      <div class="chartjs-size-monitor-expand s-g_YC7JWuLG0S">
                        <div class=" s-g_YC7JWuLG0S" />
                      </div>
                      <div class="chartjs-size-monitor-shrink s-g_YC7JWuLG0S">
                        <div class=" s-g_YC7JWuLG0S" />
                      </div>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center mb-2 s-g_YC7JWuLG0S"
                    >
                      <div class="s-g_YC7JWuLG0S">
                        <p class="mb-2 text-muted s-g_YC7JWuLG0S">Reads</p>
                        <h6 class="mb-0 s-g_YC7JWuLG0S">563</h6>
                      </div>
                      <div class="s-g_YC7JWuLG0S">
                        <p class="mb-2 text-muted s-g_YC7JWuLG0S">Writes</p>
                        <h6 class="mb-0 s-g_YC7JWuLG0S">720</h6>
                      </div>
                      <div class="s-g_YC7JWuLG0S">
                        <p class="mb-2 text-muted s-g_YC7JWuLG0S">Nodes</p>
                        <h6 class="mb-0 s-g_YC7JWuLG0S">3</h6>
                      </div>
                    </div>
                    <canvas
                      id="sales-chart-a"
                      class="mt-auto chartjs-render-monitor s-g_YC7JWuLG0S"
                      height="65"
                      style="display: block; width: 725px; height: 65px; /*savepage-canvas-image*/ background-image: url(data:image/png;base64,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) !important; background-attachment: scroll !important; background-blend-mode: normal !important; background-clip: content-box !important; background-color: transparent !important; background-origin: content-box !important; background-position: center center !important; background-repeat: no-repeat !important; background-size: 100% 100% !important;"
                      width="750"
                      data-savepage-canvasdatauri="data:image/png;base64,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"
                    />
                  </div>
                </div>
              </div>

              <div class="col-md-6 grid-margin stretch-card s-g_YC7JWuLG0S">
                <div class="card s-g_YC7JWuLG0S">
                  <div class="card-body d-flex flex-column justify-content-between s-g_YC7JWuLG0S">
                    <div class="chartjs-size-monitor s-g_YC7JWuLG0S">
                      <div class="chartjs-size-monitor-expand s-g_YC7JWuLG0S">
                        <div class=" s-g_YC7JWuLG0S" />
                      </div>
                      <div class="chartjs-size-monitor-shrink s-g_YC7JWuLG0S">
                        <div class=" s-g_YC7JWuLG0S" />
                      </div>
                    </div>
                    <p class="text-muted s-g_YC7JWuLG0S">Storage Size</p>
                    <div
                      class="d-flex justify-content-between align-items-center mb-2 s-g_YC7JWuLG0S"
                    >
                      <h3 class="mb- s-g_YC7JWuLG0S">27632 MB</h3>
                      <h3 class="mb- s-g_YC7JWuLG0S">78%</h3>
                    </div>
                    <canvas
                      id="sales-chart-b"
                      class="mt-auto chartjs-render-monitor s-g_YC7JWuLG0S"
                      height="38"
                      style="display: block; width: 725px; height: 38px; /*savepage-canvas-image*/ background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUYAAAAmCAYAAAC4VDIeAAAAAXNSR0IArs4c6QAAA5dJREFUeF7tnd9uEkEYxb9ZWtNi+gTiC1Rk8U9i0jZRuZWYqDyC9REsrL3ohVLwEWwfwbaJ1lvRhCUx0cqi7Qu0vkFLicqOWRr+CDt7KZj+uCKZCRlmT85855yZHSUisviifleUeh98N3x+uI6d6LYtrnsbouWxqbMS9bLqpFZ6/YveqYjMGPtb7XQ1f90L2heee4+UJa/Nvy3fqo6d6o+lsS1aPzAPXRdcJ10K2m+sfY7PXJg+ifif8jsmlz+t2EedsRS/LiuxXpn6a1Efa07qTrd9odj4oETfNvf3n9ScaxtB+62yl5hqy2HUWFo/f138snaz2XlGxXpeRK0b+yu14xZSD7vtS0WvoUWuGsfiS662am8F7UulPVv7sXrEWFquY8/2f7tR1qKfmscim27BXh54/sF8XjL21zrjPktXwOLfMzSpWHyzf5y3xIrAouxk5+M9LO7unzZEtBGLvpbc/WS8g8W3349tpaxILGavxHtYfHfQKmvtG7GolNq8Nz/bw+LuQfNIdBQW25lscq6iAOP/AUaIsfecWKRDVph/uUhDjP0HABjHDEaIEWKcFPUCMUKMSOkzDCClQxZGJefT1oEYIUaIEWLE7w5WxgG/G2KEGCFGiBFihBiNuSEeIx4jqfQQBpDSBr5QpNKhM8N2nXDAaGG7TujMsF0ndFrYrhM6LS2262B4s49xFAOolzGrFzxGPEY8RjxGPEY8RjzGSZUv7GNkHyP7GM+2jiGlkdJIaaT0xB1PRUojpZHSSGmkNFIaKY2UDk8CeYnE6LywXYftOiSBY04C8RjxGPEY8RiRL0PyBWKEGCFGiBFihBhNvg7qZczqhfCF8IXwhfCFRZrwhfCF8IXwhbfJj2KAt+uEcyPyZczyBY8RjxGPEY8R+YLHiMc4ofcP4THiMeIx4jGySOMx4jHiMeIx4jHiMXJL4BAGIEaIEWKEGCFGiJF7pQcwoLjjPHxl5M6X0HkhlSaV5mqDIQxwVpqz0hAjxAgxQozNYApIpUmlSaVJpUmlSaVJpQlfCF8IXwhfCF8IXwhfCF8SU205NJZFVIxUjFSMVIxUjFSMVIxUjFSMVIxUjF0M6HYmm5yrQIwQI8QIMUKMEOP0SZSXgpRGSiOlkdJUjFSMVIxUjFSMVIxUjAEGtC+52qq9FXxfKu3Z2o/VIyrpFrcEjs4OJ184+cLJF06+cPKFky+cfBnCAMQIMUKMEOO5IcY/p6qdvHH5yjcAAAAASUVORK5CYII=) !important; background-attachment: scroll !important; background-blend-mode: normal !important; background-clip: content-box !important; background-color: transparent !important; background-origin: content-box !important; background-position: center center !important; background-repeat: no-repeat !important; background-size: 100% 100% !important;"
                      width="750"
                      data-savepage-canvasdatauri="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUYAAAAmCAYAAAC4VDIeAAAAAXNSR0IArs4c6QAAA5dJREFUeF7tnd9uEkEYxb9ZWtNi+gTiC1Rk8U9i0jZRuZWYqDyC9REsrL3ohVLwEWwfwbaJ1lvRhCUx0cqi7Qu0vkFLicqOWRr+CDt7KZj+uCKZCRlmT85855yZHSUisviifleUeh98N3x+uI6d6LYtrnsbouWxqbMS9bLqpFZ6/YveqYjMGPtb7XQ1f90L2heee4+UJa/Nvy3fqo6d6o+lsS1aPzAPXRdcJ10K2m+sfY7PXJg+ifif8jsmlz+t2EedsRS/LiuxXpn6a1Efa07qTrd9odj4oETfNvf3n9ScaxtB+62yl5hqy2HUWFo/f138snaz2XlGxXpeRK0b+yu14xZSD7vtS0WvoUWuGsfiS662am8F7UulPVv7sXrEWFquY8/2f7tR1qKfmscim27BXh54/sF8XjL21zrjPktXwOLfMzSpWHyzf5y3xIrAouxk5+M9LO7unzZEtBGLvpbc/WS8g8W3349tpaxILGavxHtYfHfQKmvtG7GolNq8Nz/bw+LuQfNIdBQW25lscq6iAOP/AUaIsfecWKRDVph/uUhDjP0HABjHDEaIEWKcFPUCMUKMSOkzDCClQxZGJefT1oEYIUaIEWLE7w5WxgG/G2KEGCFGiBFihBiNuSEeIx4jqfQQBpDSBr5QpNKhM8N2nXDAaGG7TujMsF0ndFrYrhM6LS2262B4s49xFAOolzGrFzxGPEY8RjxGPEY8RjzGSZUv7GNkHyP7GM+2jiGlkdJIaaT0xB1PRUojpZHSSGmkNFIaKY2UDk8CeYnE6LywXYftOiSBY04C8RjxGPEY8RiRL0PyBWKEGCFGiBFihBhNvg7qZczqhfCF8IXwhfCFRZrwhfCF8IXwhbfJj2KAt+uEcyPyZczyBY8RjxGPEY8R+YLHiMc4ofcP4THiMeIx4jGySOMx4jHiMeIx4jHiMXJL4BAGIEaIEWKEGCFGiJF7pQcwoLjjPHxl5M6X0HkhlSaV5mqDIQxwVpqz0hAjxAgxQozNYApIpUmlSaVJpUmlSaVJpQlfCF8IXwhfCF8IXwhfCF8SU205NJZFVIxUjFSMVIxUjFSMVIxUjFSMVIxUjF0M6HYmm5yrQIwQI8QIMUKMEOP0SZSXgpRGSiOlkdJUjFSMVIxUjFSMVIxUjAEGtC+52qq9FXxfKu3Z2o/VIyrpFrcEjs4OJ184+cLJF06+cPKFky+cfBnCAMQIMUKMEOO5IcY/p6qdvHH5yjcAAAAASUVORK5CYII="
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-6 grid-margin stretch-card s-g_YC7JWuLG0S">
                <div class="card s-g_YC7JWuLG0S">
                  <div class="card-body s-g_YC7JWuLG0S">
                    <div class="row h-100 s-g_YC7JWuLG0S">
                      <div class="col-6 d-flex flex-column justify-content-between s-g_YC7JWuLG0S">
                        <div class="chartjs-size-monitor s-g_YC7JWuLG0S">
                          <div class="chartjs-size-monitor-expand s-g_YC7JWuLG0S">
                            <div class=" s-g_YC7JWuLG0S" />
                          </div>
                          <div class="chartjs-size-monitor-shrink s-g_YC7JWuLG0S">
                            <div class=" s-g_YC7JWuLG0S" />
                          </div>
                        </div>
                        <p class="text-muted s-g_YC7JWuLG0S">CPU</p>
                        <h4 class="s-g_YC7JWuLG0S">55%</h4>
                        <canvas
                          id="cpu-chart"
                          class="mt-auto chartjs-render-monitor s-g_YC7JWuLG0S"
                          style="display: block; /*savepage-canvas-image*/ background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAABLCAYAAAB9YxUtAAAAAXNSR0IArs4c6QAAA15JREFUeF7tnb1y00AUhe86A5TwAFBJfgCClQJayynhAaAjPVCmYSgYOqCHDuihjOUWisiYB7BcwQNASWbwMgqDLQlZ2fVog2V9KTPrHen487lH+ycl/KGAIwWUo37pFgUEuIDAmQLA5Uza7e44CcKJiFzP36W65cfDT3//B1zbzYCzuwMuZ9LSMXDBgDMFrOFKgsFNpedh8Yq88eiJs6uk40YqsBZcIvpj4W6/+HG020gFuGhnCgCXM2npGLhgwJkCwOVMWjoGLhgwUmC6F95XWl5lGyuRt14c3VvVAXAZSUsj4IIBZwoAlzNp6Ri4YMCZAsDlTFo63li4ZkH4RovczX5FWslB9zh63aSvbdrr31ZKvc89MWkZeuNov0n3sc61ApelarNe/3HxI3q+886fHCVlXQHXBg5FbKpzJUH4VUSu5kD61ekC178/LZzL0rmAy1ywVsM17YWHHdEXinJVLQUCLuAyUiCFSyl5mgvbSr3wjoePKqYnKItG6oq03rmAy5CUNZoBF85ljE3Zk7Joeel9Hv0ofVLe1Inr83hapCwac3XaMAnCnyJyMRcj5voKcJXoCFzAtVCg7hF64AIu4LJjwFlryqKFtDiXhVhtzlyzG/3LouSBzYAocAGXUVlM4dId9b0g14kfR5dWSQhcwAVcZzCQ7O77sjOfFpp98+Pomh0+1a1bm7na7FzAZbmd33YQFbhwrqzvVp4VAVzmBQ3nwrkWtKialzkDF3ABl0h6WO7/33Hd5rI464VHWskgWxi11ne649GHsmKJc+Fcxs4FXBYH7qYnC9oe/oZz4VxLl644zRm47PYt4lw41/KHVfPWMuACLuBKn/7asBJ1m0bocS6cq9HOVbrZQnVOvHj4bNXcABPXeWUaueTmPJxrtjd4rrV+mJVLiToErpKfFmXRbuIauCyOUAIu4GJVRPqEdcbENWWRQN/sQE/mMj9ZkLJIWaQsUhZZclMx1uP8CCUyF5mLzMX0T/P2LeJcOBfOhXPhXGX5kRF6RuiXu81rXkMPXMAFXKcKsMy5tjdoEOgJ9AR6Aj2BnkBfUICtZW63lhHoCfQEegJ9vW8tI9AT6An0BHoCPYGeQL9QgLJIWaQsUhYpi5RFyiJl8c9bOiYilEXKImWRsrhtZfE39FFCLTMuyI8AAAAASUVORK5CYII=) !important; background-attachment: scroll !important; background-blend-mode: normal !important; background-clip: content-box !important; background-color: transparent !important; background-origin: content-box !important; background-position: center center !important; background-repeat: no-repeat !important; background-size: 100% 100% !important;"
                          width="151"
                          height="75"
                          data-savepage-canvasdatauri="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAABLCAYAAAB9YxUtAAAAAXNSR0IArs4c6QAAA15JREFUeF7tnb1y00AUhe86A5TwAFBJfgCClQJayynhAaAjPVCmYSgYOqCHDuihjOUWisiYB7BcwQNASWbwMgqDLQlZ2fVog2V9KTPrHen487lH+ycl/KGAIwWUo37pFgUEuIDAmQLA5Uza7e44CcKJiFzP36W65cfDT3//B1zbzYCzuwMuZ9LSMXDBgDMFrOFKgsFNpedh8Yq88eiJs6uk40YqsBZcIvpj4W6/+HG020gFuGhnCgCXM2npGLhgwJkCwOVMWjoGLhgwUmC6F95XWl5lGyuRt14c3VvVAXAZSUsj4IIBZwoAlzNp6Ri4YMCZAsDlTFo63li4ZkH4RovczX5FWslB9zh63aSvbdrr31ZKvc89MWkZeuNov0n3sc61ApelarNe/3HxI3q+886fHCVlXQHXBg5FbKpzJUH4VUSu5kD61ekC178/LZzL0rmAy1ywVsM17YWHHdEXinJVLQUCLuAyUiCFSyl5mgvbSr3wjoePKqYnKItG6oq03rmAy5CUNZoBF85ljE3Zk7Joeel9Hv0ofVLe1Inr83hapCwac3XaMAnCnyJyMRcj5voKcJXoCFzAtVCg7hF64AIu4LJjwFlryqKFtDiXhVhtzlyzG/3LouSBzYAocAGXUVlM4dId9b0g14kfR5dWSQhcwAVcZzCQ7O77sjOfFpp98+Pomh0+1a1bm7na7FzAZbmd33YQFbhwrqzvVp4VAVzmBQ3nwrkWtKialzkDF3ABl0h6WO7/33Hd5rI464VHWskgWxi11ne649GHsmKJc+Fcxs4FXBYH7qYnC9oe/oZz4VxLl644zRm47PYt4lw41/KHVfPWMuACLuBKn/7asBJ1m0bocS6cq9HOVbrZQnVOvHj4bNXcABPXeWUaueTmPJxrtjd4rrV+mJVLiToErpKfFmXRbuIauCyOUAIu4GJVRPqEdcbENWWRQN/sQE/mMj9ZkLJIWaQsUhZZclMx1uP8CCUyF5mLzMX0T/P2LeJcOBfOhXPhXGX5kRF6RuiXu81rXkMPXMAFXKcKsMy5tjdoEOgJ9AR6Aj2BnkBfUICtZW63lhHoCfQEegJ9vW8tI9AT6An0BHoCPYGeQL9QgLJIWaQsUhYpi5RFyiJl8c9bOiYilEXKImWRsrhtZfE39FFCLTMuyI8AAAAASUVORK5CYII="
                        />
                      </div>
                      <div class="col-6 d-flex flex-column justify-content-between s-g_YC7JWuLG0S">
                        <div class="chartjs-size-monitor s-g_YC7JWuLG0S">
                          <div class="chartjs-size-monitor-expand s-g_YC7JWuLG0S">
                            <div class=" s-g_YC7JWuLG0S" />
                          </div>
                          <div class="chartjs-size-monitor-shrink s-g_YC7JWuLG0S">
                            <div class=" s-g_YC7JWuLG0S" />
                          </div>
                        </div>
                        <p class="text-muted s-g_YC7JWuLG0S">Memory</p>
                        <h4 class="s-g_YC7JWuLG0S">123, 65 MB</h4>
                        <canvas
                          id="memory-chart"
                          class="mt-auto chartjs-render-monitor s-g_YC7JWuLG0S"
                          style="display: block; /*savepage-canvas-image*/ background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAABLCAYAAAB9YxUtAAAAAXNSR0IArs4c6QAAA29JREFUeF7tnTFv00AYht8LEYzwA2CDHRBSQlhiKmCEHwAb7MDYBTEgNmCHDdhhhIo6C2kiIfgBsAE7jKA0RqnUUDt2emf53NT3dKwuZ997z73f5/N3iRF/KOBJAeOpX7pFAQEXEHhTALi8SUvHwAUD3hQALm/S0jFwwYA3BYDLm7QN73gcP1gY4fZ0Q7214e7/gavhDHgb3jj+rETnUv1Pp5eAy5viAXUMXAFNdt1DBa66FQ/oesAV0GTXPVTgqlvxgK4HXAFNdt1DBa66FQ/oesAV0GTXPVTgqlvxgK7nDNfwQ0+t1seUREZf1InOByQbQ7VRALhsVKJNKQWAq5RsfMhGAeCyUYk2pRSoBa680oupfupi9KLUTVf1odySEL1WL/pW1SWC7qcWuEbxS0k3U0InunPgcI3i75JOpu5rqjPAVdGSAC7gqgilxW6AK1C48lKCI5NnunDld2WwAVegcI0Gf6TkaAqk9uQEcFW1tELOuYCrKooK+gEunMsbYsAFXMDlQQHXsLgV35bR88ydvFI3ulV4dyT0JPRzOJYl9MDluMIJi/ZhEbgaANcwPq2WvmZG8kPd6JTj6JY3JyxWKudiZ6voXMDlWCzIu0X7VQJcwGVPi2NL4AIuR2TsmwMXcNnT4tgSuIDLGpnR4J2UXE23T26oe/ltbh/A5RmuTxvHtd2+uyB+J3poPak2DV2fFkeb12XMWaf7Ai6H7+cqc7TM9WlxBtek/Ss9ieavuv1jNsxYtykDl8ybzH29V7d/rfCawNUAuLY212XMo9QkG/NUnf794ol3LHOeORdw7ZXzEL5bLONcwGVt2DsNg92hBy5e/8yXyn7H+evIuXAunGuuwLKjZTiXm3PlHbZIdh6AHi950HCroW9MVQRwOcI1eKIkuZd5il0HrrylBVzARc41U8Ac/D7XGOeyP86Pc+FcOBfOdfgOaOBcOBfOhXPhXEWbPU15cU1C7/D9XIRFwiJhkbBIWCQsLipAVcReTfYpFgz5xTU5FznX/6VScQ09cAEXcEla+hvXq1pDT1ikKoJ6rpkChMVdDkzqUQPnWr3TP+Rc5FzkXORcxb+gsapHy3AunAvnwrlwrrw3GhzQCPTENWGRsEhYJCwSFgmLGQXYoWeHnh16dujVWxuyQ58ND+xzNeDnWShzDqbM+R9odprik1LAawAAAABJRU5ErkJggg==) !important; background-attachment: scroll !important; background-blend-mode: normal !important; background-clip: content-box !important; background-color: transparent !important; background-origin: content-box !important; background-position: center center !important; background-repeat: no-repeat !important; background-size: 100% 100% !important;"
                          width="151"
                          height="75"
                          data-savepage-canvasdatauri="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAABLCAYAAAB9YxUtAAAAAXNSR0IArs4c6QAAA29JREFUeF7tnTFv00AYht8LEYzwA2CDHRBSQlhiKmCEHwAb7MDYBTEgNmCHDdhhhIo6C2kiIfgBsAE7jKA0RqnUUDt2emf53NT3dKwuZ997z73f5/N3iRF/KOBJAeOpX7pFAQEXEHhTALi8SUvHwAUD3hQALm/S0jFwwYA3BYDLm7QN73gcP1gY4fZ0Q7214e7/gavhDHgb3jj+rETnUv1Pp5eAy5viAXUMXAFNdt1DBa66FQ/oesAV0GTXPVTgqlvxgK4HXAFNdt1DBa66FQ/oesAV0GTXPVTgqlvxgK7nDNfwQ0+t1seUREZf1InOByQbQ7VRALhsVKJNKQWAq5RsfMhGAeCyUYk2pRSoBa680oupfupi9KLUTVf1odySEL1WL/pW1SWC7qcWuEbxS0k3U0InunPgcI3i75JOpu5rqjPAVdGSAC7gqgilxW6AK1C48lKCI5NnunDld2WwAVegcI0Gf6TkaAqk9uQEcFW1tELOuYCrKooK+gEunMsbYsAFXMDlQQHXsLgV35bR88ydvFI3ulV4dyT0JPRzOJYl9MDluMIJi/ZhEbgaANcwPq2WvmZG8kPd6JTj6JY3JyxWKudiZ6voXMDlWCzIu0X7VQJcwGVPi2NL4AIuR2TsmwMXcNnT4tgSuIDLGpnR4J2UXE23T26oe/ltbh/A5RmuTxvHtd2+uyB+J3poPak2DV2fFkeb12XMWaf7Ai6H7+cqc7TM9WlxBtek/Ss9ieavuv1jNsxYtykDl8ybzH29V7d/rfCawNUAuLY212XMo9QkG/NUnf794ol3LHOeORdw7ZXzEL5bLONcwGVt2DsNg92hBy5e/8yXyn7H+evIuXAunGuuwLKjZTiXm3PlHbZIdh6AHi950HCroW9MVQRwOcI1eKIkuZd5il0HrrylBVzARc41U8Ac/D7XGOeyP86Pc+FcOBfOdfgOaOBcOBfOhXPhXEWbPU15cU1C7/D9XIRFwiJhkbBIWCQsLipAVcReTfYpFgz5xTU5FznX/6VScQ09cAEXcEla+hvXq1pDT1ikKoJ6rpkChMVdDkzqUQPnWr3TP+Rc5FzkXORcxb+gsapHy3AunAvnwrlwrrw3GhzQCPTENWGRsEhYJCwSFgmLGQXYoWeHnh16dujVWxuyQ58ND+xzNeDnWShzDqbM+R9odprik1LAawAAAABJRU5ErkJggg=="
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row s-g_YC7JWuLG0S">
          <div class="col-md-4 grid-margin stretch-card s-g_YC7JWuLG0S">
            <div class="card s-g_YC7JWuLG0S">
              <div class="card-body s-g_YC7JWuLG0S">
                <div class="chartjs-size-monitor s-g_YC7JWuLG0S">
                  <div class="chartjs-size-monitor-expand s-g_YC7JWuLG0S">
                    <div class=" s-g_YC7JWuLG0S" />
                  </div>
                  <div class="chartjs-size-monitor-shrink s-g_YC7JWuLG0S">
                    <div class=" s-g_YC7JWuLG0S" />
                  </div>
                </div>
                <div
                  class="d-flex align-items-center justify-content-between justify-content-md-center justify-content-xl-between flex-wrap mb-4 s-g_YC7JWuLG0S"
                >
                  <div class="s-g_YC7JWuLG0S">
                    <p class="mb-2 text-md-center text-lg-left s-g_YC7JWuLG0S">Total Ratelimits</p>
                    <h1 class="mb-0 s-g_YC7JWuLG0S">8742</h1>
                  </div>
                  <i class="typcn typcn-briefcase icon-xl text-secondary s-g_YC7JWuLG0S" />
                </div>
                <canvas
                  id="expense-chart"
                  height="122"
                  style="display: block; width: 461px; height: 122px; /*savepage-canvas-image*/ background-image: url(data:image/png;base64,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) !important; background-attachment: scroll !important; background-blend-mode: normal !important; background-clip: content-box !important; background-color: transparent !important; background-origin: content-box !important; background-position: center center !important; background-repeat: no-repeat !important; background-size: 100% 100% !important;"
                  width="461"
                  class="chartjs-render-monitor s-g_YC7JWuLG0S"
                  data-savepage-canvasdatauri="data:image/png;base64,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"
                />
              </div>
            </div>
          </div>
          <div class="col-md-4 grid-margin stretch-card s-g_YC7JWuLG0S">
            <div class="card s-g_YC7JWuLG0S">
              <div class="card-body s-g_YC7JWuLG0S">
                <div class="chartjs-size-monitor s-g_YC7JWuLG0S">
                  <div class="chartjs-size-monitor-expand s-g_YC7JWuLG0S">
                    <div class=" s-g_YC7JWuLG0S" />
                  </div>
                  <div class="chartjs-size-monitor-shrink s-g_YC7JWuLG0S">
                    <div class=" s-g_YC7JWuLG0S" />
                  </div>
                </div>
                <div
                  class="d-flex align-items-center justify-content-between justify-content-md-center justify-content-xl-between flex-wrap mb-4 s-g_YC7JWuLG0S"
                >
                  <div class="s-g_YC7JWuLG0S">
                    <p class="mb-2 text-md-center text-lg-left s-g_YC7JWuLG0S">Total Requests</p>
                    <h1 class="mb-0 s-g_YC7JWuLG0S">47, 840</h1>
                  </div>
                  <i class="typcn typcn-chart-pie icon-xl text-secondary s-g_YC7JWuLG0S" />
                </div>
                <canvas
                  id="budget-chart"
                  height="122"
                  style="display: block; width: 461px; height: 122px; /*savepage-canvas-image*/ background-image: url(data:image/png;base64,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) !important; background-attachment: scroll !important; background-blend-mode: normal !important; background-clip: content-box !important; background-color: transparent !important; background-origin: content-box !important; background-position: center center !important; background-repeat: no-repeat !important; background-size: 100% 100% !important;"
                  width="461"
                  class="chartjs-render-monitor s-g_YC7JWuLG0S"
                  data-savepage-canvasdatauri="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAc0AAAB6CAYAAADd/QhkAAAAAXNSR0IArs4c6QAAEnxJREFUeF7tnW+MXcV5h985u742EhUkIkoL7Dn3bikkMa4xpIHQBHbXUQWRYppIQRFuK8WVUaUYGrutFEOtpJQUS7QxSRypBQW+BCpBG4lUgiiKdxcILRHBJC2U2CL33nPWplJBKeSL7bt771TXf8h6fWbuHPv+mXPOs193zjkzv3lnnvvOvPOOEv5QAAVQAAVQAAWcFFBOpSiEAiiAAiiAAiggQBMjQAEUQAEUQAFHBYCmo1AUQwEUQAEUQAGgiQ2gQI4UqNfrkUt1JycnY5dylEEBFMimANDMphelUWCkCjQajWuDYOwFeyX0lVEUvTrSivJxFCioAkCzoB1Ls4qpANAsZr/SqvwoADTz01fUFAUEaGIEKDBaBYDmaPXn6yiQSQGgmUkuCqNA3xUAmn2XlBeiwOAUAJqD05Y3o4CLAkDTRSXKoIAnCgBNTzqCapRWAaBZ2q6n4XlUAGjmsdeoc5EUAJpF6k3aUngFgGbhu5gGeq4A0PS8g6geCixXAGhiDygwWgWA5mj15+sokEkBoJlJLgqjQN8VAJp9l5QXosDgFACag9OWN6OAiwJA00UlyqCAJwoATU86gmqUVgGgWdqup+F5VABo5rHXqHORFACaRepN2lJ4BYBm4buYBnquAND0vIOoXn4ViON4rdbqD20t0Lr9w1qt9mPXVgJNV6UohwKDUQBoDkZX3ooC0oWmiHrFJkWn074OaGIsKJAfBYBmfvqKmuZMAaCZsw6juijgoADQdBCJIihwNgoAzbNRjWdQwG8FgKbf/UPtcqwA0Mxx51F1FDAoADQxDRQYkAJAc0DC8loUGKECQHOE4vPpYisANIvdv7SunAoAzXL2O60eggJAcwgi8wkUGLICQHPIgvO58igANMvT17S0PAoAzfL0NS0dsgJAc8iC8zkUGIICQ4VmkiRP92jT/4RhuGUI7S7EJ3rp2W7LD2q1cE8hGpvDRgDNHHaap1VuNpu7giC43la9MAxv9rT6harWUKEZx8kzInKDSUGl5BGg6W5fcZy8LSIXmJ7odGQH0HTXs98lgWa/FS3v+7rQVCq4x6LA4SgKLy2vQsNrOdAcktaNxsJNvT5Vq018v1eZ5f8HmlnUGn5ZoDl8zYv6RaDpT88CzSH1RRwnh0TkEouXvSsMw3uzVAdoZlFr+GWB5vA1L+oXgaY/PQs0h9QXQHNIQnv0GaDpUWfkvCpA058OBJpD6gugOSShPfoM0PSoM3JeFaDpTwcCzSH1BdAcktAefQZoetQZOa8K0PSnA43QjOP49l7VjKLowV5llv8/L9GzA2o7e5pZjKUAZYFmATrRkyYATU86QkSM0EyShae01pZzP+qJKJq4NUtT8gLNJEkOaC2Xm9umdkfRxM6MbQeaWQQrQFmgWYBO9KQJQNOTjgCa6R0BNP0x0DzXBGjmuff8qjvQ9Kc/8DRT+gJo+mOgea4J0Mxz7/lVd6DpT38ATaDpjzUWrCZAs2AdOsLmAM0Rir/i00ATaPpjjSOsSb1ej8bHx7faqtDpdGar1eqsazXzAs1mszkTBMGMrV1LS0sPTU5Oxq5tT5Jkk4h8xFZ+fHz8gYsvvvgt13eWuRzQ9Kf3gSbQ9McaR1iTLjTHxsabtipo3dlYVGgqFeyztb3dXqpmhabW8qTtnatWjb8PaLoZPdB002kYpYAm0ByGnXn/DaAJNH02UqDpT+8ATaDpjzWOsCZAE2iO0Px6fhpo9pRoaAWAJtAcmrH5/CGgCTR9tk+g6U/vAE2g6Y81jrAmQBNojtD8en56ENBcWFi4r9MR6x2cUTTxxz0rV7ICQBNolszk05sLNIGmzwNhcNDUXzK1Wyk5GIbhFT7rMoq6AU2gOQq78+6bQBNoemeUyyoENP3pHaBZYGiKBNuj6NIH/DE3f2sCNIGmv9YpAjT96R2gCTT9scYR1gRoAs0Rml/PTwPNnhINrUDuoRnHybM2tZRSPwvDiTuyKFqU3LN4mu69DjT9h2az2bxNqeDPbL3a6bT/oFarHXXv+f6XbDSS7UEgn7a9OYrCG7J8GWhmUWuwZYsAzZdE5GrzZrbaCzQHa0RFeDvQzA00H+0BzfM8gebXLPV8J4rCC7OMG6CZRa3BlgWaLM8O1MIajcYapdQne32kWq1+t1eZQf4faALNftnXSU+zlNBsNpuf6aXjqMd6r/r1+j/QBJq9bOSc/t+FZhCMHbG9ROvO5mq1+tg5fegcHwaaQPMcTejdx8sMzSRZ+KbWeptFy/1RFF7TL61H8R6gCTQHandAU73SYznxulqt9mPXTmg0GtcGwdgL9vL6yiiKXnV9Z/eWkzwkbD+5p8nybHrHHo6i0JqoYOVjJ5Ib9PecJtDU+mbzwFNPRNHEra4Ds1sujpNnRMS4Aa6UPBKG4ZaM72RP0yjY6I+cAE2gaTLPrLecDAKacRxvFQnuts05UTRRzTIn4WniaRrsBWhmGUhxnBwSkUtMzyglu8IwvDfjO98WkQvMzwBNVz1Zni3n8uwJaKoHLXbSjqJw3NWOuuWAJtAEmmcooHZH0cTOLAMJaJrVYk+T5VmXsTQ4TxNopul/Nmn0WJ5ledb0gwFousxyx391EwjEnma6Av4szwJNoOk4oYkIgUApWpHcwN2AepUEmuxp+r+nCTSBZq+Z7Nf/B5pA091azqIk0ASaQPMMBQqb3IDlWZZnWZ49C1AufwRoAk2gCTSXKcA5zSxzKkdO/I+eTZLElslEtNavRVH0kGu/A83+QvOv9m/d8ovFA39i0/+DlXV7vrrhW0+69lGZz2kSPVvOc5q95rnu2AnDcEfqsrVpYCXJwlMaT7N0nmYcJ0siMmaecPXtQNMNR3EcrxXpLzSrs6uuVUpZkxuMabny9ZkWyQ0cuglolhOacbzwuIj+rMlElFJPh+FEavpP9jTZ0zxNAaBp+bmgOxur1eqsw1x8vAjQFKu3S/SsqyXl5z7NQexpds9Q91JqcnIy7lVm+f+BJrecGOwle3IDoAk00xRot5eqWSamJEk2aQ00DdZEIFAGwiVJ8rDW8nnLI89GUXhjhlcK0ASaQDPLiEkpm5eMQCzPBn3NPcvyrP/Ls0CT3LOp07svafTwNPE08TRPU4A0ehl+kA5ieRZoAk2guUIB0ui5p9HD08TTNDCssLecAE2gCTRLAs27X/7CLevWfOQe2w/1l4786Ov3X/3Qw64/5oEm0ASaZyjAnqbrBHIiQjHhajCjYAQCudrSIPY0L5utrG0rsd6nqbW+rjmz6HyfJtAEmkATaL6rAPdpjv5qMPY0+7enCTSJniV69gwFMmcEYnmW5VmWZ0uyPAs0gSbQBJrLFOASatelv5PLyLm4hBpPE0+T6FmiZ7sK+HKfZqk9zft+9tc/soGmI0vtu9fvznhItbx7mr30/OXSm837r/mnP8oId+/T6L3xxhsXLS4u3mRrl1LqV2EYfs+17expBvtsWpHcwNWSunfIJtuDQGw5nDMnN7hr/xf+5TfG3vObtlrsXH/vx9xrKbKwsHBfp8M5zTTNvEmjV5tf/YxofYOpY7WSR5pTrS1ZOj4vgUDPvT7XtLXr/9pvfXfTFZ9NTRBseq42V3lbRC4w/V9ptaM+c2xPRj1zAs2lN+3QlFuAplvPk7Dd//s0a7OVXaLEGImtRA7Xp1uXuvX4iVJAMwe5Z8sMzcm5yiEt5ltORGRXY7p1bxajB5pmtZQCmq62BDSBZrq3JQfDMLzC1Y665Uhu0OdbToAm0EwbgFmTG5xYnsXTNE1m3HJSO+o60ecljR6eZg5yz173fNV6dmxMjy0+/7FfZFpDzws0e7X9Peqi5Onrf2K8ViZtwOJpmqcxoMk5TRfINZvN25Qq5zlNoJkDaE7OV57SWm42GrOSJxpTrVtdjP1UmbxAszZfOSBaLjfuvYrsbk63dmZpO9AEmuleNskNXMcR0GRP02ArfmQEAppAM91AR38J9SCWZ+9++c7rr6is22ubwF8+8h+P7vnww//gOsnn5Zzm9p9s+YsN5310s61dB1r/te2rG77x765tv2v/tl0fWL3+07byh4LXPnfXB7920PWdQBNoAs0VCvgSPYunKWMWv/D2KIoecp3oGo3GmiAYO2Ir78PybG3fmkiCjjXCudPpbIw3LjlfQp0XaEb7xmeCwH7kRDpBtbHxqPNFv7XZ1ZtEafsl1NJ638FpecvVloAm0ASaQHO5AkTPOs6eg/A0gSbQNJifF1eDsafJnmaqfeJpcuTEhZtAU71g0ylr9CyeZjmPnFz/3GXf/mXnf63BnD+/8VccOVkx2JRp8LGnyZ5mmfY08TTxNMvmaVbnKvcpkS8Zf4ApOdiYagHNokHzb376l8/ZfnW3pX3snqv2fMLFgzlVhj1N9jTT7IU9zdHuad7x4ua9F636rfX2/fGlT31lwwPdTFlOf4M4p/nnL2755/eueq81O8+Xr/r7jztV8GShQSzPAs0+ZwTKi6c5OV95SWu52hK4srcxvXhHJgPlyEnfAoG+8vIXL/z4+Td37zw1/tWPHvjHrevuvN+1j1ieLefy7ORs5Tat5FErNKV1XnNaRprcYHJ29XattDX3bGO6daGrvXfL5QWaTx781++cr87/qKltWvTRT/zOTWuztD03CduBJsuz/Vierc7JGiUVa/Ss0rK5PtN6zHUgAU2gaZ6UgabrOBqEp1mbW/VNEbXNVAelZH99qnWNax275YBmnxO242n6nbAdaMor9uXE0Sc3yEsg0CA8zQ3z77/zHXn7b60rIVPHjJcipD1XZk8TaOYgIxDQBJppE1fWhO0EAvkfCDQIaNb2rdoqgT16tjHdGs/iGQFNPM10e/EkjR7QBJpA83QFinrkBGj2N7kBy7MEAhl+DGoCgTL8TP72f+990Vb80GL8/JfX3/9F11eyPMvyrMlWVmXMCAQ0gabBljLnnn3w1a8/O6bGzrPNY3/6oW2/l/qD3PQQgUDlDASqzVXsl1B39O2NjYvOafSAJtAEmmco8E5Ro2cHsaf50/pL36mo1Z8y2dFSZ+mV3/3tq37f9Yf88Wjk+crjosV4U5VS8nR9qvVJoOmoapnPaQJNs5FwTnO05zTxNMvpaVbnKw8rbUmjp9SzjaljNzpO78eLAU3Oaabai9JqR33m2J5MxoSnaZQLaAJNl7FEIFB/A4GAJkdOTOOu/wnbRW2vTx97wGWgnyqDp4mnmaqAB7ec4GniaaZ7B3iaW7JM8kTPWqJngeb3XG2JIyccOTHYSpsjJ66jSGQQe5p4mniaeJorFMiaEejvXttx+YfHZ/7NNpR/fvQ/v3Xnuru+4TrcgSbQBJorB2b2hO1Ak+QGqeNIi+xuTrd2uk7I3XKTc5VDWuQSyzMszzoKevmcXLQolTetxbW6pTFzDE/TQdMyZwQiuUF/bzkBmkATaK5UwIMjJ0CT3LOm3wI6Y8J2oAk002yJIydlveWkoHuaQBNoAs3TFVAih+vTLet1ZCs1y0tGIPY02dNkT/Mc9zSBJtAEmkDzXQU4p9kietZhH6pbpDZX6V62a7yBQeFpsqfpYEvsaZKwPdVMFIFAqUu3pjFFGr0CpNEDmkATaFoVYE+TPU32NM9QoMQJ24Em0ASaQNOgAHua5J41mAbQdJg33y2Sh4xA7Gmyp8meJnua7GmKiFbySHOKPU1XyLGnaVGKc5qvutoRe5rsabKnueJHCLecLN7hOoEcD7CZrxwQzZ5mqmac05x1taXLZitr24qrwUx6cZ+mqyWJ1GYru0SRezYd7uSeJXrWcSzhaeJppikwpuXK12daeJoO44hAIAKBCAQiEOjXS/0EAhEI5AAOlmdZnmV5luXZZQoQCOQwbxIItG9NJEGnadOK+zS5T9NlLHGfJvdpptuJkicaU61bXYzoVJna/OpnhIxAJslI2O5oTETPEj1rMhVyzzoOIhHhyAlHTgzWgqfpPoyOZxlaEpEx4zMEAhEI5GBQtdnVm0TpJ21FCQRyEPJkEQKB5PNGtUijx5ET16FEIBCBQAQCna4Anqbr7IGnKRpPE09zhQLknuU+TZcplEAgAoEIBCIQiEAgEQGaQBNo2hXgyAlHTtIshPs0uU/TZe48XoY9TbNURM8SPesykIieJXo23U6Int3pMoBOlZmcqxzSIpdYniF61lFQomeJnjWZCnuajoOI6NnH2dM02grRs+7DCE/TphWeJp6my1jC08TTxNNcoYAW2d2cbuFpOswg1TlZo6RyxFZUadlcn2k95vC640XwNPE08TRXBK6IHK5Pty51HUPdcpzTJHrWYC94mlkGEnua7GmmKtAJqo2NeJouYwlPs9ie5v8DfXhCDwpyiboAAAAASUVORK5CYII="
                />
              </div>
            </div>
          </div>
          <div class="col-md-4 grid-margin stretch-card s-g_YC7JWuLG0S">
            <div class="card s-g_YC7JWuLG0S">
              <div class="card-body s-g_YC7JWuLG0S">
                <div class="chartjs-size-monitor s-g_YC7JWuLG0S">
                  <div class="chartjs-size-monitor-expand s-g_YC7JWuLG0S">
                    <div class=" s-g_YC7JWuLG0S" />
                  </div>
                  <div class="chartjs-size-monitor-shrink s-g_YC7JWuLG0S">
                    <div class=" s-g_YC7JWuLG0S" />
                  </div>
                </div>
                <div
                  class="d-flex align-items-center justify-content-between justify-content-md-center justify-content-xl-between flex-wrap mb-4 s-g_YC7JWuLG0S"
                >
                  <div class="s-g_YC7JWuLG0S">
                    <p class="mb-2 text-md-center text-lg-left s-g_YC7JWuLG0S">Predicted Costs</p>
                    <h1 class="mb-0 s-g_YC7JWuLG0S">$7, 243</h1>
                  </div>
                  <i class="typcn typcn-clipboard icon-xl text-secondary s-g_YC7JWuLG0S" />
                </div>
                <canvas
                  id="balance-chart"
                  height="122"
                  style="display: block; width: 461px; height: 122px; /*savepage-canvas-image*/ background-image: url(data:image/png;base64,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) !important; background-attachment: scroll !important; background-blend-mode: normal !important; background-clip: content-box !important; background-color: transparent !important; background-origin: content-box !important; background-position: center center !important; background-repeat: no-repeat !important; background-size: 100% 100% !important;"
                  width="461"
                  class="chartjs-render-monitor s-g_YC7JWuLG0S"
                  data-savepage-canvasdatauri="data:image/png;base64,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"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row s-g_YC7JWuLG0S">
          <div class="col-md-12 s-g_YC7JWuLG0S">
            <h5>Recent Entries</h5>
            <div class="card s-g_YC7JWuLG0S">
              <div class="table-responsive pt-3 s-g_YC7JWuLG0S">
                <table class="table table-striped project-orders-table s-g_YC7JWuLG0S">
                  <thead class="s-g_YC7JWuLG0S">
                    <tr class="s-g_YC7JWuLG0S">
                      <th class="ml-5 s-g_YC7JWuLG0S">ID </th>
                      <th class="s-g_YC7JWuLG0S">YubiKey OTP</th>
                      <th class="s-g_YC7JWuLG0S">User </th>
                      <th class="s-g_YC7JWuLG0S">Timestamp </th>
                      <th class="s-g_YC7JWuLG0S">Serial </th>
                      <th class="s-g_YC7JWuLG0S">Status </th>
                      <th class="s-g_YC7JWuLG0S">Actions </th>
                    </tr>
                  </thead>
                  <tbody class="s-g_YC7JWuLG0S">
                    {#await fetchLogData()}
                      <tr class="s-g_YC7JWuLG0S">
                        <td class="s-g_YC7JWuLG0S">-</td>
                        <td class="s-g_YC7JWuLG0S">Loading...</td>
                        <td class="s-g_YC7JWuLG0S">-</td>
                        <td class="s-g_YC7JWuLG0S">-</td>
                        <td class="s-g_YC7JWuLG0S">-</td>
                        <td class="s-g_YC7JWuLG0S">-</td>
                        <td class="s-g_YC7JWuLG0S">-</td>
                      </tr>
                    {:then data}
                      {#each data as log}
                        <tr class="s-g_YC7JWuLG0S">
                          <td class="s-g_YC7JWuLG0S">{log.id}</td>
                          <td class="s-g_YC7JWuLG0S">{log.otp}</td>
                          <td class="s-g_YC7JWuLG0S">{log.user}</td>
                          <td class="s-g_YC7JWuLG0S">{log.timestamp}</td>
                          <td class="s-g_YC7JWuLG0S">{log.sn}</td>
                          <td class="s-g_YC7JWuLG0S">{log.status}</td>
                          <td class="s-g_YC7JWuLG0S">
                            <div class="d-flex align-items-center s-g_YC7JWuLG0S">
                              <button
                                type="button"
                                class="btn btn-success btn-sm btn-icon-text mr-3 s-g_YC7JWuLG0S"
                                on:click={() =>
                                  manageEntry(log.id.toString(), 'INSERT', {
                                    status: prompt('Change status to:') ?? 'OK'
                                  })}
                                >Edit
                              </button><button
                                type="button"
                                class="btn btn-danger btn-sm btn-icon-text s-g_YC7JWuLG0S"
                                on:click={() => manageEntry(log.id.toString(), 'DELETE')}
                                >Delete</button
                              >
                            </div>
                          </td>
                        </tr>
                      {/each}
                    {/await}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer s-g_YC7JWuLG0S">
        <div class="card s-g_YC7JWuLG0S">
          <div class="card-body s-g_YC7JWuLG0S">
            <div class="d-sm-flex justify-content-center justify-content-sm-between s-g_YC7JWuLG0S">
              <span
                class="text-muted text-center text-sm-left d-block d-sm-inline-block s-g_YC7JWuLG0S"
                >Copyright © 2020 Bootstrapdash. All rights reserved.
              </span><span
                class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted s-g_YC7JWuLG0S"
                style="visibility: hidden;"
                >Serr PJR-749 Jrnxarffrf
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</div>

<style data-sveltekit>
  p,
  h5,
  h4,
  h6,
  button,
  td,
  h1,
  h3,
  th {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
      Arial, sans-serif;
  }

  @supports (-ms-overflow-style: none) {
  }

  :root {
    --blue: #5e50f9;
    --indigo: #6610f2;
    --purple: #6a008a;
    --pink: #e91e63;
    --red: #f96868;
    --orange: #f2a654;
    --yellow: #f6e84e;
    --green: #46c35f;
    --teal: #58d8a3;
    --cyan: #57c7d4;
    --white: #ffffff;
    --gray: #6c757d;
    --gray-dark: #0f1531;
    --blue: #5e50f9;
    --indigo: #6610f2;
    --purple: #6a008a;
    --pink: #e91e63;
    --red: #f96868;
    --orange: #f2a654;
    --yellow: #f6e84e;
    --green: #46c35f;
    --teal: #58d8a3;
    --cyan: #57c7d4;
    --white: #ffffff;
    --gray: #434a54;
    --gray-light: #aab2bd;
    --gray-lighter: #e8eff4;
    --gray-lightest: #e6e9ed;
    --black: #000000;
    --primary: #844fc1;
    --secondary: #6c7293;
    --success: #21bf06;
    --info: #3b86d1;
    --warning: #f39915;
    --danger: #dc3545;
    --light: #f8f9fa;
    --dark: #282f3a;
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --font-family-sans-serif: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', 'Noto Color Emoji';
    --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
  }

  .s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  .s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S::before,
  .s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S::after {
    box-sizing: border-box;
  }

  h1.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  h3.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  h4.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  h5.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  h6.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  p.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  table.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    border-collapse: collapse;
  }

  th.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    text-align: inherit;
    text-align: -webkit-match-parent;
  }

  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    border-radius: 0;
  }

  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:focus {
    outline: 1px dotted;
    outline: 5px auto -webkit-focus-ring-color;
  }

  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    overflow: visible;
  }

  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    text-transform: none;
  }

  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  [type='button'].s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    -webkit-appearance: button;
    appearance: button;
  }

  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:not(:disabled),
  [type='button'].s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:not(:disabled) {
    cursor: pointer;
  }

  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S::-moz-focus-inner,
  [type='button'].s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S::-moz-focus-inner {
    padding: 0;
    border-style: none;
  }

  .s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S::-webkit-file-upload-button {
    font: inherit;
    -webkit-appearance: button;
  }

  h1.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  h3.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  h4.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  h5.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  h6.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
  }

  h1.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    font-size: 2.5rem;
  }

  h3.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    font-size: 1.75rem;
  }

  h4.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    font-size: 1.5rem;
  }

  h5.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    font-size: 1.25rem;
  }

  h6.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    font-size: 1rem;
  }

  .container-fluid.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    width: 100%;
    padding-right: 0.6875rem;
    padding-left: 0.6875rem;
    margin-right: auto;
    margin-left: auto;
  }

  .row.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    display: flex;
    flex-wrap: wrap;
    margin-right: -0.6875rem;
    margin-left: -0.6875rem;
  }

  .col-6.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  .col-md-4.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  .col-md-6.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  .col-md-12.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  .col-xl-6.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    position: relative;
    width: 100%;
    padding-right: 0.6875rem;
    padding-left: 0.6875rem;
  }

  .col-6.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    flex: 0 0 50%;
    max-width: 50%;
  }

  @media (min-width: 768px) {
    .col-md-4.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      flex: 0 0 33.33333%;
      max-width: 33.33333%;
    }

    .col-md-6.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      flex: 0 0 50%;
      max-width: 50%;
    }

    .col-md-12.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }

  .table.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    width: 100%;
    margin-bottom: 1rem;
    color: #001737;
  }

  .table.s-g_YC7JWuLG0S th.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  .table.s-g_YC7JWuLG0S td.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    padding: 1.25rem 0.9375rem;
    vertical-align: top;
    border-top: 1px solid #f3f3f3;
  }

  .table.s-g_YC7JWuLG0S thead th.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    vertical-align: bottom;
    border-bottom: 2px solid #f3f3f3;
  }

  .table-striped.s-g_YC7JWuLG0S tbody tr.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:nth-of-type(odd) {
    background-color: #f4f5fa;
  }

  .table-responsive.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .btn.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    display: inline-block;
    font-weight: 400;
    color: #001737;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.875rem 1.5rem;
    font-size: 0.875rem;
    line-height: 1;
    border-radius: 0.1875rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
      border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .btn.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      transition: none;
    }
  }

  .btn.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:hover {
    color: #001737;
    text-decoration: none;
  }

  .btn.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  .btn.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:disabled {
    opacity: 0.65;
  }

  .btn.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:not(:disabled):not(.disabled) {
    cursor: pointer;
  }

  .btn-success.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    color: #fff;
    background-color: #21bf06;
    border-color: #21bf06;
  }

  .btn-success.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:hover {
    color: #fff;
    background-color: #1b9a05;
    border-color: #188e04;
  }

  .btn-success.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:focus {
    color: #fff;
    background-color: #1b9a05;
    border-color: #188e04;
    box-shadow: 0 0 0 0.2rem rgba(66, 201, 43, 0.5);
  }

  .btn-success.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:disabled {
    color: #fff;
    background-color: #21bf06;
    border-color: #21bf06;
  }

  .btn-success.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:not(:disabled):not(.disabled):active {
    color: #fff;
    background-color: #188e04;
    border-color: #168104;
  }

  .btn-success.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:not(:disabled):not(
      .disabled
    ):active:focus {
    box-shadow: 0 0 0 0.2rem rgba(66, 201, 43, 0.5);
  }

  .btn-danger.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
  }

  .btn-danger.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:hover {
    color: #fff;
    background-color: #c82333;
    border-color: #bd2130;
  }

  .btn-danger.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:focus {
    color: #fff;
    background-color: #c82333;
    border-color: #bd2130;
    box-shadow: 0 0 0 0.2rem rgba(225, 83, 97, 0.5);
  }

  .btn-danger.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:disabled {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
  }

  .btn-danger.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:not(:disabled):not(.disabled):active {
    color: #fff;
    background-color: #bd2130;
    border-color: #b21f2d;
  }

  .btn-danger.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:not(:disabled):not(
      .disabled
    ):active:focus {
    box-shadow: 0 0 0 0.2rem rgba(225, 83, 97, 0.5);
  }

  .btn-sm.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    padding: 0.5rem 0.81rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.1875rem;
  }

  .card.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid #e4e4f4;
    border-radius: 0.25rem;
  }

  .card-body.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.25rem;
  }

  .d-block.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    display: block !important;
  }

  .d-flex.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    display: flex !important;
  }

  @media (min-width: 576px) {
    .d-sm-inline-block.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      display: inline-block !important;
    }

    .d-sm-flex.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      display: flex !important;
    }
  }

  .flex-column.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    flex-direction: column !important;
  }

  .flex-wrap.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    flex-wrap: wrap !important;
  }

  .justify-content-center.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    justify-content: center !important;
  }

  .justify-content-between.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    justify-content: space-between !important;
  }

  .align-items-center.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    align-items: center !important;
  }

  @media (min-width: 576px) {
    .justify-content-sm-between.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      justify-content: space-between !important;
    }
  }

  @media (min-width: 768px) {
    .justify-content-md-center.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      justify-content: center !important;
    }
  }

  @media (min-width: 1200px) {
    .justify-content-xl-between.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      justify-content: space-between !important;
    }
  }

  .float-none.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    float: none !important;
  }

  @media (min-width: 576px) {
    .float-sm-right.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      float: right !important;
    }
  }

  @supports (position: sticky) {
  }

  .h-100.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    height: 100% !important;
  }

  .mb-0.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    margin-bottom: 0 !important;
  }

  .mt-1.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    margin-top: 0.25rem !important;
  }

  .mb-2.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    margin-bottom: 0.5rem !important;
  }

  .mr-3.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    margin-right: 1rem !important;
  }

  .mb-4.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    margin-bottom: 1.5rem !important;
  }

  .ml-5.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    margin-left: 3rem !important;
  }

  .pt-3.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    padding-top: 1rem !important;
  }

  .mt-auto.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    margin-top: auto !important;
  }

  @media (min-width: 576px) {
    .mt-sm-0.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      margin-top: 0 !important;
    }
  }

  .text-center.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    text-align: center !important;
  }

  @media (min-width: 576px) {
    .text-sm-left.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      text-align: left !important;
    }
  }

  @media (min-width: 768px) {
    .text-md-center.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      text-align: center !important;
    }
  }

  @media (min-width: 992px) {
    .text-lg-left.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      text-align: left !important;
    }
  }

  .text-secondary.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    color: #6c7293 !important;
  }

  .text-muted.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    color: #a5abcc !important;
  }

  @media print {
    .s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
    .s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S::before,
    .s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S::after {
      text-shadow: none !important;
      box-shadow: none !important;
    }

    thead.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      display: table-header-group;
    }

    tr.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      page-break-inside: avoid;
    }

    p.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
    h3.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      orphans: 3;
      widows: 3;
    }

    h3.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      page-break-after: avoid;
    }

    @page {
      size: a3;
    }

    .table.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      border-collapse: collapse !important;
    }

    .table.s-g_YC7JWuLG0S td.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
    .table.s-g_YC7JWuLG0S th.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      background-color: #ffffff !important;
    }
  }

  div.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  h1.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  h3.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  h4.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  h5.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  p.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  span.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    text-shadow: none;
  }

  [type='button'].s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:focus,
  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S::-moz-focus-inner {
    outline: 0;
  }

  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:focus {
    outline: none;
    outline-width: 0;
    outline-color: transparent;
    box-shadow: none;
    outline-style: none;
  }

  .btn.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  .btn.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:active,
  .btn.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:focus,
  .btn.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:hover,
  .btn.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:visited,
  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:active,
  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:hover,
  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:visited,
  div.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }

  .btn.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:active:focus,
  .btn.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:focus,
  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:active,
  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:checked,
  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:focus,
  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:hover,
  button.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:visited {
    outline: 0;
    outline-offset: 0;
  }

  h1.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  h3.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  h4.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  h5.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  h6.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    font-weight: 500;
    line-height: 1;
  }

  p.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    line-height: 1.3rem;
  }

  h1.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    font-size: 3.125rem;
  }

  h3.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    font-size: 1.875rem;
  }

  h4.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    font-size: 1.5rem;
  }

  h5.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    font-size: 1.25rem;
  }

  h6.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    font-size: 1rem;
  }

  .s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:-moz-full-screen,
  .s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:-webkit-full-screen,
  .s-g_YC7JWuLG0S:fullscreen .s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:-ms-fullscreen {
    overflow: auto;
  }

  .container-scroller.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    overflow: hidden;
  }

  .footer.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    background: #f4f5fa;
    padding: 0 1.812rem 2.062rem 1.812rem;
    transition: all 0.25s ease;
    -moz-transition: all 0.25s ease;
    -webkit-transition: all 0.25s ease;
    -ms-transition: all 0.25s ease;
    font-size: calc(0.875rem - 0.05rem);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
      Arial, sans-serif;
    font-weight: 400;
  }

  @media (max-width: 991px) {
    .footer.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      margin-left: 0;
      width: 100%;
    }
  }

  .grid-margin.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    margin-bottom: 1.375rem;
  }

  .stretch-card.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: stretch;
    align-items: stretch;
    -webkit-justify-content: stretch;
    justify-content: stretch;
  }

  .stretch-card.s-g_YC7JWuLG0S > .card.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    width: 100%;
    min-width: 100%;
  }

  .project-orders-table.s-g_YC7JWuLG0S thead tr th.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:first-child {
    padding-left: 1.9rem;
    padding-right: 1.9rem;
  }

  .project-orders-table.s-g_YC7JWuLG0S thead tr th.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:last-child {
    padding-right: 1.9rem;
  }

  .project-orders-table.s-g_YC7JWuLG0S tbody tr td.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:first-child {
    padding-left: 1.9rem;
  }

  .project-orders-table.s-g_YC7JWuLG0S tbody tr td.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:last-child {
    padding-right: 1.9rem;
  }

  .btn.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    font-size: 0.875rem;
    line-height: 1;
    font-weight: 400;
  }

  .btn.btn-sm.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    font-size: 0.875rem;
    padding: 0.47rem 0.6rem;
  }

  .btn-success.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  .btn-success.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:hover {
    box-shadow: 0 2px 2px 0 rgba(33, 191, 6, 0.14), 0 3px 1px -2px rgba(33, 191, 6, 0.2),
      0 1px 5px 0 rgba(33, 191, 6, 0.12);
  }

  .btn-danger.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  .btn-danger.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S:hover {
    box-shadow: 0 2px 2px 0 rgba(220, 53, 69, 0.14), 0 3px 1px -2px rgba(220, 53, 69, 0.2),
      0 1px 5px 0 rgba(220, 53, 69, 0.12);
  }

  .card.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    box-shadow: 0 5px 10px 0 rgba(230, 230, 243, 0.88);
    -webkit-box-shadow: 0 5px 10px 0 rgba(230, 230, 243, 0.88);
    -moz-box-shadow: 0 5px 10px 0 rgba(230, 230, 243, 0.88);
    -ms-box-shadow: 0 5px 10px 0 rgba(230, 230, 243, 0.88);
  }

  .card.s-g_YC7JWuLG0S .card-body.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    padding: 1.5rem 1.8rem;
  }

  .icon-xl.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    font-size: 3.2rem;
  }

  .table.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    margin-bottom: 0;
  }

  .table.s-g_YC7JWuLG0S thead th.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    border-top: 0;
    border-bottom-width: 1px;
    font-weight: 500;
    font-size: 1rem;
  }

  .table.s-g_YC7JWuLG0S th.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  .table.s-g_YC7JWuLG0S td.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    vertical-align: middle;
    line-height: 1;
    white-space: nowrap;
  }

  .table.s-g_YC7JWuLG0S td.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    font-size: 0.875rem;
  }

  .page-body-wrapper.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    min-height: calc(100vh - 4.625rem);
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    -webkit-flex-direction: row;
    flex-direction: row;
    padding-left: 0;
    padding-right: 0;
    padding-top: 1.875rem;
    background: #f4f5fa;
  }

  .main-panel.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    transition: width 0.25s ease, margin 0.25s ease;
    width: calc(100% - 236px);
    min-height: calc(100vh - 4.625rem);
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
  }

  @media (max-width: 991px) {
    .main-panel.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      margin-left: 0;
      width: 100%;
    }
  }

  .content-wrapper.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    padding: 0 1.812rem 1.812rem;
    width: 100%;
    -webkit-flex-grow: 1;
    flex-grow: 1;
  }

  @media (max-width: 767px) {
    .content-wrapper.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
      padding: 1.5rem 1.5rem;
    }
  }

  @keyframes s-g_YC7JWuLG0S-chartjs-render-animation {
    from {
      opacity: 0.99;
    }

    to {
      opacity: 1;
    }
  }

  .chartjs-render-monitor.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    animation: s-g_YC7JWuLG0S-chartjs-render-animation 1ms;
  }

  .chartjs-size-monitor.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  .chartjs-size-monitor-expand.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S,
  .chartjs-size-monitor-shrink.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    position: absolute;
    direction: ltr;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    pointer-events: none;
    visibility: hidden;
    z-index: -1;
  }

  .chartjs-size-monitor-expand.s-g_YC7JWuLG0S > div.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    position: absolute;
    width: 1000000px;
    height: 1000000px;
    left: 0;
    top: 0;
  }

  .chartjs-size-monitor-shrink.s-g_YC7JWuLG0S > div.s-g_YC7JWuLG0S.s-g_YC7JWuLG0S {
    position: absolute;
    width: 200%;
    height: 200%;
    left: 0;
    top: 0;
  }
</style>
