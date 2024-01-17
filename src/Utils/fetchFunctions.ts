import { IMediaInfo, preferenceUpdate } from './interfaces';

const token = import.meta.env.VITE_API_TOKEN

/* grabs a refresh token or alerts not authorized
  returns a string, if possible */
export const handleRefresh = async () => {
	const tokenRes = await fetch('http://localhost:3000/token', {
		method: 'GET',
		credentials: 'include',
	});
	const tokenResult = await tokenRes.json();

	if (tokenRes.status === 200) {
		return tokenResult.token;
	} else {
		alert(tokenResult.msg);
	}
	return;
};

/* grabs the list of genres available */
export const fetchGenre = async (url: string) => {
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await res.json();
	return data.genres;
};

type Body = {
	username: string | undefined;
	list: IMediaInfo[] | [];
};
/* updates the user's movie list in the database */
export const updateMoviesList = async (token: string, body: Body) => {
	const res = await fetch('http://localhost:3000/account/user-movies', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
		credentials: 'include',
	});
	const message = await res.json();
	return message.msg
};

/* fetches the list we are looking for */
export const fetchLists = async (url: string) => {
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await res.json();
	return data;
};

/* updates the users preferences to the db */
export const updatePreferences = async (token: string, body:preferenceUpdate) => {
	const res = await fetch('http://localhost:3000/account/preferences', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
		credentials: 'include',
	});
	const message = await res.json();
	return message.msg;
}


export const fetchSearchList = async (value: string) => {
	if (!value) return;
	const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${value}&include_adult=false&language=en-US&page=1`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${token}`,
		}
	})
	const data = await res.json();
	return data;
}

export const fetchUserInfo = async(token: string, id: string) => {
	const res = await fetch('http://localhost:3000/account/info', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ _id: id}),
		credentials: 'include',
	});
	const result = await res.json();
	return { data: result.data, movieList: result.data.movieList || []};
}