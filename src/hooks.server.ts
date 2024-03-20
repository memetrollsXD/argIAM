import Database from "$lib/server/Database";
import OpAuth from "$lib/server/OpAuth";
import XeonAuth from "$lib/server/XeonAuth";
import type { Handle } from "@sveltejs/kit";
import type { RequestEvent } from "./routes/api/ea_xeondb/entries/$types";

const useForwardedHeaders = false;

export const handle: Handle = async ({ event, resolve }) => {
    // console.log(event.url.pathname, event.getClientAddress());
    
    let response = await resolve(event);

    response = await insiderAuthMiddleware(event, response);

    response = await hackerAuthMiddleware(event, response);

    return response;
};

async function insiderAuthMiddleware(event: RequestEvent | any, rsp: Response) {
    if (event.url.pathname.startsWith("/insider")) {
        // Check IP address
        const ip = useForwardedHeaders ? event.request.headers.get("x-forwarded-for") : event.getClientAddress();

        if ((ip !== "" && ip !== Database.insiderIp) || !Database.insiderIp) {
            rsp = new Response(null, { status: 302, headers: { location: "/" } });
        };
    }

    // Check session
    if (event.url.pathname.startsWith("/insider/ops") && event.url.pathname !== "/insider/ops/login") {
        const sid = event.cookies.get("token");
        if (!sid) return new Response(null, { status: 302, headers: { location: "/insider/ops/login" } });
        const session = OpAuth.getSession(sid);

        if (!session) rsp = new Response(null, { status: 302, headers: { location: "/insider/ops/login" } });
    }

    return rsp;
}

async function hackerAuthMiddleware(event: RequestEvent | any, rsp: Response) {
    if (event.url.pathname.startsWith("/hacker")) {
        // Check IP address
        const ip = useForwardedHeaders ? event.request.headers.get("x-forwarded-for") : event.getClientAddress();

        if ((ip !== "" && ip !== Database.hackerIp) || !Database.hackerIp) {
            rsp = new Response(null, { status: 302, headers: { location: "/" } });
        }

        const whitelistedPaths = ["/hacker", "/hacker/"]
        if (whitelistedPaths.includes(event.url.pathname)) return rsp;

        // Check IP address again - now with x-forwarded-for vulnerability
        const xip = event.request.headers.get("x-forwarded-for") ?? event.getClientAddress();

        if (!isInSubnet(xip, "10.0.0.0/24")) {
            rsp = new Response("Unauthorized IP", { status: 401 });
        }

        // Check session
        // if (event.url.pathname.startsWith("/hacker/admin/Enterprise_Applications/xeon") && event.url.pathname !== "/hacker/admin/Enterprise_Applications/xeon") {
        //     const sid = event.cookies.get("xdbtoken");
        //     if (!sid) return new Response(null, { status: 302, headers: { location: "/hacker/admin/Enterprise_Applications/xeon" } });
        //     const session = XeonAuth.getSession(sid);

        //     if (!session) rsp = new Response(null, { status: 302, headers: { location: "/hacker/admin/Enterprise_Applications/xeon" } });
        // }
    }

    return rsp;
}

function ipToLong(ip: string) {
    let components;

    if (components = ip.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/)) {
        let iplong = 0;
        let power = 1;
        for (var i = 4; i >= 1; i -= 1) {
            iplong += power * parseInt(components[i]);
            power *= 256;
        }
        return iplong;
    }
    else return -1;
};

function isInSubnet(ip: string, subnet: string) {
    let mask, base_ip, long_ip = ipToLong(ip);
    if ((mask = subnet.match(/^(.*?)\/(\d{1,2})$/)) && ((base_ip = ipToLong(mask[1])) >= 0)) {
        let freedom = Math.pow(2, 32 - parseInt(mask[2]));
        return (long_ip > base_ip) && (long_ip < base_ip + freedom - 1);
    }
    else return false;
};