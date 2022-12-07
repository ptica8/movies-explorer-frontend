import React, {useContext} from "react";
import './MoviesCard.css';
import {apiLink} from "../../../constants/constants";
import {CurrentUserContext} from "../../../context/CurrentUserContext";
import {useLocation} from "react-router-dom";

export default function MoviesCard(props) {
	const location = useLocation();
	const isLiked = props.savedMovies.some(({movieId}) => movieId === props.movie.id) || false;
	const moviesLikeButtonClassName = (`moviesCard__item-button ${isLiked ? 'moviesCard__item-button_like-active' : 'moviesCard__item-button_like-disable'}`)
	console.log('savedMovies:', props.savedMovies)
	const minutesToHoursAndMinutes = totalMinutes => {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${hours} ч ${minutes} м`
	}

	function handleLikeClick() {
		isLiked ? props.onMovieLikeRemove(props.movie) : props.onMovieLike(props.movie);
	}

	function handleRemoveClick() {
		props.onMovieDelete(props.movie);
	}

	return (
		<section className="moviesCard">
			<li className="moviesCard__item">
				<a href={props.trailerLink} target="_blank" rel="noreferrer">
					<img src={`${apiLink + props.imageUrl}`} className="moviesCard__item_pic" alt={props.nameRu}/>
				</a>
				<div className="moviesCard__item-info">
					<h2 className="moviesCard__item-info_title">{props.nameRu}</h2>
					{location.pathname === '/movies' ? (
						<button className={moviesLikeButtonClassName}
								type="button"
								onClick={handleLikeClick}
						/>
					) : (
						<button className="moviesCard__item-button moviesCard__item-info_delete"
								type="button"
								onClick={handleRemoveClick}
						/>
					)}
				</div>
				<p className="moviesCard__item_time">{minutesToHoursAndMinutes(props.time)}</p>
			</li>
		</section>
	)
}