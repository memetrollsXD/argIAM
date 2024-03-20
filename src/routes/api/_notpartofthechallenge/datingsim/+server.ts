import Database from "$lib/server/Database"

const messages = [
    {
        content: "Notice: Due to increased breach attempts, we ask you that you exercise extra caution in communications. Do not share any personal or login information with anyone.",
        name: 'System',
        sender: 'noreply@arg.iam',
        stage: 0,
        order: 0,
    },
    {
        content: "@Li Chen, I need your help with something. Can you send me your credentials?",
        name: 'Insider',
        sender: 'insider@arg.iam',
        stage: 0,
        order: 0,
    },
    {
        content: "Why are you asking for credentials? Did your account get hacked?",
        name: 'Li Chen',
        sender: 'li.chen02@arg.iam',
        stage: 1,
        order: 0,
    },
    {
        content: "All internal services are behind VPN. There is no chance of a breach.",
        name: 'Zhanli Yang',
        sender: 'zhanli.yang@arg.iam',
        stage: 1,
        order: 1,
    },
    {
        content: "My dumbass forgot my password, if I log out I'm done for...",
        name: 'Insider',
        sender: 'insider@arg.iam',
        stage: 1,
        order: 2,
    },
    {
        content: "Ask your manager. They are the only ones able to do it.",
        name: 'Zhanli Yang',
        sender: 'zhanli.yang@arg.iam',
        stage: 1,
        order: 2,
    },
    {
        content: "My manager is busy right now",
        name: 'Insider',
        sender: 'insider@arg.iam',
        stage: 1,
        order: 2,
    },
    {
        content: `Just send them an e-mail, dumbass.`,
        name: 'Li Chen',
        sender: 'li.chen02@arg.iam',
        stage: 1,
        order: 2,
    }
]

export async function GET({ request, getClientAddress }) {
    const validMessages = messages.filter(m => m.stage >= Database.wcStage).sort((a, b) => a.order - b.order);

    return new Response(JSON.stringify({ messages: validMessages }), { headers: { 'content-type': 'application/json' } });
}