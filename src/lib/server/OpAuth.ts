import { createHash } from "crypto";
import Database from "./Database";

export default class OpAuth {
    public static userList = new Set<User>();
    private static sessionMap = new Map<string, Session>();
    private static sessionTimeout = setInterval(() => this.sessionMap.forEach((session, sessionId) => {
        this.sessionMap.delete(sessionId);
    }), 1000 * 60 * 60 * 24); // 24 hours

    public static getUser(username: string): User | undefined {
        if (this.userList.size === 0) {
            this.userList.add(new User("admin@arg.iam", `admin$${this.generateSessionId()}`));
            this.userList.add(new User("insider@arg.iam", `insider`));
            this.userList.add(new User("qiulin.feng@arg.iam", "new"));
        }

        return [...this.userList].find(user => user.username === username);
    }

    private static checkPassword(u: string, p: string): boolean {
        return p == this.sha256(`${this.sha256(`${u}:55555`)}:${Database.insiderIp}:saltygnorpgnorpsalt`);
    }

    public static login(username: string, password: string, ip: string): string | undefined {
        const user = this.getUser(username);

        if (user && (user.password == "new" ? this.checkPassword(user.username, password) : user.password === password)) {
            // If the user is already logged in, return the existing session ID
            const existingSession = [...this.sessionMap].find(([_, session]) => session.user.username === username);
            if (existingSession) return existingSession[0];

            const sessionId = this.generateSessionId();
            this.sessionMap.set(sessionId, new Session(sessionId, ip, user));
            return sessionId;
        }
    }

    public static logout(sessionId: string): void {
        this.sessionMap.delete(sessionId);
    }

    public static getSession(sessionId: string): Session | undefined {
        return this.sessionMap.get(sessionId);
    }

    private static generateSessionId(): string {
        let sid = "";
        for (let i = 0; i < 10; i++) sid += Math.random().toString(36).substring(2, 15);
        return sid;
    }

    private static sha256(input: string) {
        return createHash("sha256").update(input).digest("hex");
    }
}

class Session {
    public constructor(public readonly id: string, public readonly ip: string, public readonly user: User) { }
}

class User {
    public constructor(public readonly username: string, public readonly password: string) { }
}