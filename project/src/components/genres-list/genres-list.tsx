import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeGenre} from '../../reducer/action';
function GenresList(): JSX.Element {
  const loadedFilms = useAppSelector((state) => state.loadedFilms);
  const stateGenre = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();
  const handleOnClickButton = (event: React.MouseEvent, elem : string) => {
    event.preventDefault();
    dispatch(changeGenre({genre: elem}));
  };
  const getGenres = () => {
    const newGenres = ['All genres'];
    loadedFilms.forEach((elem) => newGenres.includes(elem.genre) ? '' : newGenres.push(elem.genre));
    return newGenres;
  };
  const genres = getGenres();
  const createGenresList = () => (
    genres.map((elem) => (
      <li key={elem} className={`catalog__genres-item ${ stateGenre === elem ? 'catalog__genres-item--active' : ''}`}>
        <a href="/" onClick={(event) => handleOnClickButton(event, elem)} className="catalog__genres-link">{elem}</a>
      </li>)
    )
  );
  return (
    <ul className="catalog__genres-list">
      {createGenresList()}
    </ul>
  );
}

export default GenresList;
