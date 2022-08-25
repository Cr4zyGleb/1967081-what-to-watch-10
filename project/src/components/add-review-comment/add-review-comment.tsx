import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { postFilmReview } from '../../store/api-actions';

function AddReviewComment(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const filmId = params.id;
  const [filmReview, setFilmReview] = useState({
    rating: 0,
    comment: '',
  });

  const MAX_RATING = 10;

  const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = evt.target;
    const valueForState = name === 'comment' ? value : Number(value);
    setFilmReview({
      ...filmReview,
      [name]: valueForState,
    });
  };

  const postForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postFilmReview([filmId, filmReview]));
  };

  return (
    <div className="add-review">
      <form action="/" onSubmit={postForm} className="add-review__htmlForm">
        <div className="rating">
          <div className="rating__stars">
            {Array(MAX_RATING).fill('').map((_item, id) => {
              const rating = MAX_RATING - id;
              return (
                <React.Fragment key={rating}>
                  <input onChange={inputChangeHandler} className="rating__input" id={`star-${rating}`} type="radio" name="rating" value={rating} checked={filmReview.rating === rating}/>
                  <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
                </React.Fragment>
              );
            }
            )}
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" onChange={inputChangeHandler} name="comment" id="review-text" placeholder=""></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default React.memo(AddReviewComment);
