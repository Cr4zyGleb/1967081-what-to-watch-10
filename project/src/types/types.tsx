
export type AppMainProps = {
  title: string;
  releaseDate: number;
  genre: string;
  films: Films;
}

export type VideoPlayerProps = {
  film: FilmProps,
  isPlaying: boolean,
  setIsPlaying: (isPlaying: boolean) => void;
}

export type FilmProps = {
  id: number;
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
}

export type FilmType = {
  film: FilmProps;
}

export type IsFooterType = {
  isFooter?: boolean;
}

export type FilmsType = {
  films: Films;
}

export type Films = FilmProps[];

export type FilmReviewType = {
  comment: string;
  date: string;
  id: number;
  rating : number;
  user : {
    id: number;
    name: string;
  }
}

export type FilmComments = FilmReviewType[];
