import Database from "$lib/server/Database.js";
import OpAuth from "$lib/server/OpAuth";
import { createHash } from "crypto";

export async function POST({ request, getClientAddress, cookies }) {
    const { username, password } = await request.json();
    const token = request.headers.get("Authorization");
    if (!token) return new Response(JSON.stringify({ error: `Unauthorized.` }), { status: 401 });

    const session = OpAuth.getSession(token);
    if (session) {
        const HOKA = OpAuth.login(username, password, getClientAddress());
        if (HOKA) {
            const HOKAsession = OpAuth.getSession(HOKA);
            if (HOKAsession?.user.username !== "qiulin.feng@arg.iam") return new Response(JSON.stringify({ error: `User not HOKA Authorized.` }), { status: 401 });
            const chance = Math.floor(Math.random() * 5);
            if (chance === 0) {
                Database.hackerIp = getClientAddress();
                Database.insiderIp = HOKAsession.ip;
                return new Response(JSON.stringify({ flag: `argIAM{${sha256(`${Database.hackerIp}|${Database.insiderIp}|goober`)}}` }), { status: 200 });
            } else {
                return new Response(JSON.stringify({ error: `User already logged in. Log out from other location first or try again later.` }), { status: 409 });
            }
        } else {
            return new Response(JSON.stringify({ error: `Incorrect Credentials` }), { status: 401 });
        }
    } else {
        return new Response(JSON.stringify({ error: `Unauthorized.` }), { status: 401 });
    }
}

function sha256(input: string) {
    return createHash("sha256").update(input).digest("hex");
}