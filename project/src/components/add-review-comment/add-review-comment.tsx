import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute, ERRORMESSAGES } from '../../const';
import { useAppDispatch } from '../../hooks';
import { postFilmReview } from '../../store/api-actions';
import ErrorMessage from '../error-message/error-message';

function AddReviewComment(): JSX.Element {
  const commentTextAreaName = 'comment';
  const params = useParams();
  const navigate = useNavigate();
  const [formValid, setFormValid] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [commentValid, setCommentValid] = useState(false);
  const [ratingValid, setRatingValid] = useState(false);
  const dispatch = useAppDispatch();
  const filmId = params.id;
  const [filmReview, setFilmReview] = useState({
    rating: 0,
    comment: '',
  });
  const MAX_RATING = 10;

  const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = evt.target;
    const valueForState = name === commentTextAreaName ? value : Number(value);
    setFilmReview({
      ...filmReview,
      [name]: valueForState,
    });
    if (name === commentTextAreaName) {
      validateComment(value);
    } else {
      validatRating(Number(value));
    }
  };

  const validateComment = (value : string) => {
    setCommentValid(value.length >= 50 && value.length <= 400);
  };

  const validatRating = (value : number) => {
    setRatingValid(value !== 0);
  };

  const postForm = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (filmReview.comment.length >= 50 && filmReview.comment.length <= 400) {
      try {
        setDisabled(true);
        await dispatch(postFilmReview([filmId, filmReview]));
        setDisabled(false);
        navigate(`${AppRoute.Films}/${filmId}`);
      } catch {
        setDisabled(false);
      }
    }
  };

  useEffect(() => {
    setFormValid(commentValid && ratingValid);
  }, [commentValid, ratingValid]);

  return (
    <div className="add-review">
      <form action="/" onSubmit={postForm} className="add-review__htmlForm">
        <div className="rating">
          <div className="rating__stars">
            {Array(MAX_RATING).fill('').map((_, id) => {
              const rating = MAX_RATING - id;
              return (
                <React.Fragment key={rating}>
                  <input onChange={inputChangeHandler} className="rating__input" id={`star-${rating}`} type="radio" name="rating" value={rating} checked={filmReview.rating === rating} disabled={disabled} />
                  <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
                </React.Fragment>
              );
            }
            )}
          </div>
        </div>
        <div className="add-review__text">
          <textarea className="add-review__textarea" onChange={inputChangeHandler} name="comment" id="review-text" placeholder="" disabled={disabled}></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={!formValid || disabled}>Post</button>
          </div>
        </div>
      </form>
      {!ratingValid ? <ErrorMessage error={ERRORMESSAGES.RATING} /> : ''}
      {!commentValid ? <ErrorMessage error={ERRORMESSAGES.COMMENT} /> : ''}
    </div>
  );
}

export default React.memo(AddReviewComment);
