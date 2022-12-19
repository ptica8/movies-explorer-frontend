import './SearchForm.css';
import {useState} from "react";

export default function SearchForm(props) {
	const [emptySearchFinder, setEmptySearchFinder] = useState('')

	function handleSubmit(e) {
		e.preventDefault();
		if (props.location.pathname === '/movies') {
			props.getMovieList(props.input);
			props.totalQuantityWindowWidth();
		} else if (props.location.pathname === '/saved-movies') {
			props.handleSavedMoviesSearch(props.input, props.isShortMovie);
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
					<input
						value={props.input}
						type="text"
						required
						minLength="1"
						placeholder={emptySearchFinder ? emptySearchFinder : 'Фильм'}
						className="searchContainer__find-input"
						onChange={handleInputChange}
					/>
					<button className="searchContainer-btn" type="submit" onSubmit={handleSubmit}>Найти</button>
				</form>
				<div className="searchContainer__filter">
					<input
						checked={props.isShortMovie}
						type={'checkbox'}
						className="searchContainer__filter-input"
						onChange={handleCheckboxChange}
					/>
					<label className="searchContainer__filter-name">Короткометражки</label>
				</div>
			</div>
		</section>
	)
}