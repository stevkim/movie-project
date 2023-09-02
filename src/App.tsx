import Navbar from './Components/Header/Navbar';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './Utils/Hooks/hooks';
import {
	setLogin,
	setUserInfo,
	loggedInState,
	userInfoState,
	preferredMovieGenreState,
	preferredShowGenresState,
} from './features/userSlice';
import { useCallback, useEffect } from 'react';
import { toggleMenu } from './features/profileSlice';
import {
	setUserList,
	userListState,
	setSearchedList,
	setGenreKeys,
} from './features/mediaSlice';
import {
	fetchSearchList,
	handleRefresh,
	updateMoviesList,
	updatePreferences,
	fetchUserInfo,
	fetchGenre
} from './Utils/fetchFunctions';
import { valueToFetchState } from './features/searchSlice';
import SearchPage from './Pages/search-page';
import { preferenceUpdate } from './Utils/interfaces';
import { convertMappedList } from './Utils/functions';

function App() {
	const loggedIn = useAppSelector(loggedInState);
	const userMovies = useAppSelector(userListState);
	const userPreferredMovieGenres = useAppSelector(preferredMovieGenreState);
	const userPreferredTVGenres = useAppSelector(preferredShowGenresState);
	const userInfo = useAppSelector(userInfoState);
	const valueToFetch = useAppSelector(valueToFetchState);


	const localLogin = window.localStorage.getItem('loggedIn');
	const userID = window.localStorage.getItem('ID');


	const dispatch = useAppDispatch();

	const updateUserInfo = async (id: string) => {
		let token = await handleRefresh();
		const res = await fetchUserInfo(token, id);
		dispatch(setUserInfo(res.data));
		dispatch(setUserList(res.data.movieList || []));
	};

	const updatedLoggedIn = useCallback(() => {
		if (localLogin === 'true' && userID) {
			updateUserInfo(userID);
			dispatch(setLogin(true));
		} else {
			dispatch(setLogin(false));
		}
	}, []);

	useEffect(() => {
		updatedLoggedIn();
		const fetchGenres = async () => {
			const [movieGenreKeyList, showGenreKeyList] = await Promise.all([
				fetchGenre('https://api.themoviedb.org/3/genre/movie/list?language=en'),
				fetchGenre('https://api.themoviedb.org/3/genre/tv/list?language=en'),
			]);
			dispatch(setGenreKeys({ movieGenreKeyList, showGenreKeyList }));
		};
		fetchGenres();
	}, []);

	/* watches userMovies list and calls for an update each time it is changed */
	useEffect(() => {
		const updateList = async () => {
			let token = await handleRefresh();
			let body = { username: userInfo?.username, list: userMovies };
			updateMoviesList(token, body);
		};
		updateList();
	}, [userMovies]);

	useEffect(() => {
		const updatePref = async () => {
			let token = await handleRefresh();
			let body: preferenceUpdate = {
				username: userInfo?.username,
				type: 'preferredMovieGenres',
				list: userPreferredMovieGenres,
			};
			updatePreferences(token, body);
		};
		updatePref();
	}, [userInfo?.preferredMovieGenres]);

	useEffect(() => {
		const updatePref = async () => {
			let token = await handleRefresh();
			let body: preferenceUpdate = {
				username: userInfo?.username,
				type: 'preferredShowGenres',
				list: userPreferredTVGenres,
			};
			updatePreferences(token, body);
		};
		updatePref();
	}, [userInfo?.preferredShowGenres]);

	useEffect(() => {
		const grabSearchList = async () => {
			let list = await fetchSearchList(valueToFetch);
			if (list) {
				let mappedList = convertMappedList(list);
				dispatch(setSearchedList(mappedList));
			}
		};
		grabSearchList();
	}, [valueToFetch]);

	if (loggedIn) {
		return (
			<div onClick={() => dispatch(toggleMenu(false))} className='bg-gradient'>
				<Navbar />
				<section
					className="w-full h-auto min-h-screen p-2"
				>
					{valueToFetch !== '' ? <SearchPage /> : <Outlet />}
				</section>
			</div>
		);
	} else {
		return <Navigate to={'/login'} />;
	}
}

export default App;
