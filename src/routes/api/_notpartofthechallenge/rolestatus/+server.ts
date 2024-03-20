import Database from '$lib/server/Database.js';

export async function GET({ params, getClientAddress }) {
    return new Response(JSON.stringify({ isHackerTaken: Database.hackerIp !== "", isInsiderTaken: Database.insiderIp !== "", curIp: getClientAddress(), curRole: Database.hackerIp === getClientAddress() ? "hacker" : Database.insiderIp === getClientAddress() ? "insider" : "" }));
}

export async function POST({ request, getClientAddress }) {
    const body = await request.json();

    if (body.role !== "hacker" && body.role !== "insider") {
        return new Response(null, { status: 400 });
    }

    if (getClientAddress() === Database.hackerIp || getClientAddress() === Database.insiderIp) {
        return new Response(null, { status: 400 });
    }

    if (body.role === "hacker" && Database.hackerIp === "") {
        Database.hackerIp = getClientAddress();
    } else if (body.role === "insider" && Database.insiderIp === "") {
        Database.insiderIp = getClientAddress();
    }

    return new Response(JSON.stringify({ isHackerTaken: Database.hackerIp !== "", isInsiderTaken: Database.insiderIp !== "", curIp: getClientAddress() }));
}

export async function DELETE({ getClientAddress }) {
    Database.hackerIp = "";
    Database.insiderIp = "";

    return new Response(JSON.stringify({ isHackerTaken: Database.hackerIp !== "", isInsiderTaken: Database.insiderIp !== "", curIp: getClientAddress() }));
}