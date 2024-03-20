import OpAuth from '$lib/server/OpAuth.js';

export async function POST({ request, getClientAddress }) {
    const { username, password } = await request.json();
    const ip = request.headers.get("x-forwarded-for") ?? getClientAddress();
    const sessionId = await OpAuth.login(username, password, ip);

    if (sessionId) {
        return new Response(JSON.stringify({ sessionId, href: `/insider/ops` }));
    } else {
        return new Response(JSON.stringify({ error: `Incorrect email or password` }), { status: 401 });
    }
}