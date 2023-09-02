import { IMediaInfo } from '../../Utils/interfaces';
import { getGenreName, FormatDate, checkId } from '../../Utils/functions';
import {
	movieGenreKeyState,
	showGenreKeyState,
	userListState,
} from '../../features/mediaSlice';
import { useAppDispatch, useAppSelector } from '../../Utils/Hooks/hooks';
import { addUserMedia } from '../../features/mediaSlice';
import PlusToCheck from '../../Utils/Components/PlusToCheck';
import StarRating from '../../Utils/Components/StarRating';

interface Props {
	media: IMediaInfo;
}

const CardFront = ({ media }: Props) => {
	const { title, genres, description, releaseDate, firstAired, id, stars, type } =
		media;

	const genreKey =
		media.type === 'movie'
			? useAppSelector(movieGenreKeyState)
			: useAppSelector(showGenreKeyState);
	const userList = useAppSelector(userListState);

	const dispatch = useAppDispatch();

	const handleAddMedia = () => {
		if (!checkId(userList, id)) {
			dispatch(addUserMedia(media));
			console.log('Successfully Added');
		} else {
			console.log('Already a part of user list!');
		}
	};

	return (
		<div className='p-4'>
			<div className="w-full flex items-center">
				<h2 className={`text-xl`}>
					{title}
				</h2>
				<div
						onClick={(e) => {
							e.stopPropagation();
							handleAddMedia();
						}}
						className="ml-auto mr-2 text-2xl p-2 hover:scale-125"
					>
						<PlusToCheck isInList={checkId(userList, id)}/>
					</div>
			</div>
			<div className='flex flex-row items-center mb-2'>
				<div title={`Average rating: ${stars}/10`} className='w-fit'>
					<StarRating starRating={stars} />
				</div>
				<small className="ml-2 text-gray-500">{type}</small>
			</div>
			<p className="max-h-[50%] overflow-scroll text-[1rem]">{description}</p>

			<ul className="mt-4 flex flex-wrap max-h-[20%]">
				{genres.map((genre) => {
					return (
						<li
							key={`${title},genre,${genre}`}
							className="m-2 p-2 bg-white text-gray-600 text-[.6rem] rounded-sm w-fit"
						>
							{getGenreName(genreKey, genre)}
						</li>
					);
				})}
			</ul>

			<p className="absolute right-0 bottom-0 text-xs">
				{media.type === 'movie' ? (
					<> Premiered: {FormatDate(releaseDate || '')} </>
				) : (
					<> Pilot: {FormatDate(firstAired || '')} </>
				)}
			</p>
		</div>
	);
};

export default CardFront;
