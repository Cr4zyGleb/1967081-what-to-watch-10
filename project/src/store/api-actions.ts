import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { store } from '.';
import { loadedFilmReviews, loadFavoriteFilms, loadFilms, loadPromoFilm, requireAuthorization, setDataLoadingStatus, setError, userLogin } from '../reducer/action';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { AppDispatch, State } from '../types/state';
import { CommentData, FavoriteFilmStatus, FilmComments, FilmProps, FilmReviewType, Films } from '../types/types';
import { UserData } from '../types/user-data';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setDataLoadingStatus(true));
    const {data} = await api.get<Films>(APIRoute.Films);
    dispatch(loadFilms(data));
    dispatch(setDataLoadingStatus(false));
  },
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmProps>(APIRoute.Promo);
    dispatch(loadPromoFilm(data));
  },
);

export const getFilmReviews = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'fetchFilmReviews',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmComments>(`${APIRoute.Comments}/${filmId}`);
    dispatch(loadedFilmReviews(data));
  },
);

export const getFavoriteFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'fetchFavoriteFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Favorite);
    dispatch(loadFavoriteFilms(data));
  },
);

export const postFavoriteFilm = createAsyncThunk<void, FavoriteFilmStatus, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'postFavoriteFilm',
  async ({filmId, status}, {dispatch, extra: api}) => {
    await api.post<FilmProps>(`${APIRoute.Favorite}/${filmId}/${status}`);
    const {data} = await api.get<Films>(APIRoute.Favorite);
    dispatch(loadFavoriteFilms(data));
  },
);

export const postFilmReview = createAsyncThunk<void, [string | undefined, CommentData], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'postFilmReview',
  async ([filmId, {comment, rating}], {dispatch, extra: api}) => {
    await api.post<FilmReviewType>(`${APIRoute.Comments}/${filmId}`, {comment, rating});
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(userLogin(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  '/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    saveToken(data.token);
    dispatch(userLogin(data));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  '/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);
