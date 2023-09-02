import { useAppSelector, useAppDispatch } from '../Utils/Hooks/hooks';
import { userListState, removeUserMedia } from '../features/mediaSlice';
import MediaCard from '../Components/Media-Card/MediaCard';
import { motion } from 'framer-motion';
import UserMediaCardWrapper from '../Components/Media-Card/UserMediaCardWrapper';
import { Fragment } from 'react';
import Loading from '../Utils/Components/Loading';

const MyList = () => {
	const userList = useAppSelector(userListState);
	const movieList = userList.filter((item) => item.type === 'movie');
	const showList = userList.filter((item) => item.type === 'tv');

	const dispatch = useAppDispatch();

	const handleDelete = (id: number) => {
		dispatch(removeUserMedia(id));
	};

	return (
		<motion.div
			initial={{ y: '100%', opacity: 0 }}
			animate={{ y: '0', opacity: 1 }}
		>
				<Loading />
			<div className="w-full flex flex-wrap my-4 justify-center">
				<h1 className="w-full text-6xl text-center">Your Movie List</h1>
				{movieList.map((media) => {
					return (
						<Fragment key={media.id}>
							<UserMediaCardWrapper
								id={media.id}
								handleDelete={handleDelete}
							>
								<MediaCard media={media} />
							</UserMediaCardWrapper>
						</Fragment>
					);
				})}
			</div>

			<div className="w-full flex flex-wrap my-4 justify-center">
				<h1 className="w-full text-6xl text-center">Your TV Show List</h1>
				{showList.map((media) => {
					return (
						<Fragment key={media.id}>
							<UserMediaCardWrapper
								id={media.id}
								handleDelete={handleDelete}
							>
								<MediaCard media={media} />
							</UserMediaCardWrapper>
						</Fragment>
					);
				})}
			</div>
		</motion.div>
	);
};

export default MyList;
