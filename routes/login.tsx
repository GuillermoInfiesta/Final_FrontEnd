import {
  FreshContext,
  Handlers,
  PageProps,
  RouteConfig,
} from "$fresh/server.ts";
import { Login } from "../components/Login.tsx";
import jwt from "npm:jsonwebtoken@^9.0.2";
import { setCookie } from "$std/http/cookie.ts";

export const config: RouteConfig = {
  skipInheritedLayouts: true,
};

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext) => {
    return ctx.render({ message: "" });
  },
  POST: async (req: Request, ctx: FreshContext) => {
    const url = new URL(ctx.url);
    const form = await req.formData();
    const email = form.get("email")?.toString() || "";
    const password = form.get("password")?.toString() || "";

    const res = await fetch("https://videoapp-api.deno.dev/checkuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.status !== 200) {
      return ctx.render({
        message: "Incorrect credentials or user doesnt exist",
      });
    }

    const data = await res.json();

    const auth = jwt.sign(
      { email: data.email, name: data.name, id: data.id },
      Deno.env.get("JWT_SECRET"),
      { expiresIn: "24h" },
    );

    const headers = new Headers();
    setCookie(headers, {
      name: "auth",
      value: auth,
      sameSite: "Lax",
      domain: url.hostname,
      path: "/",
      secure: true,
    });

    headers.set("location", "/videos");

    return new Response("", {
      status: 303,
      headers,
    });
  },
};

const Page = (props: PageProps) => {
  return <Login message={props.data.message} />;
};

export default Page;
