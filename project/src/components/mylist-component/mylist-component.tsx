import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteFilms, postFavoriteFilm } from '../../store/api-actions';
import { FilmType } from '../../types/types';

function MyListComponent({ film }: FilmType): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authorizationStatus } = useAppSelector((state) => state);
  const { favoriteFilms } = useAppSelector((state) => state);
  const favoriteFilm = favoriteFilms.find((item) => item.id === film.id);
  const onUseClickHandler = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
    dispatch(postFavoriteFilm({
      filmId: film.id,
      status: favoriteFilm ? 0 : 1,
    })
    );
    dispatch(getFavoriteFilms());
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(getFavoriteFilms());
    }
  }, [authorizationStatus, dispatch]);

  return (
    <button className="btn btn--list film-card__button" type="button" onClick = {onUseClickHandler}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={favoriteFilm ? '#in-list' : '#add'} ></use>
      </svg>
      <span style = {{color : 'inherit', textDecoration : 'none' }}>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>
  );

}

export default React.memo(MyListComponent);
