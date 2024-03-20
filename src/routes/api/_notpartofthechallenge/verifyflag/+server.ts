import Database from "$lib/server/Database";
import { createHash } from "crypto";

export async function POST({ request, getClientAddress }) {
    const { flag } = await request.json();

    const expected = `argIAM{${sha256(`${Database.hackerIp}|${Database.insiderIp}|goober`)}}`;

    if (flag === expected) {
        return new Response(JSON.stringify({ flag: `argIAM{${Database.hackerIp}|${Database.insiderIp}|goober}` }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ error: `Nope.` }), { status: 200 });
    }
}

function sha256(input: string) {
    return createHash("sha256").update(input).digest("hex");
}