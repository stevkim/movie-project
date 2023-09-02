export interface IUserInfo {
  displayName: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  dob?: string;
  phoneNumber?: string;
  userList?: IMediaInfo[] | [];
  preferredMovieGenres?: string[] | [];
  preferredShowGenres?: string[] | [];
}

export type Media = 'movie' | 'tv';

export interface IMediaInfo {
  title: string;
  id: number;
  genres: number[];
  poster: string;
  description: string;
  releaseDate?: string;
  firstAired: string;
  stars: number;
  type: Media;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IRandomMedia {
  name: string;
  list: IMediaInfo[];
}

export type preferenceUpdate = { username: string | undefined, type: string, list: string[] | [] | undefined};