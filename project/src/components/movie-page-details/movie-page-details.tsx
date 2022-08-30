import React from 'react';

import { FilmType } from '../../types/types';

function MoviePageDetails({ film }: FilmType): JSX.Element {
  const { director, starring, released, genre, runTime } = film;
  const getRunTime = () => runTime < 60 ? `${runTime}m` : `${Math.floor(runTime / 60)}h ${runTime % 60}m`;
  const getFilmStarring = () => starring.map((elem, index) => {
    if (index !== starring.length - 1) {
      return (
        <React.Fragment key = {elem}>
          {elem} <br />
        </React.Fragment>
      );
    }
    return elem;
  });

  const filmRunTime = getRunTime();
  const filmStarring = getFilmStarring();
  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {filmStarring}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{filmRunTime}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{released}</span>
        </p>
      </div>
    </div>
  );
}

export default MoviePageDetails;
