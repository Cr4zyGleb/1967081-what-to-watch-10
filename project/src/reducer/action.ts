import {createAction} from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { FilmComments, FilmProps, Films} from '../types/types';
import { UserData } from '../types/user-data';

export const changeGenre = createAction<{genre : string}>('changeGenre');

export const changeMaxRenderedFilmsQuantity = createAction('changeMaxRenderedFilmsQuantity');

export const loadFilms = createAction<Films>('loadFilms');

export const loadPromoFilm = createAction<FilmProps>('loadPromoFilm');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const setError = createAction<string | null>('setError');

export const setDataLoadingStatus = createAction<boolean>('setDataLoadingStatus');

export const loadedFilmReviews = createAction<FilmComments>('loadedFilmReviews');

export const userLogin = createAction<UserData>('userLogin');

export const loadFavoriteFilms = createAction<Films>('loadFavoriteFilms');
