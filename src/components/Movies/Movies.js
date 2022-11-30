import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import MoviesCard from "./MoviesCard/MoviesCard";
import {useContext, useState} from "react";
import {CurrentUserContext} from "../../context/CurrentUserContext";

export default function Movies(props) {
    const currentUser = useContext(CurrentUserContext);
    const isLiked = props.savedMovies.some(i => i === currentUser._id) || false;
    const [totalQuantityMovies, setTotalQuantityMovies] = useState(12);
    const [totalQuantityInRow, setTotalQuantityInRow] = useState(3);

    function totalQuantityWindowWidth() {
        if (window.innerWidth >= 1280) {
            setTotalQuantityMovies(12);
            setTotalQuantityInRow(3)
        } else if (window.innerWidth >= 768) {
            setTotalQuantityMovies(8);
            setTotalQuantityInRow(2)
        } else if (window.innerWidth <= 768) {
            setTotalQuantityMovies(5);
            setTotalQuantityInRow(1)
        }
    }

    return (
        <section className="movies">
            <SearchForm
                getMovieList={props.getMovieList}
                location={props.location}
                totalQuantityWindowWidth={totalQuantityWindowWidth}
                setIsLoading={props.setIsLoading}
            />
            <MoviesCardList
                isLoading={props.isLoading}
            >
                {props.moviesList.map((movie) => (
                    <MoviesCard
                        imageUrl={movie.image.url}
                        nameRu={movie.nameRU}
                        key={movie.id}
                        time={movie.duration}
                        trailerLink={movie.trailerLink}
                        movie={movie}
                        onMovieLike={props.onMovieLike}
                        onClick={props.onMovieCLick}
                        isLiked={isLiked}
                    />
                ))}
            </MoviesCardList>
        </section>
    )
}