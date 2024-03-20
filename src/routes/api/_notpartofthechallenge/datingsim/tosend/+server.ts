import Database from "$lib/server/Database"

const messages = [
    {
        content: "@Li Chen, I need your help with something. Can you send me your credentials?",
        name: 'Insider',
        sender: 'insider@arg.iam',
        stage: 0,
        jump: 0,
    }
]

export async function GET({ request, getClientAddress }) {
    const validMessages = messages.filter(m => m.stage === Database.wcStage)/*.sort((a, b) => a.order - b.order)*/;

    return new Response(JSON.stringify({ messages: validMessages }), { headers: { 'content-type': 'application/json' } });
}