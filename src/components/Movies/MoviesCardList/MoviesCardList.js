import './MoviesCardList.css';

export default function MoviesCardList({children}) {
    return (
        <section className="moviesCardList">
            <div className="moviesCardList__container">
                <ul className="moviesCardList__container-catalog">{children}</ul>
                <button className="moviesCardList__container-btn" type="submit">
                    Ещё
                </button>
            </div>
        </section>
    )
}