import { Link, useParams } from 'react-router-dom';
import AddReviewComment from '../../components/add-review-comment/add-review-comment';
import Logo from '../../components/logo/logo';
import { useAppSelector } from '../../hooks';
import ErrorScreen404 from '../error-screen-404/error-screen-404';

function AddReview(): JSX.Element {
  const loadedFilms = useAppSelector((state) => state.loadedFilms);
  const params = useParams();
  const filmId = Number(params.id);
  const film = loadedFilms.find((element) => element.id === filmId);
  if (!film) {
    return <ErrorScreen404/>;
  }
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src= {`${film.posterImage}`} alt= {film.description} />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <Logo/>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to = {`/films/${filmId}`} className="breadcrumbs__link">{film.description}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to = {`/films/${filmId}/review`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a href="/" className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={`${film.posterImage}`} alt= {`${film.description} poster`} width="218" height="327" />
        </div>
      </div>
      <AddReviewComment/>
    </section>);
}

export default AddReview;
