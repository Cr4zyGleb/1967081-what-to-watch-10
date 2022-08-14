import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, GENRES } from '../const';
import { FilmComments, FilmProps, Films } from '../types/types';
import { changeGenre, changeMaxRenderedFilmsQuantity, loadFilms, loadPromoFilm, loadedFilmReviews, requireAuthorization, setError, setDataLoadingStatus } from './action';

const beginRenderedFilmsQuantity = 8;
const stepRenderingFilmsQuantity = 8;

type InitialStateType = {
  genre: string,
  filteredFilms: Films,
  loadedFilms: Films,
  promoFilm: FilmProps,
  maxRenderedFilmsQuantity: number,
  error: string | null,
  authorizationStatus: AuthorizationStatus,
  isDataLoading: boolean
  loadedFilmReviews: FilmComments
};

const initialState: InitialStateType = {
  genre: GENRES.ALLGENRES,
  loadedFilmReviews: [],
  filteredFilms: [],
  loadedFilms: [],
  promoFilm: {
    id: 0,
    name: '',
    posterImage: '',
    previewImage: '',
    backgroundImage: '',
    backgroundColor: '',
    videoLink: '',
    previewVideoLink: '',
    description: '',
    rating: 0,
    scoresCount: 0,
    director: '',
    starring: [],
    runTime: 0,
    genre: '',
    released: 0,
    isFavorite: false,
  },
  maxRenderedFilmsQuantity: beginRenderedFilmsQuantity,
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: false,
};
const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const { genre } = action.payload;
      state.genre = genre;
      state.maxRenderedFilmsQuantity = beginRenderedFilmsQuantity;
    })
    .addCase(loadFilms, (state, action) => {
      state.loadedFilms = action.payload;
    })
    .addCase(loadedFilmReviews, (state, action) => {
      state.loadedFilmReviews = action.payload;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setDataLoadingStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(changeMaxRenderedFilmsQuantity, (state) => {
      state.maxRenderedFilmsQuantity = Math.min(state.maxRenderedFilmsQuantity + stepRenderingFilmsQuantity, state.loadedFilms.length);
    });
});

export { reducer };
