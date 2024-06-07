import { FreshContext } from "$fresh/server.ts";
import { Header } from "../components/Header.tsx";
export default async function Layout(req: Request, ctx: FreshContext) {
  return (
    <div class="page-container">
      <Header name={ctx.state.name} />
      <ctx.Component />
    </div>
  );
}
