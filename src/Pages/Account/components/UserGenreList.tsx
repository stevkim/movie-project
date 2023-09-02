import { Media } from '../../../Utils/interfaces';

interface Props {
	type: Media;
	list: string[] | [] | undefined;
}

const UserGenreList = ({ type, list }: Props) => {
	return (
		<ul className='flex flex-wrap'>
			{list!.map((genreName) => {
				return (<li
					key={
						type === 'movie'
							? `userMoviePref ${genreName}`
							: `userTVPref ${genreName}`
					}
					className="m-2 border-2 p-2 text-xs rounded-sm"
				>
					{genreName}
				</li>)
			})}
		</ul>
	);
};

export default UserGenreList;
