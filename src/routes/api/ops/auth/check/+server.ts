import Database from "$lib/server/Database.js";
import OpAuth from "$lib/server/OpAuth";
import { createHash } from "crypto";

export async function GET({ cookies }) {
    const sid = cookies.get("token");
    if (!sid) return new Response(null, { status: 302, headers: { location: "/insider/ops/login" } });
    const session = OpAuth.getSession(sid);

    if (!session) return new Response(null, { status: 302, headers: { location: "/insider/ops/login" } });
}

function sha256(input: string) {
    return createHash("sha256").update(input).digest("hex");
}