import MoviesCardList from '../../Movies/MoviesCardList/MoviesCardList';
import MoviesCard from "../../Movies/MoviesCard/MoviesCard";
import {apiLink} from "../../../constants/constants";

export default function SavedMoviesCardList(props) {

	return (
		<MoviesCardList
			btnVisible={'container-btn__hide'}
			displayedCards={props.displayedCards}
			setDisplayedCards={props.setDisplayedCards}
			cardsInRow={props.cardsInRow}
			filteredMovies={props.filteredMovies}
			getSavedMovieList={props.getSavedMovieList}
		>
			{props.savedMovies.map((movie) => (
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