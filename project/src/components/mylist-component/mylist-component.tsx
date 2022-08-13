import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function MyListComponent(): JSX.Element {

  return (
    <button className="btn btn--list film-card__button" type="button">
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref="#add"></use>
      </svg>
      <Link to={AppRoute.MyList}>
        <span className = "my-list">My list</span>
      </Link>
      <span className="film-card__count">9</span>
    </button>
  );

}

export default MyListComponent;
