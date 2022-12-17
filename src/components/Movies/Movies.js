import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import MoviesCard from "./MoviesCard/MoviesCard";
import {useContext, useEffect, useState} from "react";
import {apiLink} from "../../constants/constants";
import {CurrentUserContext} from "../../context/CurrentUserContext";

export default function Movies(props) {
	const currentUser = useContext(CurrentUserContext);
	const [isLoading, setIsLoading] = useState(false);
	const [displayedCards, setDisplayedCards] = useState(0);
	const [cardsInRow, setCardsInRow] = useState(0);

	function totalQuantityWindowWidth() {
		if (window.innerWidth >= 1280) {
			setDisplayedCards(12);
			setCardsInRow(4)
		} else if (window.innerWidth >= 768) {
			setDisplayedCards(8);
			setCardsInRow(2)
		} else if (window.innerWidth <= 768) {
			setDisplayedCards(5);
			setCardsInRow(1)
		}
	}

	useEffect(() => {
		totalQuantityWindowWidth();
		window.addEventListener('resize', () => {
			let timeout;
			clearTimeout(timeout)
			timeout = setTimeout(totalQuantityWindowWidth, 250)
		})
	}, [])

	return (
		<section className="movies">
			<SearchForm
				getMovieList={props.getMovieList}
				location={props.location}
				totalQuantityWindowWidth={totalQuantityWindowWidth}
				setIsLoading={props.setIsLoading}
				input={props.input}
				setInput={props.setInput}
				isShortMovie={props.isShortMovie}
				setIsShortMovie={props.setIsShortMovie}
				onCheckboxChange={props.onCheckboxChange}
			/>
			<MoviesCardList
				isLoading={props.isLoading}
				filteredMovies={props.filteredMovies}
				hasError={props.hasError}
				movies={props.movies}
				displayedCards={displayedCards}
				cardsInRow={cardsInRow}
				setDisplayedCards={setDisplayedCards}
			>
				{props.filteredMovies.slice(0, displayedCards).map((movie) => (
					<MoviesCard
						imageUrl={`${apiLink + movie.image.url}`}
						nameRu={movie.nameRU}
						key={movie.id}
						time={movie.duration}
						trailerLink={movie.trailerLink}
						movie={movie}
						savedMovies={props.savedMovies}
						onMovieLike={props.onMovieLike}
						onMovieLikeRemove={props.onMovieLikeRemove}
						onMovieDelete={props.onMovieDelete}
					/>
				))}
			</MoviesCardList>
		</section>
	)
}