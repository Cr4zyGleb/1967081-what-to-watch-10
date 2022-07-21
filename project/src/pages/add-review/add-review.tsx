import { useParams } from 'react-router-dom';
import AddReviewComment from '../../components/add-review-comment/add-review-comment';
import Logo from '../../components/logo/logo';
import { FilmsType } from '../../types/types';

function AddReview({films}: FilmsType): JSX.Element {
  const params = useParams();
  const filmId = Number(params.id);
  const film = films.find((element) => element.id === filmId);
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src= {`/${film?.posterImage}`} alt= {film?.description} />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <Logo/>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">{film?.description}</a>
              </li>
              <li className="breadcrumbs__item">
                <a href="/" className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a href="/" className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={`/${film?.posterImage}`} alt= {`${film?.description} poster`} width="218" height="327" />
        </div>
      </div>
      <AddReviewComment/>
    </section>);
}

export default AddReview;
