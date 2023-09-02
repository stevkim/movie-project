import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { IUserInfo } from '../Utils/interfaces';

interface IUser {
	loggedIn: boolean;
	userInfo?: IUserInfo | null;
	token: string;
}

const initialState: IUser = {
	loggedIn: false,
	userInfo: {
		displayName: '',
		username: '',
		firstName: '',
		lastName: '',
		password: '',
		email: '',
		dob: '',
		phoneNumber: '',
		userList: [],
		preferredMovieGenres: [],
		preferredShowGenres: [],
	},
	token: '',
};

export const userSlice = createSlice({
	name: 'userInfo',
	initialState,
	reducers: {
		setLogin: (state, action: PayloadAction<boolean>) => {
			state.loggedIn = action.payload;
		},
		setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
			state.userInfo = action.payload;
		},
		setPreferredMovieGenres: (state, action: PayloadAction<string[]>) => {
      if (state.userInfo) {
        state.userInfo = {...state.userInfo, preferredMovieGenres: action.payload};
      }
		},
    setPreferredTVGenre: (state, action: PayloadAction<string[]>) => {
      if (state.userInfo) {
        state.userInfo = {...state.userInfo, preferredShowGenres: action.payload}
      }
    },
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
	},
});

export const {
	setUserInfo,
	setToken,
	setLogin,
  setPreferredMovieGenres,
  setPreferredTVGenre
} = userSlice.actions;

export const loggedInState = (state: RootState) => state.userInfo.loggedIn;
export const userInfoState = (state: RootState) => state.userInfo.userInfo;
export const tokenState = (state: RootState) => state.userInfo.token;
export const preferredMovieGenreState = (state: RootState) => state.userInfo.userInfo?.preferredMovieGenres;
export const preferredShowGenresState = (state: RootState) => state.userInfo.userInfo?.preferredShowGenres;

export default userSlice.reducer;
