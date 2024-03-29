import { v4 as uuidv4 } from 'uuid';
import { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import FilmCard from '../../components/film-card/filmCard';
import LogoFooter from '../../components/logo-footer/logo-footer';
import MoviePageTabs from '../../components/movie-page-tabs/movie-page-tabs';
import ErrorScreen404 from '../error-screen-404/error-screen-404';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus, HeaderClassNames } from '../../const';
import MyListComponent from '../../components/mylist-component/mylist-component';
import HeaderComponent from '../../components/header-component/header-component';
import { store } from '../../store';
import { getFilmReviews } from '../../store/api-actions';

function MoviePage(): JSX.Element {
  const { loadedFilms, authorizationStatus } = useAppSelector((state) => state);
  const params = useParams();
  const filmId = Number(params.id);
  const film = loadedFilms.find((element) => element.id === filmId);

  useEffect(() => {

    store.dispatch(getFilmReviews(filmId));

  }, [filmId]);
  if (!film) {
    return <ErrorScreen404 />;
  }
  return (
    <Fragment>
      <div className="visually-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
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
            <symbol id="play-s" viewBox="0 0 19 19">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5" />
            </symbol>
            <title>Artboard</title>
            <desc>Created with Sketch.</desc>
            <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21" />
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21" />
            </g>
          </symbol>
        </svg>
      </div>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={`${film.backgroundImage}`} alt={film.name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <HeaderComponent isGuest={authorizationStatus !== AuthorizationStatus.Auth} classText={HeaderClassNames.FilmCardHead} />
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link to={`/player/${filmId}`}>
                  <button className="btn btn--play film-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                </Link>
                <MyListComponent film = {film}/>
                <Link to={`/films/${filmId}/review`} className="btn film-card__button">Add review</Link>
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
