import MoviesCardList from '../../Movies/MoviesCardList/MoviesCardList';
import MoviesCard from "../../Movies/MoviesCard/MoviesCard";

export default function SavedMoviesCardList(props) {
    return (
        <MoviesCardList
            btnVisible={'container-btn__hide'}
        >
            {props.savedMoviesList.map((movie) => (
                <MoviesCard
                    imageUrl={movie.image.url}
                    nameRu={movie.nameRU}
                    key={movie.id}
                    time={movie.duration}
                    trailerLink={movie.trailerLink}
                    movie={movie}
                    onMovieDelete={props.onMovieDelete}
                    onClick={props.onMovieCLick}
                />
            ))}
        </MoviesCardList>
    )
}