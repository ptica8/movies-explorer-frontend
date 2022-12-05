import React, {useContext} from "react";
import './MoviesCard.css';
import {apiLink} from "../../../constants/constants";
import {CurrentUserContext} from "../../../context/CurrentUserContext";
import {useLocation} from "react-router-dom";

export default function MoviesCard(props) {

	const location = useLocation();

	const moviesLikeButtonClassName = (`moviesCard__item-button ${props.isLiked ? 'moviesCard__item-button_like-active' : 'moviesCard__item-button_like-disable'}`)
	const minutesToHoursAndMinutes = totalMinutes => {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${hours} ч ${minutes} м`
	}

	function handleClick() {
		props.onClick(props.movie);
	}

	function handleLikeClick() {
		props.onMovieLike(props.movie);
	}

	function handleRemoveClick() {
		props.onMovieDelete(props.movie);
	}

	return (
		<section className="moviesCard">
			<li className="moviesCard__item">
				<a href={props.trailerLink} target="_blank" rel="noreferrer">
					<img src={`${apiLink + props.imageUrl}`} className="moviesCard__item_pic" alt={props.nameRu}
						 onClick={handleClick}/>
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