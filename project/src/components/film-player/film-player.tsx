import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import ErrorScreen404 from '../../pages/error-screen-404/error-screen-404';
import LoadingScreen from '../../pages/loading-screen/loading-screen';


function FilmPlayer(): JSX.Element {
  const navigate = useNavigate();
  const loadedFilms = useAppSelector((state) => state.loadedFilms);
  const params = useParams();
  const filmId = Number(params.id);
  const film = loadedFilms.find((element) => element.id === filmId);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [togglerPos, setTogglerPos] = useState(0);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    const updateTogglerPos = () => {
      if (videoRef.current !== null) {
        setTogglerPos(videoRef.current.currentTime / videoRef.current.duration * 100);
      }
      if (videoRef.current?.ended) {
        setIsPlaying(false);
      }
    };

    const addIsLoading = () => setIsLoading(true);
    const dellIsLoading = () => setIsLoading(false);

    videoRef.current.addEventListener('timeupdate', updateTogglerPos);
    videoRef.current.addEventListener('loadstart', addIsLoading);
    videoRef.current.addEventListener('canplay', dellIsLoading);

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();

    return () => {
      videoRef.current?.removeEventListener('timeupdate', updateTogglerPos);
      videoRef.current?.removeEventListener('loadstart', addIsLoading);
      videoRef.current?.removeEventListener('canplay', dellIsLoading);
    };
  }, [isPlaying]);


  if (!film) {
    return <ErrorScreen404 />;
  }
  // const videoRef = useRef<HTMLVideoElement | null>(null);

  // useEffect(() => {
  //   if (videoRef.current === null) {
  //     return;
  //   }

  //   if (isPlaying) {
  //     videoRef.current.play();
  //   } else {
  //     videoRef.current.load();
  //   }
  // }, [isPlaying]);

  return (
    <React.Fragment>
      <div className="visually-hidden">

        <svg xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink">
          <symbol id="add" viewBox="0 0 19 20">
            <title>+</title>
            <desc>Created with Sketch.</desc>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="+" fill="#EEE5B5" points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859" />
            </g>
          </symbol>
          <symbol id="full-screen" viewBox="0 0 27 27">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z" fill="#FFF9D9" fillOpacity="0.7" />
            <path fillRule="evenodd" clipRule="evenodd" d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z" fill="#FFF9D9" fillOpacity="0.7" />
            <path fillRule="evenodd" clipRule="evenodd" d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z" fill="#FFF9D9" fillOpacity="0.7" />
            <path fillRule="evenodd" clipRule="evenodd" d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z" fill="#FFF9D9" fillOpacity="0.7" />
          </symbol>
          <symbol id="in-list" viewBox="0 0 18 14">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z" fill="#EEE5B5" />
          </symbol>
          <symbol id="pause" viewBox="0 0 14 21">
            <title>Artboard</title>
            <desc>Created with Sketch.</desc>
            <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21" />
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21" />
            </g>
          </symbol>
        </svg>
      </div>

      <div className="player">
        {isLoading && <LoadingScreen />}
        <video className="player__video" ref={videoRef} src={film.videoLink} poster={`${film.posterImage}`} />
        <button type="button" className="player__exit" onClick={() => navigate(-1)}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={togglerPos} max="100"></progress>
              <div className="player__toggler" style={{ left: `${togglerPos}%` }}>Toggler</div>
            </div>
            <div className="player__time-value">{videoRef.current?.duration}</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={() => setIsPlaying(!isPlaying)}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref={isPlaying ? '#pause' : '#play-s'}></use>
              </svg>
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen" onClick={() => videoRef.current?.requestFullscreen()}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default React.memo(FilmPlayer);

