import XeonAuth from '$lib/server/XeonAuth.js';

export async function POST({ request, getClientAddress, cookies }) {
    const { username, password } = await request.json();
    const ip = request.headers.get("x-forwarded-for") ?? getClientAddress();
    const sessionId = await XeonAuth.login(username, password, ip);

    if (sessionId) {
        cookies.set("xdbtoken", sessionId, { secure: false, httpOnly: false, sameSite: "lax", path: "/hacker/admin/Enterprise_Applications/xeon"});
        return new Response(JSON.stringify({ sessionId, href: `/hacker/admin/Enterprise_Applications/xeon` }));
    } else {
        return new Response(JSON.stringify({ error: `Incorrect email or password` }), { status: 401 });
    }
}