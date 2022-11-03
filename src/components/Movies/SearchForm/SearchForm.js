import './SearchForm.css';

export default function SearchForm() {
    return (
        <section className="searchForm">
            <div className="searchContainer">
                <form className="searchContainer__find" noValidate>
                    <input className="searchContainer__find-input" type="text" required placeholder="Фильм" minLength="1"></input>
                    <button className="searchContainer-btn" type="submit">Найти</button>
                </form>
                <div className="searchContainer__filter">
                    <input className="searchContainer__filter-input_active" type="checkbox"></input>
                    <label className="searchContainer__filter-name">Короткометражки</label>
                </div>
            </div>
        </section>
    )
}