import {createAction} from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { Films } from '../types/types';

export const changeGenre = createAction<{genre : string}>('changeGenre');

export const changeFilms = createAction('changeFilms');

export const changeMaxRenderedFilmsQuantity = createAction('changeMaxRenderedFilmsQuantity');

export const loadFilms = createAction<Films>('loadFilms');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const setError = createAction<string | null>('setError');

export const setDataLoadedStatus = createAction<boolean>('setDataLoadedStatus');
