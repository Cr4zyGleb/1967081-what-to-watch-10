import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FilmType } from '../../types/types';
import VideoPlayer from '../video-player/video-player';

function FilmCard({ film }: FilmType): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const { description, id } = film;
  let timer: NodeJS.Timeout | null = null;
  const handleArticleOnMouseEnter = () => {
    timer = setTimeout(() => {
      setIsPlaying(true);
    }, 1000);
  };
  const handleArticleOnMouseLeave = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    setIsPlaying(false);
  };

  return (
    <article className="small-film-card catalog__films-card"
      onMouseEnter={handleArticleOnMouseEnter}
      onMouseLeave={handleArticleOnMouseLeave}
    >
      <div id={`${id}`} className="small-film-card__image">
        <VideoPlayer film={film} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </div>

      <h3 className="small-film-card__title">
        <Link to={`/films/${id}`} className="small-film-card__link">
          {description}
        </Link>
      </h3>

    </article>
  );
}

export default FilmCard;
