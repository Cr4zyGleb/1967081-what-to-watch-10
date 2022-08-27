import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, GENRES } from '../const';
import { FilmComments, FilmProps, Films } from '../types/types';
import { changeGenre, changeMaxRenderedFilmsQuantity, loadFilms, loadPromoFilm, loadedFilmReviews, requireAuthorization, setError, setDataLoadingStatus, userLogin, loadFavoriteFilms } from './action';

const beginRenderedFilmsQuantity = 8;
const stepRenderingFilmsQuantity = 8;

type InitialStateType = {
  genre: string,
  filteredFilms: Films,
  loadedFilms: Films,
  favoriteFilms: Films,
  promoFilm: FilmProps,
  maxRenderedFilmsQuantity: number,
  error: string | null,
  authorizationStatus: AuthorizationStatus,
  isDataLoading: boolean
  loadedFilmReviews: FilmComments
  userId : number
  userAvatarUrl : string
  userEmail : string
};

const initialState: InitialStateType = {
  genre: GENRES.ALLGENRES,
  loadedFilmReviews: [],
  filteredFilms: [],
  loadedFilms: [],
  favoriteFilms: [],
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
  userId : 0,
  userAvatarUrl : '123',
  userEmail : ''
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
    .addCase(loadFavoriteFilms, (state, action) => {
      state.favoriteFilms = action.payload;
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
    .addCase(userLogin, (state, action) => {
      state.userId = action.payload.id;
      state.userAvatarUrl = action.payload.avatarUrl;
      state.userEmail = action.payload.email;
    })
    .addCase(changeMaxRenderedFilmsQuantity, (state) => {
      state.maxRenderedFilmsQuantity = Math.min(state.maxRenderedFilmsQuantity + stepRenderingFilmsQuantity, state.loadedFilms.length);
    });
});

export { reducer };
