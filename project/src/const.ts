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
  ALL_GENRES:  'All genres'
};

export enum ErrorMessages {
  Coment = 'Комментарий должен быть больше 50 и не больше 400 символов',
  Rating ='Выберите рейтинг!'
}

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  Promo = '/promo',
  Comments = '/comments',
  Favorite = '/favorite'
}

export enum AppRoute {
  Root = '/',
  Login = '/login',
  MyList = '/mylist',
  Films = '/films',
  Player = '/player'
}

export enum HeaderClassNames {
  FilmCardHead = 'film-card__head',
  UserPageHead = 'user-page__head'
}

export const TIMEOUT_SHOW_ERROR = 2000;
