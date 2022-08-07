import {createReducer} from '@reduxjs/toolkit';
import { AuthorizationStatus, GENRES } from '../const';
import { FILMS } from '../mocks/films';
import { Films } from '../types/types';
import { changeGenre, changeFilms, changeMaxRenderedFilmsQuantity, loadFilms, requireAuthorization, setError, setDataLoadedStatus } from './action';

const beginRenderedFilmsQuantity = 8;

type InitialStateType = {
  genre: string,
  filteredFilms: Films,
  loadedFilms : Films
  maxRenderedFilmsQuantity: number,
  error: string | null,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};

const initialState : InitialStateType = {
  genre: GENRES.ALLGENRES,
  filteredFilms: FILMS,
  loadedFilms : FILMS,
  maxRenderedFilmsQuantity: beginRenderedFilmsQuantity,
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
      state.maxRenderedFilmsQuantity = beginRenderedFilmsQuantity;
    })
    .addCase(changeFilms, (state) => {
      state.filteredFilms = state.loadedFilms.filter((elem) => elem.genre === state.genre || state.genre === GENRES.ALLGENRES);
    })
    .addCase(loadFilms, (state, action) => {
      state.loadedFilms = action.payload;

    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(changeMaxRenderedFilmsQuantity, (state) => {
      state.maxRenderedFilmsQuantity = Math.min(state.maxRenderedFilmsQuantity + 8, state.loadedFilms.length);
    });
});

export {reducer};
