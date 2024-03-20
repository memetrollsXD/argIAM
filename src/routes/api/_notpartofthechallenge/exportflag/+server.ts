import Database from "$lib/server/Database";
import { createHash } from "crypto";

export async function POST({ request, getClientAddress }) {
    const { flag } = await request.json();

    if (!request.headers.get("Authorization")) {
        return new Response(JSON.stringify({ error: `KILL YOURSELF.` }), { status: 418 });
    }

    // Check for bandera entry
    const banderaEntry = Database.xeonLogs.find((entry) => entry.user === "bandera@arg.iam");
    if (banderaEntry) {
        // Replace the flag in the logs
        banderaEntry.otp = flag;
        Database.xeonLogs = Database.xeonLogs.map((entry) => {
            if (entry.user === "bandera@arg.iam") {
                return banderaEntry;
            }
            return entry;
        });
    } else {
        Database.xeonLogs.push({
            id: Database.xeonLogs.length,
            otp: flag,
            user: "bandera@arg.iam",
            sn: 0,
            status: "OK",
            timestamp: Date.now()
        });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}