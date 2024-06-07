import { FunctionComponent } from "preact";
import { Video } from "../Types.ts";
import { VideoDisplay } from "./VideoDisplay.tsx";
export const VideoList: FunctionComponent<{ videos: Video[]; userId: string }> =
  (props) => {
    return (
      <div class="video-page-container">
        <h1 class="video-list-title">Curso Deno Fresh</h1>
        <div class="video-list-container">
          {props.videos.map((v) => (
            <VideoDisplay video={v} userId={props.userId} />
          ))}
        </div>
      </div>
    );
  };
