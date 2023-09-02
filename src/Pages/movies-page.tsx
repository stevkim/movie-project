import { GenerateGenre, getLists } from '../Utils/functions';
import {
	movieGenreKeyState,
	randomMoviesState,
	setRandomMovies,
} from '../features/mediaSlice';
import { useAppSelector, useAppDispatch } from '../Utils/Hooks/hooks';
import { useEffect, useMemo, useCallback, Fragment, useState } from 'react';
import { preferredMovieGenreState } from '../features/userSlice';
import MediaListWrapper from '../Components/MediaListWrapper';
import AnimateDiv from '../Components/AnimateDiv';
import Loading from '../Utils/Components/Loading';

const Movies = () => {
	const movieGenreKey = useAppSelector(movieGenreKeyState);
	const preferredList = useAppSelector(preferredMovieGenreState);
	const randomMoviesLists = useAppSelector(randomMoviesState);
	const movGenreList = useMemo(
		() => GenerateGenre(movieGenreKey, preferredList),
		[movieGenreKey]
	);
	const generatedLists = useCallback(
		() => getLists(movieGenreKey, movGenreList, 'movie'),
		[movGenreList]
	);

	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (randomMoviesLists.length > 0) {
			setLoading(false);
			return;
		}
		const randomLists = async () => {
			let randomList = await generatedLists();
			dispatch(setRandomMovies(randomList));
			setLoading(false);
		};
		randomLists();

		return () => setLoading(true);
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<AnimateDiv>
				<h1 className='title text-center'>Popular Movies by Genre</h1>
				{randomMoviesLists.map((listItem) => {
					return (
						<Fragment key={`movies ${listItem.name}`}>
							<MediaListWrapper
								sectionTitle={listItem.name}
								mediaList={listItem.list}
							/>
						</Fragment>
					);
				})}
			</AnimateDiv>
		);
	}
};

export default Movies;
