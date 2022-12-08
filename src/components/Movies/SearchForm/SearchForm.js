import './SearchForm.css';
import {useLocation} from "react-router-dom";
import {useState} from "react";

export default function SearchForm(props) {
	const location = useLocation();
	const [emptySearchFinder, setEmptySearchFinder] = useState('')

	function handleSubmit(e) {
		e.preventDefault();
		if (props.location.pathname === '/movies') {
			props.getMovieList(props.input);
			props.totalQuantityWindowWidth();
		} else if (props.location.pathname === '/saved-movies') {
			props.getSavedMovieList();
		} else {
			setEmptySearchFinder('Нужно ввести ключевое слово')
		}
	}

	function handleInputChange(e) {
		props.setInput(e.target.value);
	}

	function handleCheckboxChange(e) {
		props.setIsShortMovie(e.target.checked);
		props.onCheckboxChange(e.target.checked);
	}

	return (
		<section className="searchForm">
			<div className="searchContainer">
				<form className="searchContainer__find" onSubmit={handleSubmit}>
					<input className="searchContainer__find-input" type="text" required
						   placeholder={emptySearchFinder ? emptySearchFinder : 'Фильм'}
						   minLength="1" onChange={handleInputChange}></input>
					<button className="searchContainer-btn" type="submit" onSubmit={handleSubmit}>Найти</button>
				</form>
				<div className="searchContainer__filter">
					<input className="searchContainer__filter-input" type={'checkbox'} checked={props.isShortMovie}
						   onChange={handleCheckboxChange}></input>
					<label className="searchContainer__filter-name">Короткометражки</label>
				</div>
			</div>
		</section>
	)
}