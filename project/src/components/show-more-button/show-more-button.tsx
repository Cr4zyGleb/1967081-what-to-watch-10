import { GENRES } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeMaxRenderedFilmsQuantity } from '../../reducer/action';

function ShowMoreButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const { maxRenderedFilmsQuantity, loadedFilms, genre } = useAppSelector((state) => state);
  const allFilteredFilms = loadedFilms.filter((elem) => elem.genre === genre || genre === GENRES.ALLGENRES);
  const handlerShowMoreButtonClick = () => {
    dispatch(changeMaxRenderedFilmsQuantity());
  };
  return (
    <div className={`catalog__more ${allFilteredFilms.length > maxRenderedFilmsQuantity ? '' : 'visually-hidden'}`}>
      <button className="catalog__button" type="button" onClick={handlerShowMoreButtonClick}>Show more</button>
    </div>
  );
}

export default ShowMoreButton;
