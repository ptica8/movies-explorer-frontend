import './MoviesCardList.css';
import Preloader from "../Preloader/Preloader";

export default function MoviesCardList(props) {
    return (
        <section className="moviesCardList">
            <div className="moviesCardList__container">
                <ul className="moviesCardList__container-catalog">{props.children}</ul>
                <Preloader isLoading={props.isLoading}/>
                <button className={`moviesCardList__container-btn ${props.btnVisible}`} type="submit">
                    Ещё
                </button>
            </div>
        </section>
    )
}