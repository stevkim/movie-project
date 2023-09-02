import { Formik, Form } from "formik";
import { toggleGenreModal } from "../../../features/accountSlice";
import { useAppDispatch, useAppSelector } from "../../../Utils/Hooks/hooks";
import { preferredMovieGenreState, preferredShowGenresState, setPreferredMovieGenres, setPreferredTVGenre } from "../../../features/userSlice";
import { showGenreKeyState, movieGenreKeyState } from "../../../features/mediaSlice";
import { Fragment } from "react";
import GenreField from "./genre-field";
import { isDifferent } from "../../../Utils/functions";

const GenreSettingsModal = () => {
  const userPreferredMovieGenres = useAppSelector(preferredMovieGenreState);
  const userPreferredTVGenres = useAppSelector(preferredShowGenresState);
  const tvGenreKey = useAppSelector(showGenreKeyState);
  const movieGenreKey = useAppSelector(movieGenreKeyState);

  const dispatch = useAppDispatch();

  type PreferredGenres = {
    moviePreferences: string[] | [];
    tvPreferences: string[] | [];
  }

  const initValues: PreferredGenres = {
    moviePreferences: userPreferredMovieGenres || [],
    tvPreferences: userPreferredTVGenres || [],
  }

  const handleSubmit = (values:PreferredGenres) => {
    const { moviePreferences, tvPreferences } = values;
    const isMovieDifferent = isDifferent(moviePreferences, userPreferredMovieGenres);
    const isTVDifferent = isDifferent(tvPreferences, userPreferredTVGenres);
    dispatch(toggleGenreModal(false));

    if (!isMovieDifferent && !isTVDifferent) {
      dispatch(setPreferredMovieGenres(moviePreferences));
      dispatch(setPreferredTVGenre(tvPreferences));
    } else if (!isMovieDifferent && isTVDifferent) {
      dispatch(setPreferredMovieGenres(moviePreferences));
    } else if (isMovieDifferent && !isTVDifferent) {
      dispatch(setPreferredTVGenre(tvPreferences));
    }
  }

  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 z-[10] bg-overlay flex justify-center items-center"
      onClick={() => dispatch(toggleGenreModal(false))}
    >
      <div
        className="h-auto max-w-[600px] min-w-[300] w-auto bg-white p-8 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-4xl">Change Genre Preferences</h1>
        <Formik
          initialValues={initValues}
          onSubmit={(values, action) => {
            handleSubmit(values);
            action.setSubmitting(false);
          }}
        >
          <Form>
            <label id='movie-group' className="text-2xl">Movie Preferences</label>
            <div role="group" aria-labelledby="movie-group" className="grid grid-cols-2">
              {
                movieGenreKey.map(genre => {
                  return (
                    <Fragment key={genre.id + 'movie'}>
                      <GenreField genre={genre} mediaType="movie" />
                    </Fragment>
                  )
                })
              }
            </div>

            <label id='tv-group' className="text-2xl">TV Preferences</label>
            <div role="group" aria-labelledby="tv-group" className="grid grid-cols-2">
              {
                tvGenreKey.map(genre => {
                  return (
                    <Fragment key={genre.id + 'tv'}>
                      <GenreField genre={genre} mediaType="tv" />
                    </Fragment>
                  )
                })
              }
            </div>

            <div className="flex justify-evenly mt-4">
              <button className="w-2/5 bg-green-300 rounded-md" type="submit">Save Changes</button>
              <button className="w-2/5 bg-gray-300 rounded-md" onClick={() => dispatch(toggleGenreModal(false))}>Cancel</button>
            </div>
          </Form>
        </Formik>
      </div>

    </div>
  )
}

export default GenreSettingsModal;