import { useAppSelector, useAppDispatch } from '../Utils/Hooks/hooks';
import { userListState, removeUserMedia } from '../features/mediaSlice';
import MediaCard from '../Components/Media-Card/MediaCard';
import { motion } from 'framer-motion';
import UserMediaCardWrapper from '../Components/Media-Card/UserMediaCardWrapper';
import { Fragment } from 'react';

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
			<div className="w-full flex flex-wrap my-4 justify-center">
				<h1 className="w-full text-6xl text-center">Your Movie List</h1>
				{movieList.length > 0 ? (
					movieList.map((media) => {
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
					})
				) : (
					<div className="my-8 text-[2rem] text-gray-600">
						Added movies will be saved here!
					</div>
				)}
			</div>
			<br />
			<div className="w-full flex flex-wrap my-4 justify-center">
				<h1 className="w-full text-6xl text-center">Your TV Show List</h1>
				{showList.length > 0 ? (
					showList.map((media) => {
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
					})
				) : (
					<div className="my-8 text-[2rem] text-gray-600">
						Added shows will be saved here!
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default MyList;
