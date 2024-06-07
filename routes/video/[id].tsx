import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Video } from "../../Types.ts";
import { FavButton } from "../../islands/FavButton.tsx";

type State = {
  email: string;
  name: string;
  id: string;
};
type Data = {
  video: Video;
  userId: string;
};
export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<State, Data>) => {
    const videoId = ctx.params.id;
    const userId = ctx.state.id;

    const res = await fetch(
      `https://videoapp-api.deno.dev/video/${userId}/${videoId}`,
    );

    if (res.status !== 200) {
      return new Response(null, {
        status: 307,
        headers: { location: "/login" },
      });
    }

    const data = await res.json();

    return ctx.render({ video: data, userId: userId });
  },
};

const Page = (props: PageProps<Data>) => {
  const video = props.data.video;
  return (
    <div class="video-detail-container">
      <a href="/videos" class="back-button">← Go Back to List</a>
      <div class="video-frame">
        <iframe
          width="100%"
          height="400px"
          src={`https://www.youtube.com/embed/${video.youtubeid}`}
          title={video.title}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        >
        </iframe>
      </div>
      <h2 class="video-detail-title">{video.title}</h2>
      <p class="video-detail-description">{video.description}</p>
      <FavButton
        fav={video.fav}
        videoId={video.id}
        userId={props.data.userId}
      />
    </div>
  );
};

export default Page;
