import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import SavedMoviesCardList from "./SavedMoviesCardList/SavedMoviesCardList";
import {useEffect} from "react";

export default function SavedMovies(props) {

	useEffect(() => {
		props.getSavedMovieList();
	}, [])

	return (
		<section className="movies">
			<SearchForm
				location={props.location}
				setIsLoading={props.setIsLoading}
				input={props.input}
				setInput={props.setInput}
				isShortMovie={props.isShortMovie}
				setIsShortMovie={props.setIsShortMovie}
				onCheckboxChange={props.onCheckboxChange}
				handleSavedMoviesSearch={props.handleSavedMoviesSearch}
			/>
			<SavedMoviesCardList
				filteredSavedMovies={props.filteredSavedMovies}
				displayedCards={props.displayedCards}
				setDisplayedCards={props.setDisplayedCards}
				cardsInRow={props.cardsInRow}
				savedMovies={props.savedMovies}
				onMovieDelete={props.onMovieDelete}
				isLoading={props.isLoading}
			/>
		</section>
	)
}