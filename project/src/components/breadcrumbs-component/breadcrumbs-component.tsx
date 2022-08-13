import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

export type FilmIdType = {
  filmId?: number;
}

function BreadcrumbsComponent(filmId: FilmIdType): JSX.Element {
  const loadedFilms = useAppSelector((state) => state.loadedFilms);
  const film = loadedFilms.find((element) => element.id === filmId);
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`/films/${filmId}`} className="breadcrumbs__link">{film?.name}</Link>
        </li>
        <li className="breadcrumbs__item">
          <Link to={`/films/${filmId}/review`} className="breadcrumbs__link">Add review</Link>
        </li>
      </ul>
    </nav>
  );
}

export default BreadcrumbsComponent;
