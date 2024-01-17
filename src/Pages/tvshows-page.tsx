import {
	showGenreKeyState,
	randomTVShowsState,
	setRandomTVShows,
} from '../features/mediaSlice';
import { useAppDispatch, useAppSelector } from '../Utils/Hooks/hooks';
import { GenerateGenre, getLists } from '../Utils/functions';
import { useMemo, useCallback, useState, Fragment, useEffect } from 'react';
import MediaListWrapper from '../Components/MediaListWrapper';
import { preferredShowGenresState } from '../features/userSlice';
import AnimateDiv from '../Components/AnimateDiv';
import Loading from '../Utils/Components/Loading';

const TVShows = () => {
	const tvGenreKey = useAppSelector(showGenreKeyState);
	const preferredList = useAppSelector(preferredShowGenresState);
	const randomTVShowsLists = useAppSelector(randomTVShowsState);
	const tvGenreList = useMemo(
		() => GenerateGenre(tvGenreKey, preferredList),
		[tvGenreKey]
	);
	const generatedLists = useCallback(
		() => getLists(tvGenreKey, tvGenreList, 'tv'),
		[tvGenreList]
	);

	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (randomTVShowsLists.length > 0) {
			setLoading(false);
			return;
		}
		const randomLists = async () => {
			let randomList = await generatedLists();
			dispatch(setRandomTVShows(randomList));
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
				<h1 className='title text-center'>Popular TV by Genre</h1>
				{randomTVShowsLists.map((listItem) => {
					return (
						<Fragment key={`tvshows ${listItem.name}`}>
							<MediaListWrapper
								sectionTitle={listItem.name}
								mediaList={listItem.list}
							/>
							<br />
						</Fragment>
					);
				})}
			</AnimateDiv>
		);
	}
};

export default TVShows;
