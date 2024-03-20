# argIAM Walkthrough

## Challenge Details

### Description

> argIAM is a 2-player CTF challenge that requires you to exploit vulnerable custom-made apps with an insider and your own hacking knowledge. The goal is to gain total access of the insider panel. Both players are required to work together to solve the challenge.

### Category

> Web

### Challenge Difficulty

> Medium

## Walkthrough

<details>
    <summary>Insider side</summary>
    <details>
        <summary>Step 1</summary>
        First, we need to login to the insider panel. We can do this by going to the login page and entering the credentials "insider@arg.iam:insider".
    </details>
    <details>
        <summary>Step 2</summary>
        Then, we need to look at the logs. There are a lot of juicy logs there, here are some notable ones:<br>
        - Service account 'monitor@arg.iam' logged in (xxxx)
        - User 'xxxxxx'
    </details>
    <details>
        <summary>Step 3</summary>
        We can also extract some hints from the chat. We need а VPN, and managers are the only ones able to reset passwords.
    </details>
</details>

<details>
    <summary>Hacker side</summary>
    <details>
        <summary>Step 1</summary>
        Before we start enumerating, you will have noticed that you have no access at all to any route. They will all return "Unauthorized IP". This application was designed to run behind a reverse proxy, but this is not the case. We can bypass this by setting the X-Forwarded-For header to any IP of our liking. Setting it to any private IP in the 10.0.0.0/24 range will work. <br>
        NOTE: I have seen another hilarious bypass. Because of how Svelte works (with all optimizations, etc) you can just reply with a template Svelte bootstrap HTML instead of relying on the server for a response, and the client will load as designed...
    </details>
    <details>
        <summary>Step 2</summary>
        Open up dirbuster and start a scan on the target. We can see that there is a sussy directory "/admin/Enterprise_Applications/xeon". Let's go there. We can see that there is a login page.
    </details>
    <details>
        <summary>Step 3</summary>
        We will need some help from our dear insider for this step. Looking at the devtools network tab, the password is hashed client side. Let's take a look at the algorithm. It is hashed 3 (???) times using an algorithm plus some salt. Googling some constants in that function (1732584193) hints that it is MD5. Using a proxy we can intercept the request and change the hash.
    </details>
    <details>
        <summary>Step 4</summary>
        We are presented with a simple database admin panel. There seem to be OTP tokens, but they are redacted. Sniffing around the HTML we can find a hint encoded in rot13. It says "Free CWE-749 Weaknesses". CWE-749 is a weakness corresponding to exposed dangerous methods or functions. Playing around with the UI a bit, we can change a DB entry's status. It sends a POST request to /api/ea_xeondb/entires with the body {id: "0", status: "OK", method: "INSERT"}. We fuzz the method parameter and find out that it's not SQLi, but it still follows SQL syntax. Changing this to "SELECT" will give us the raw entry, without the redaction.
    </details>
    <details>
        <summary>Step 5</summary>
        On our path bruteforce, we also found "/hacker/docs" where you can find a Word document. In there, we find some juicy info like ~~the sexual harrassment policy~~ a download path and an exe name. There is just one problem. We need the version and we need our insider to run that script. Downloading v1.0.0.0.zip will get you gatoed. So download /insider/ops/dl/argIAMCredentialHelper/v1.0.1.1.zip instead.
    </details>
    <details>
        <summary>Step 6</summary>
        Using dnspy on it, it's looks unreadable. But it's easy to understand once you power through it. Debugging the app takes us to an endpoint http://arg.iam/insider/iamcredhelper/reset. It's just a wrapper for this endpoint. It sends the inputted parameters, but it does a ratelimit check beforehand. It boils down to (x * x * x * x * x) == 3125.

        Bruteforcing this, we get the code 5 * 5 * 5 * 5 * 5 = 3125. We can now reset any password of any given e-mail with the yubikey and the manager code.
    </details>
    <details>
        <summary>Step 7</summary>
        Now we can reset the password of the manager (we got it from the Word document) and log in via BANDERA. It says that the user is currently logged in, but after retrying a few times, we can log in. We can now export the flag to XeonDB. GG!
    </details>
</details>
