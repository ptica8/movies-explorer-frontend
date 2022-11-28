import {moviesApiLink} from "../constants/constants";

export default function MoviesApi() {
    const results = (res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }
    return fetch(moviesApiLink).then(results);
}
