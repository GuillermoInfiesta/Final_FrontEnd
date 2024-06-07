import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import jwt from "npm:jsonwebtoken@^9.0.2";
type State = {
  email: string;
  name: string;
  id: string;
};
export async function handler(req: Request, ctx: FreshContext<State>) {
  if (ctx.destination !== "route") {
    const resp = await ctx.next();
    return resp;
  }

  if (ctx.route === "/login" || ctx.route === "/register") {
    const resp = await ctx.next();
    return resp;
  }

  const cookies = getCookies(req.headers);
  const auth = cookies.auth;
  if (!auth) {
    return new Response(null, {
      status: 307,
      headers: { location: "/login" },
    });
  }

  const valid = jwt.verify(auth, Deno.env.get("JWT_SECRET"));
  if (!valid) {
    return new Response(null, {
      status: 307,
      headers: { location: "/login" },
    });
  }

  ctx.state = { email: valid.email, name: valid.name, id: valid.id };

  const resp = await ctx.next();
  return resp;
}
