import MoviesCardList from '../../Movies/MoviesCardList/MoviesCardList';
import MoviesCard from "../../Movies/MoviesCard/MoviesCard";

export default function SavedMoviesCardList(props) {
	return (
		<MoviesCardList
			btnVisible={'container-btn__hide'}
			displayedCards={props.displayedCards}
			setDisplayedCards={props.setDisplayedCards}
			cardsInRow={props.cardsInRow}
			filteredMovies={props.filteredSavedMovies}
			savedMovies={props.savedMovies}
		>
			{props.filteredSavedMovies.map((movie) => (
				<MoviesCard
					imageUrl={movie.image}
					nameRu={movie.nameRU}
					key={movie.movieId}
					time={movie.duration}
					trailerLink={movie.trailerLink}
					movie={movie}
					onMovieDelete={props.onMovieDelete}
					savedMovies={props.savedMovies}
				/>
			))}
		</MoviesCardList>
	)
}