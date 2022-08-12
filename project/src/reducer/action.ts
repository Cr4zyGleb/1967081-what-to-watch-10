import {createAction} from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { FilmProps, Films } from '../types/types';

export const changeGenre = createAction<{genre : string}>('changeGenre');

export const changeMaxRenderedFilmsQuantity = createAction('changeMaxRenderedFilmsQuantity');

export const loadFilms = createAction<Films>('loadFilms');

export const loadPromoFilm = createAction<FilmProps>('loadPromoFilm');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const setError = createAction<string | null>('setError');

export const setDataLoadingStatus = createAction<boolean>('setDataLoadingStatus');
