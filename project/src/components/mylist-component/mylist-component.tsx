import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteFilms, postFavoriteFilm } from '../../store/api-actions';
import { FilmType } from '../../types/types';

function MyListComponent({ film }: FilmType): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { authorizationStatus } = useAppSelector((state) => state);
  const onUseClickHandler = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
    }
    dispatch(postFavoriteFilm({
      filmId: film.id,
      status: film.isFavorite ? 0 : 1,
    })
    );
  };

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(getFavoriteFilms());
    }
  }, [authorizationStatus, dispatch]);

  const { favoriteFilms } = useAppSelector((state) => state);
  const isFavorite = () => favoriteFilm?.isFavorite;
  const favoriteFilm = favoriteFilms.find((item) => item.id === film.id);
  return (
    <button className="btn btn--list film-card__button" type="button">
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={isFavorite() ? '#in-list' : '#add'} onClick = {onUseClickHandler}></use>
      </svg>
      <Link to={AppRoute.MyList} style = {{color : 'inherit', textDecoration : 'none' }}>
        <span >My list</span>
      </Link>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>
  );

}

export default React.memo(MyListComponent);
