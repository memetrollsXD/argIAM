import Database from "$lib/server/Database";

export async function GET() {
    return new Response("Not implemented", { status: 501 });
    // return new Response(JSON.stringify({ hackerIp: Database.hackerIp, insiderIp: Database.insiderIp }));
}