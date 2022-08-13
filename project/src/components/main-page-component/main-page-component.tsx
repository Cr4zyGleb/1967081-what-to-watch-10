
import React from 'react';
import { AuthorizationStatus, GENRES, HeaderClassNames } from '../../const';
import { useAppSelector } from '../../hooks';
import { CheckedAuthStatus } from '../../utils/utils';
import FilmCard from '../film-card/filmCard';
import GenresList from '../genres-list/genres-list';
import HeaderComponent from '../header-component/header-component';
import LogoFooter from '../logo-footer/logo-footer';
import MyListComponent from '../mylist-component/mylist-component';
import ShowMoreButton from '../show-more-button/show-more-button';

function MainPageComponent(): JSX.Element {
  const { maxRenderedFilmsQuantity, loadedFilms, promoFilm, authorizationStatus} = useAppSelector((state) => state);
  const isAuthStatus = CheckedAuthStatus(authorizationStatus);
  const genreState = useAppSelector((state) => state.genre);
  const filteredFilms = loadedFilms.filter((elem) => elem.genre === genreState || genreState === GENRES.ALLGENRES).slice(0, maxRenderedFilmsQuantity);
  const { name, released, genre, posterImage, backgroundImage } = promoFilm;
  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <HeaderComponent isGuest = {authorizationStatus !== AuthorizationStatus.Auth} classText = {HeaderClassNames.FilmCardHead}/>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {isAuthStatus ? <MyListComponent/> : ''}
              </div>
            </div>
          </div>
        </div>
      </section >
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList />
          <div className="catalog__films-list">
            {filteredFilms.map((film, index) => (<FilmCard film={film} key={film.id} />)
            )}
          </div>
          <ShowMoreButton/>
        </section>
        <LogoFooter />
      </div>
    </React.Fragment>
  );
}

export default MainPageComponent;
