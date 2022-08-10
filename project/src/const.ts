export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum FilmCardTabs {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

export enum FilmLevels {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very good',
  Awesome = 'Awesome'
}

export const GENRES = {
  ALLGENRES: 'All genres'
};

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  Promo = '/promo'
}

export enum AppRoute {
  Root = '/',
  Login = 'login',
  MyList = 'mylist',
  Films = 'films',
  Player = 'player'
}

export const TIMEOUT_SHOW_ERROR = 2000;
