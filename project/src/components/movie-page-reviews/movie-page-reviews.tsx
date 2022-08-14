import React from 'react';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { getFilmReviews } from '../../store/api-actions';
import { FilmType } from '../../types/types';
import FilmCommentsColumn from '../film-comments-column/film-comments-column';

function MoviePageReviews({ film }: FilmType): JSX.Element {
  const { id } = film;
  store.dispatch(getFilmReviews(id));
  const { loadedFilmReviews } = useAppSelector((state) => state);
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        <FilmCommentsColumn columnNumber = {1} filmComments={loadedFilmReviews} />
      </div>
      <div className="film-card__reviews-col">
        <FilmCommentsColumn columnNumber = {2} filmComments={loadedFilmReviews}/>
      </div>
    </div>
  );
}

export default MoviePageReviews;

