/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";

export default function BlogVideo() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
    setIsStarted(true);
  };

  return (
    <div className="relative md:w-1/2 mx-auto">
      <video
        ref={videoRef}
        className="w-full rounded-lg h-full bg-(--black)"
        poster="/blog-media.jpg"
        onEnded={() => setIsPlaying(false)}
        controls={true}
      >
        <source src="/blog-video.mp4" type="video/mp4" />
        Відео не доступне.
      </video>
    </div>
  );
}