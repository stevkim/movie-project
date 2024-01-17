import { useAppDispatch, useAppSelector } from '../Utils/Hooks/hooks';
import {
	popularMoviesState,
	userListState,
	popularShowsState,
	setPopularMedia,
} from '../features/mediaSlice';
import { useEffect } from 'react';
import { fetchLists } from '../Utils/fetchFunctions';
import MediaListWrapper from '../Components/MediaListWrapper';
import AnimateDiv from '../Components/AnimateDiv';
import { convertMappedList } from '../Utils/functions';

const Home = () => {
	const popularMovies = useAppSelector(popularMoviesState);
	const popularShows = useAppSelector(popularShowsState);
	const userMovies = useAppSelector(userListState);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (popularMovies.length > 0 && popularShows.length > 0) return;
		const setPopularLists = async () => {
			const [popularMovieList, popularTVList] = await Promise.all([
				fetchLists(
					'https://api.themoviedb.org/3/trending/movie/day?language=en-US'
				),
				fetchLists(
					'https://api.themoviedb.org/3/trending/tv/day?language=en-US'
				),
			]);
			const convertedPopularMovies = convertMappedList(popularMovieList);
			const convertedPopularShows = convertMappedList(popularTVList);
			dispatch(
				setPopularMedia({
					popularMovies: convertedPopularMovies,
					popularShows: convertedPopularShows,
				})
			);
		};
		setPopularLists();
	}, []);

	return (
		<AnimateDiv>
			{userMovies.length > 0 && (
				<>
					<MediaListWrapper
						sectionTitle={'My List'}
						mediaList={userMovies}
					/>
					<br />
				</>
			)}

			<MediaListWrapper
				sectionTitle={'Top Movies'}
				mediaList={popularMovies}
			/>
			<br />
			<MediaListWrapper
				sectionTitle={'Top TV'}
				mediaList={popularShows}
			/>
		</AnimateDiv>
	);
};

export default Home;
