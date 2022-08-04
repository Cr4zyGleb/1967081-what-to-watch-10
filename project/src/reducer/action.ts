import {createAction} from '@reduxjs/toolkit';

export const changeGenre = createAction<{genre : string}>('changeGenre');

export const changeFilms = createAction('changeFilms');

export const changeMaxRenderedFilmsQuantity = createAction('changeMaxRenderedFilmsQuantity');
