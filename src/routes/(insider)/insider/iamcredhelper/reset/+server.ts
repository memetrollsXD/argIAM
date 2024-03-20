import Database from "$lib/server/Database";
import { createHash } from "crypto";

const attempts = new Map();

export async function GET({ url, getClientAddress }) {
    const params = new URLSearchParams(url.search);
    const username = params.get("u");
    const yubikey = params.get("y");
    const managerCode = params.get("m");

    if (!username || !yubikey || !managerCode) {
        return new Response("Missing parameters", { status: 400 });
    }

    if (managerCode !== "55555") {
        const ip = await getClientAddress();
        const count = attempts.get(ip) || 0;
        attempts.set(ip, count + 1);
        if (count >= 3) {
            return new Response("Too many attempts", { status: 429 });
        }

        return new Response("Invalid manager code. WARNING: 3 attempts per device.", { status: 403 });
    }

    if (username.includes("insider")) {
        return new Response("??? why", { status: 418 });
    }

    if (!username.endsWith("@arg.iam")) {
        return new Response("Account not found", { status: 404 });
    }

    const entry = Database.xeonLogs.find(x => x.otp === yubikey && x.user === username);
    if (!entry) {
        return new Response("Invalid credentials", { status: 403 });
    }

    // sha256
    const gnorpgnorp = sha256(`${sha256(`${username}:55555`)}:${Database.insiderIp}:saltygnorpgnorpsalt`);
    return new Response(`Password of ${username} reset to ${gnorpgnorp.toString()}`, { status: 501 });
}

function sha256(input: string) {
    return createHash("sha256").update(input).digest("hex");
}