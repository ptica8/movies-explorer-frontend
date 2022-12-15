import './MoviesCardList.css';
import Preloader from "../Preloader/Preloader";
import {useLocation} from "react-router-dom";

export default function MoviesCardList(props) {
	const location = useLocation();
	const isNothingFoundDisplayed = location.pathname === '/movies' || location.pathname === '/saved-movies'
		? !props.isLoading && !props.filteredMovies.length && !!props.movies?.length
		: !props.savedMovies?.length

	function handleAddCards() {
		if (props.displayedCards < props.filteredMovies.length) {
			props.setDisplayedCards(props.displayedCards + props.cardsInRow)
		}
	}

	return (
		<section className="moviesCardList">
			<div className="moviesCardList__container">
				{!props.isLoading && !!props.filteredMovies.length &&
					<ul className="moviesCardList__container-catalog">{props.children}</ul>}
				{props.isLoading && <Preloader/>}
				{isNothingFoundDisplayed &&
					<p className="moviesCardList__container_text">Ничего не найдено</p>}
				{props.hasError &&
					<p className="moviesCardList__container_text">Во время запроса произошла ошибка. Возможно, проблема
						с
						соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
					</p>
				}
				{props.displayedCards < props.filteredMovies.length && location.pathname === '/movies' &&
					<button className={`moviesCardList__container-btn ${props.btnVisible}`} type="submit"
							onClick={handleAddCards}>
						Ещё
					</button>
				}
			</div>
		</section>
	)
}