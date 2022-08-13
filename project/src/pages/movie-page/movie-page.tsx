import { v4 as uuidv4 } from 'uuid';
import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import FilmCard from '../../components/film-card/filmCard';
import LogoFooter from '../../components/logo-footer/logo-footer';
import MoviePageTabs from '../../components/movie-page-tabs/movie-page-tabs';
import ErrorScreen404 from '../error-screen-404/error-screen-404';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus, HeaderClassNames } from '../../const';
import MyListComponent from '../../components/mylist-component/mylist-component';
import HeaderComponent from '../../components/header-component/header-component';
import { CheckedAuthStatus } from '../../utils/utils';

function MoviePage(): JSX.Element {
  const { loadedFilms, authorizationStatus } = useAppSelector((state) => state);
  const isAuthStatus = CheckedAuthStatus(authorizationStatus);
  const params = useParams();
  const filmId = Number(params.id);
  const film = loadedFilms.find((element) => element.id === filmId);
  if (!film) {
    return <ErrorScreen404 />;
  }
  return (
    <Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={`${film.backgroundImage}`} alt={film.name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <HeaderComponent isGuest = {authorizationStatus !== AuthorizationStatus.Auth} classText = {HeaderClassNames.FilmCardHead}/>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {isAuthStatus ? <MyListComponent/> : ''}
                {authorizationStatus === AuthorizationStatus.Auth ?
                  <Link to={`/films/${filmId}/review`} className="btn film-card__button">Add review</Link>
                  :
                  ''}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={`${film.posterImage}`} alt={`${film.name} poster`} width="218" height="327" />
            </div>
            <MoviePageTabs film={film} />
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {loadedFilms.map((elem, index) => {
              const maxRenderedFilmsQuantity = 4;
              if (index < maxRenderedFilmsQuantity) {
                return <FilmCard film={elem} key={uuidv4()} />;
              }
              return '';
            }
            )}
          </div>
        </section>
        <LogoFooter />
      </div>
    </Fragment>);
}

export default MoviePage;
