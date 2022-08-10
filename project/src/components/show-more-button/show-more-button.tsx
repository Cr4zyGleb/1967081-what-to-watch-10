import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeMaxRenderedFilmsQuantity } from '../../reducer/action';

function ShowMoreButton(): JSX.Element {
  const stateFilms = useAppSelector((state) => state.loadedFilms);
  const dispatch = useAppDispatch();
  const maxRenderedFilmsQuantity = useAppSelector((state) => state.maxRenderedFilmsQuantity);
  const handlerShowMoreButtonClick = () => {
    dispatch(changeMaxRenderedFilmsQuantity());
  };
  return (
    <div className={`catalog__more ${stateFilms.length > maxRenderedFilmsQuantity ? '' : 'visually-hidden'}`}>
      <button className="catalog__button" type="button" onClick={handlerShowMoreButtonClick}>Show more</button>
    </div>
  );
}

export default ShowMoreButton;
