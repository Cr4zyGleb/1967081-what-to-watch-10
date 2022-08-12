
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, GENRES } from '../../const';
import { useAppSelector } from '../../hooks';
import FilmCard from '../film-card/filmCard';
import GenresList from '../genres-list/genres-list';
import LogoFooter from '../logo-footer/logo-footer';
import Logo from '../logo/logo';
import ShowMoreButton from '../show-more-button/show-more-button';
import SignOutComponent from '../sign-out-component/sign-out-component';

function MainPageComponent(): JSX.Element {
  const { maxRenderedFilmsQuantity, loadedFilms, promoFilm} = useAppSelector((state) => state);
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

        <header className="page-header film-card__head">
          <Logo />
          <SignOutComponent />
        </header>

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
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <Link to={AppRoute.MyList}>
                    <span>My list</span>
                  </Link>
                  <span className="film-card__count">9</span>
                </button>
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
          <ShowMoreButton />
        </section>
        <LogoFooter />
      </div>
    </React.Fragment>
  );
}

export default MainPageComponent;
