import { FunctionComponent } from "preact";
import { Video } from "../Types.ts";
import { FavButton } from "../islands/FavButton.tsx";

export const VideoDisplay: FunctionComponent<{ video: Video; userId: string }> =
  (props) => {
    const video = props.video;
    return (
      <div class="video-item" data-fresh-key={video.id}>
        <a href={`/video/${video.id}`} class="video-link">
          <img
            src={video.thumbnail}
            alt={video.title}
            class="video-thumbnail"
          />
          <div class="video-info">
            <h3 class="video-title">{video.title}</h3>
            <p class="video-description">{video.description}</p>
            <p class="video-release-date">Release date: {video.date}</p>
          </div>
        </a>
        <FavButton fav={video.fav} videoId={video.id} userId={props.userId} />
      </div>
    );
  };
