import { Handlers } from "$fresh/server.ts";
export const handler: Handlers = {
  GET: async () => {
    return new Response(null, {
      status: 303,
      headers: { location: "/videos" },
    });
  },
};

export default function Home() {
  return (
    <div>
      <h1>Final FrontEnd</h1>
      <p>Buenos dias, noches o lo que quiera que sea</p>
      <p>Prueba de que esto actualiza con el commit, no vaya a ser</p>
    </div>
  );
}
