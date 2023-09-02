import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IGenre, IMediaInfo, IRandomMedia } from "../Utils/interfaces";

type GenreLists = {
  showGenreKeyList: IGenre[] | [];
  movieGenreKeyList: IGenre[] | [];
}

type PopularLists = {
  popularMovies: IMediaInfo[] | [];
  popularShows: IMediaInfo[] | [];
}

type Lists = {
  popularMovies: IMediaInfo[] | [];
  popularShows: IMediaInfo[] | [];
  movieGenreKeys: IGenre[] | [];
  showGenreKeys: IGenre[] | [];
  userList: IMediaInfo[] | [];
  randomMovies: IRandomMedia[] | [];
  randomTVShows: IRandomMedia[] | [];
  searchedList: IMediaInfo[] | [];
  trendingList: IMediaInfo[] | []
}

const initialState:Lists = {
  popularMovies: [],
  popularShows: [],
  showGenreKeys: [],
  movieGenreKeys: [],
  userList: [],
  randomMovies: [],
  randomTVShows: [],
  searchedList: [],
  trendingList: [],
}

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setPopularMedia: (state, action: PayloadAction<PopularLists>) => {
      state.popularMovies = action.payload.popularMovies;
      state.popularShows = action.payload.popularShows;
    },
    setUserList: (state, action: PayloadAction<IMediaInfo[]>) => {
      state.userList = action.payload;
    },
    addUserMedia: (state, action: PayloadAction<IMediaInfo>) => {
      state.userList = [...state.userList, action.payload];
    },
    removeUserMedia: (state, action: PayloadAction<number>) => {
      state.userList = state.userList.filter(item => {
        return item.id !== action.payload;
      })
    },
    setRandomMovies: (state, action: PayloadAction<IRandomMedia[]>) => {
      state.randomMovies = action.payload;
    },
    setRandomTVShows: (state, action: PayloadAction<IRandomMedia[]>) => {
      state.randomTVShows = action.payload;
    },
    setSearchedList: (state, action: PayloadAction<IMediaInfo[] | []>) => {
      state.searchedList = action.payload;
    },
    setTrendingList: (state, action: PayloadAction<IMediaInfo[]>) => {
      state.trendingList = action.payload;
    },
    setGenreKeys: (state, action: PayloadAction<GenreLists>) => {
      state.showGenreKeys = action.payload.showGenreKeyList;
      state.movieGenreKeys = action.payload.movieGenreKeyList;
    }
  }
})

export const {
  setUserList,
  addUserMedia,
  removeUserMedia,
  setRandomMovies,
  setRandomTVShows,
  setSearchedList,
  setTrendingList,
  setGenreKeys,
  setPopularMedia
 } = mediaSlice.actions;

export const popularMoviesState = (state: RootState) => state.media.popularMovies;
export const popularShowsState = (state: RootState) => state.media.popularShows;
export const movieGenreKeyState = (state: RootState) => state.media.movieGenreKeys;
export const showGenreKeyState = (state: RootState) => state.media.showGenreKeys;
export const userListState = (state: RootState) => state.media.userList;
export const randomMoviesState = (state: RootState) => state.media.randomMovies;
export const randomTVShowsState = (state: RootState) => state.media.randomTVShows;
export const searchedListState = (state: RootState) => state.media.searchedList;
export const trendingListState = (state: RootState) => state.media.trendingList;

export default mediaSlice.reducer;