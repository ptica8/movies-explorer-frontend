import './SearchForm.css';
import {useLocation} from "react-router-dom";

export default function SearchForm(props) {
	const location = useLocation();

	function handleSubmit(e) {
		e.preventDefault();
		if (props.location.pathname === '/movies') {
			props.totalQuantityWindowWidth();
			props.getMovieList(props.input);
		}
	}

	function handleInputChange(e) {
		props.setInput(e.target.value);
	}

	function handleCheckboxChange({target: {checked}}) {
		props.setIsShortMovie(checked);
		if (location.pathname === '/movies') {
			localStorage.setItem('isShortMovie', checked)
		}
	}

	return (
		<section className="searchForm">
			<div className="searchContainer">
				<form className="searchContainer__find" onSubmit={handleSubmit}>
					<input className="searchContainer__find-input" type="text" required placeholder="Фильм"
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