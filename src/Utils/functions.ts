import { IGenre, IMediaInfo, IRandomMedia, Media } from './interfaces';
import { fetchLists } from './fetchFunctions';

type MONTHTYPE = {
	[key: number]: string;
};

const MONTHKEY: MONTHTYPE = {
	1: 'January',
	2: 'February',
	3: 'March',
	4: 'April',
	5: 'May',
	6: 'June',
	7: 'July',
	8: 'August',
	9: 'September',
	10: 'October',
	11: 'November',
	12: 'December',
};

/* format the date */
export const FormatDate = (date: string) => {
	if (date.length === 0) return 'Unknown';
	// expected date to look like year-month-day
	const splitDate = date.split('-');
	const month = splitDate[1];
	return `${MONTHKEY[parseInt(month)]} ${splitDate[2]}, ${splitDate[0]}`;
};

/* converts user password to *s for privacy */
export const PasswordStars = (password = ''): string => {
	let str = '';
	for (let i = 0; i < password.length; i++) {
		str += '*';
	}
	return str;
};

/* crosses genre id with the list of genre keys and returns the string */
export const getGenreName = (array: IGenre[], id: number): string => {
	for (let i = 0; i < array.length; i++) {
		if (array[i].id === id) {
			return array[i].name;
		}
	}
	return '';
};

export const getGenreID = (array: IGenre[], name: string): number => {
	for (let i = 0; i < array.length; i++) {
		if (array[i].name === name) {
			return array[i].id;
		}
	}
	return 0;
};

/* check for media id in user's list, return a boolean */
export const checkId = (list: IMediaInfo[], id: number): boolean => {
	const included = list.find((listItem) => {
		return listItem.id === id;
	});
	return included ? true : false;
};

/* generate a list of 5 genres, based on the user's preferences. if user doesn't have any, one if randomly added from the provided list */
export const GenerateGenre = (
	genreKeyList: IGenre[],
	userGenrePreferences: string[] = [],
	generatedList: string[] = []
): string[] => {
	let genreKeys = genreKeyList;
	let userPreferences = userGenrePreferences ? userGenrePreferences : [];
	let tempList: string[] = generatedList ? generatedList : [];
	if (tempList.length >= 5) return tempList;

	let randomIndex = Math.floor(
		Math.random() *
			(userPreferences.length > 0
				? userPreferences.length
				: genreKeyList.length)
	);

	if (userPreferences.length > 0) {
		if (!tempList.includes(userPreferences[randomIndex])) {
			tempList.push(userPreferences[randomIndex]);
		}
		let tempArr = userPreferences.filter(
			(genre) => genre !== userPreferences[randomIndex]
		);
		return GenerateGenre(genreKeyList, tempArr, tempList);
	} else {
		if (!tempList.includes(genreKeys[randomIndex].name)) {
			tempList.push(genreKeys[randomIndex].name);
		}
		let filteredGenreKeys = genreKeyList.filter(
			(genre) => genre.name !== genreKeyList[randomIndex].name
		);
		return GenerateGenre(filteredGenreKeys, userPreferences, tempList);
	}
};

/* takes in a key list of genres, a generated list (length is always 5), and a media type */
export const getLists = async (
	genreKeyList: IGenre[],
	generatedGenreList: string[],
	mediaType: Media
) => {
	let tempArr: IRandomMedia[] = [];

	for (let i = 0; i < generatedGenreList.length; i++) {
		let genreId = getGenreID(genreKeyList, generatedGenreList[i]);
		const url =
			mediaType === 'movie'
				? `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`
				: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`;
		const res = await fetchLists(url);
		const tempList = convertMappedList(res, mediaType);
		tempArr.push({ name: generatedGenreList[i], list: tempList });
	}
	return tempArr;
};

/* check if the user's array is the same as the inputted array */
export const isDifferent = (
	inputList: string[] = [],
	userList: string[] = []
) => {
	if (!inputList || !userList) return false;
	if (inputList.length !== userList.length) return false;

	let longerArr = inputList.length >= userList.length ? inputList : userList;
	let shorterArr = inputList.length >= userList.length ? userList : inputList;

	for (let i = 0; i < longerArr.length; i++) {
		if (!shorterArr.includes(longerArr[i])) {
			return false;
		}
	}
	return true;
};

const mappedMovie = (media: any) => {
  let name = media.title ? media.title : media.name;
	return {
		title: name,
		id: media.id,
		description: media.overview,
		releaseDate: media.release_date,
		genres: media.genre_ids,
		poster: media.poster_path,
		stars: media.vote_average,
		type: media.media_type || 'movie',
	};
};

const mappedTVShow = (media: any) => {
	return {
		title: media.name,
		id: media.id,
		description: media.overview,
		firstAired: media.first_air_date,
		genres: media.genre_ids,
		poster: media.poster_path,
		stars: media.vote_average,
		type: media.media_type || 'tv',
	};
};

export const convertMappedList = (list: any, type?: Media) => {
	let tempList = list.results.filter(
		(media: any) => media.media_type !== 'person'
	);
	return tempList.map((media: any) => {
		if (media.media_type === 'movie' || type === 'movie') {
			return mappedMovie(media);
		} else {
			return mappedTVShow(media);
		}
	});
};