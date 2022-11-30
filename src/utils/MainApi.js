import { mainApiLink } from '../constants/constants';

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

    getAllMovies(token) {
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(checkResponse)
    }

    addLikeToMovieSaved(token, movie) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        })
            .then(checkResponse)
    }

    deleteMovie(movieId, token) {
        return fetch(`${this._url}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(checkResponse)
    }


}

export const mainApi = new Api({
    url: mainApiLink
})