import { Field } from 'formik';
import { IGenre, Media } from '../../../Utils/interfaces';
import { preferredMovieGenreState, preferredShowGenresState } from '../../../features/userSlice';
import { useAppSelector } from '../../../Utils/Hooks/hooks';
import { useEffect, useState } from 'react';

interface Props {
	genre: IGenre;
	mediaType: Media;
}

const GenreField = ({ genre, mediaType }: Props) => {
	const { name } = genre;
  const userPreferredList = mediaType === 'movie' ? useAppSelector(preferredMovieGenreState) : useAppSelector(preferredShowGenresState);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (userPreferredList?.includes(name)) {
      setChecked(true);
    }
  }, [])

	return (
		<>
			<label className='block'>
				<Field
					type="checkbox"
					name={mediaType === 'movie' ? 'moviePreferences' : 'tvPreferences'}
          value={name}
          checked={checked ? 'checked' : ''}
          onClick={() => setChecked(!checked)}
				/>
				{'  '}{name}
			</label>
		</>
	);
};

export default GenreField;
