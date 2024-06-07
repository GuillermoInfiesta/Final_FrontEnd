import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { VideoList } from "../components/VideoList.tsx";
import { Video } from "../Types.ts";

type State = {
  email: string;
  name: string;
  id: string;
};
type Data = {
  videos: Video[];
  userId: string;
};
export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<State, Data>) => {
    const res = await fetch(
      `https://videoapp-api.deno.dev/videos/${ctx.state.id}`,
    );
    if (res.status !== 200) {
    }

    const data = await res.json();

    return ctx.render({ videos: data, userId: ctx.state.id });
  },
};

const Page = (props: PageProps<Data>) => {
  return <VideoList videos={props.data.videos} userId={props.data.userId} />;
};

export default Page;
