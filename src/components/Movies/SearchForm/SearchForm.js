import './SearchForm.css';
import {useState} from "react";

export default function SearchForm(props) {
    const [input, setInput] = useState();
    const [isShortMovie, setIsShortMovie] = useState();
    function handleSubmit(e) {
        e.preventDefault();
        props.setIsLoading(true);
        if (props.location.pathname === '/movies') {
            props.totalQuantityWindowWidth();
            props.getMovieList(input);
        }
        props.setIsLoading(false);
    }
    function handleInputChange(e) {
        setInput(e.target.value);
    }

    function handleCheckboxChange() {

    }

    return (
        <section className="searchForm">
            <div className="searchContainer">
                <form className="searchContainer__find" onSubmit={handleSubmit}>
                    <input className="searchContainer__find-input" type="text" required placeholder="Фильм" minLength="1" onChange={handleInputChange}></input>
                    <button className="searchContainer-btn" type="submit" onSubmit={handleSubmit}>Найти</button>
                </form>
                <div className="searchContainer__filter">
                    <input className="searchContainer__filter-input" type={'checkbox'} checked={isShortMovie} onChange={handleCheckboxChange}></input>
                    <label className="searchContainer__filter-name">Короткометражки</label>
                </div>
            </div>
        </section>
    )
}