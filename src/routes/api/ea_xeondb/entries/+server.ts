import Database from '$lib/server/Database.js';
import XeonAuth from '$lib/server/XeonAuth.js';

export async function GET({ request, getClientAddress, cookies }) {
    const ip = request.headers.get("x-forwarded-for") ?? getClientAddress();
    const token = cookies.get("xdbtoken") ?? request.headers.get("x-xdb-token");
    if (!token) return new Response(JSON.stringify({ error: `Unauthorized.` }), { status: 401 });

    const session = XeonAuth.getSession(token);
    if (session) {
        // Check if IP matches
        if (session.ip !== ip) return new Response(JSON.stringify({ error: `Unauthorized..` }), { status: 401 });

        return new Response(JSON.stringify(Database.xeonLogs.map(x => ({ ...x, otp: "[REDACTED]" }))));
    } else {
        return new Response(JSON.stringify({ error: `Unauthorized...` }), { status: 401 });
    }
}

export async function POST({ request, getClientAddress, cookies }) {
    const ip = request.headers.get("x-forwarded-for") ?? getClientAddress();
    const token = cookies.get("xdbtoken") ?? request.headers.get("x-xdb-token");
    if (!token) return new Response(JSON.stringify({ error: `Unauthorized.` }), { status: 401 });

    const session = XeonAuth.getSession(token);
    if (session) {
        // Check if IP matches
        if (session.ip !== ip) return new Response(JSON.stringify({ error: `Unauthorized.` }), { status: 401 });

        const { id, method, ...ins } = await request.json();
        if (!id || !method) return new Response(JSON.stringify({ error: `Invalid request.` }), { status: 400 });

        switch (method) {
            case "SELECT":
                return new Response(JSON.stringify(Database.xeonLogs.filter(x => x.id === id)));
            case "INSERT":
                // More like modify entry
                const tEntry = Database.xeonLogs.find(x => x.id == id);
                if (!tEntry) return new Response(JSON.stringify({ error: `Invalid request.` }), { status: 400 });
                const insertedEntry = { ...tEntry, ...ins };
                Database.xeonLogs = Database.xeonLogs.filter(x => x.id != id);
                Database.xeonLogs.push(insertedEntry);
                return new Response(JSON.stringify(insertedEntry));
            case "DELETE":
                const deletedEntry = Database.xeonLogs.find(x => x.id == id);
                Database.xeonLogs = Database.xeonLogs.filter(x => x.id != id);

                if (Database.xeonLogs.length === 0) {
                    Database.xeonLogs.push({
                        id: 0,
                        otp: "ccccccrrktriubgvcuvubhdtibdughigtrkuirdvfrrc",
                        user: "qiulin.feng@arg.iam",
                        timestamp: 0,
                        sn: 0,
                        status: "OK"
                    });
                }
                
                return new Response(JSON.stringify(deletedEntry));
            default:
                return new Response(JSON.stringify({ error: `Invalid request.` }), { status: 400 });
        }
    } else {
        return new Response(JSON.stringify({ error: `Unauthorized.` }), { status: 401 });
    }
}