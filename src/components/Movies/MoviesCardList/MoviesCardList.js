import './MoviesCardList.css';

export default function MoviesCardList(props) {
    return (
        <section className="moviesCardList">
            <div className="moviesCardList__container">
                <ul className="moviesCardList__container-catalog">{props.children}</ul>
                <button className={`moviesCardList__container-btn ${props.btnVisible}`} type="submit">
                    Ещё
                </button>
            </div>
        </section>
    )
}