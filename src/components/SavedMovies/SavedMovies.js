import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import SavedMoviesCardList from "./SavedMoviesCardList/SavedMoviesCardList";

export default function SavedMovies() {
    return (
        <section className="movies">
            <SearchForm />
            <SavedMoviesCardList/>
        </section>
    )
}