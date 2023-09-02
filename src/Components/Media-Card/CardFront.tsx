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

interface Props {
	media: IMediaInfo;
}

const CardFront = ({ media }: Props) => {
	const { title, genres, description, releaseDate, firstAired, id, type } =
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
		<>
			<div className="w-full flex mb-2 items-center p-2">
				<h2 className={`text-xl`}>
					{title}
					<small className="ml-2 text-gray-500">{type}</small>
				</h2>
				<div
						onClick={(e) => {
							e.stopPropagation();
							handleAddMedia();
						}}
						className="ml-auto mr-2 text-2xl p-4 hover:scale-125"
					>
						<PlusToCheck isInList={checkId(userList, id)}/>
					</div>
			</div>
			<p className="max-h-[50%] p-2 overflow-scroll text-xs">{description}</p>

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
		</>
	);
};

export default CardFront;
