import { Link, useParams } from 'react-router-dom';
import AddReviewComment from '../../components/add-review-comment/add-review-comment';
import Logo from '../../components/logo/logo';
import SignOutComponent from '../../components/sign-out-component/sign-out-component';
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
          <img src= {`${film.backgroundImage}`} alt= {film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <Logo/>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to = {`/films/${filmId}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to = {`/films/${filmId}/review`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>
          <SignOutComponent/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={`${film.posterImage}`} alt= {`${film.description} poster`} width="218" height="327" />
        </div>
      </div>
      <AddReviewComment/>
    </section>);
}

export default AddReview;
