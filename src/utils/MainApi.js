import {mainApiLink, apiLink} from '../constants/constants';

export const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
}

class Api {
	constructor(config) {
		this._url = config.url;
	}

	register(name, email, password) {
		return fetch(`${this._url}/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({'name': name, 'email': email, 'password': password})
		})
			.then(checkResponse);
	}

	authorize(email, password) {
		return fetch(`${this._url}/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({'email': email, 'password': password})
		})
			.then(checkResponse);
	}

	getUserInfo(token) {
		return fetch(`${this._url}/users/me`, {
			method: 'GET',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		})
			.then(checkResponse);
	}

	editProfileInfo(data, token) {
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(checkResponse)
	}

	getSavedMovies(token) {
		return fetch(`${this._url}/movies`, {
			method: 'GET',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		})
			.then(checkResponse)
	}

	addLikeToMovieSaved(token, movie, currentUser) {
		return fetch(`${this._url}/movies`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			user: currentUser,
			body: JSON.stringify({
				image: `${apiLink + movie.image.url}`,
				thumbnail: `${apiLink + movie.image.thumbnail}`,
				country: movie.country,
				director: movie.director,
				duration: movie.duration,
				year: movie.year,
				description: movie.description,
				trailerLink: movie.trailerLink,
				movieId: movie.id,
				nameRU: movie.nameRU,
				nameEN: movie.nameEN,
			})
		})
			.then(checkResponse)
	}

	deleteMovie(token, movieId, currentUser) {
		return fetch(`${this._url}/movies/${movieId}`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			user: currentUser
		})
			.then(checkResponse)
	}

}

export const mainApi = new Api({
	url: mainApiLink
})