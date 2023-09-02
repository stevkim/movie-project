import { useState, useEffect } from 'react';
import { trendingListState, setTrendingList } from '../features/mediaSlice';
import { useAppDispatch, useAppSelector } from '../Utils/Hooks/hooks';
import { fetchLists } from '../Utils/fetchFunctions';
import { convertMappedList } from '../Utils/functions';
import AnimateDiv from '../Components/AnimateDiv';
import MediaCard from '../Components/Media-Card/MediaCard';
import Loading from '../Utils/Components/Loading';

const Trending = () => {
	const trendingList = useAppSelector(trendingListState);

	const [loading, setLoading] = useState(true);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (trendingList.length > 0) {
			return setLoading(false);
		}
		const grabTrendingList = async () => {
			const trending = await fetchLists(
				'https://api.themoviedb.org/3/trending/all/day?language=en-US'
			);
			const convertedTrending = convertMappedList(await trending);
			dispatch(setTrendingList(convertedTrending));
			setLoading(false);
		};
		grabTrendingList();
		return () => setLoading(true);
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<>
				<p className='title'>Today's Trending Content...</p>
				<AnimateDiv>
					<div className="flex flex-wrap justify-center">
						{trendingList.map((media) => {
							return (
								<div
									key={`trending ${media.id}`}
									className="w-fit"
								>
									<MediaCard media={media} />
								</div>
							);
						})}
					</div>
				</AnimateDiv>
			</>
		);
	}
};

export default Trending;
