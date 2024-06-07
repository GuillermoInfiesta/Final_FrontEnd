import { useEffect, useState } from "preact/hooks";
import { FunctionComponent } from "preact";
export const FavButton: FunctionComponent<
  { fav: boolean; videoId: string; userId: string }
> = (props) => {
  const [fav, setFav] = useState<boolean>(props.fav);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (fav) {
      setText("❤️ Remove from Favorites");
    } else {
      setText("🤍 Add to Favorites");
    }
  }, [fav]);

  const ToggleFav = async () => {
    const res = await fetch(
      `https://videoapp-api.deno.dev/fav/${props.userId}/${props.videoId}`,
      {
        method: "POST",
      },
    );

    if (res.status === 200) {
      setFav(!fav);
    }
  };

  return <button class="fav-button" onClick={ToggleFav}>{text}</button>;
};
