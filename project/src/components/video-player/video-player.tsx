import { useEffect, useRef } from 'react';
import { VideoPlayerProps } from '../../types/types';

function VideoPlayer({ film, isPlaying, setIsPlaying }: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { videoLink, posterImage } = film;
  // let timerId: NodeJS.Timeout | undefined = undefined;
  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if (isPlaying) {
      videoRef.current.play();
    }else {
      videoRef.current.load();
    }
  }, [isPlaying]);

  return (
    <video className="player__video" ref={videoRef} src={videoLink} poster={posterImage} muted loop width='280' height='175' />
  );
}

export default VideoPlayer;
