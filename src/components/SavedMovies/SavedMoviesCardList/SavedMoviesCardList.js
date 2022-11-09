import MoviesCardList from '../../Movies/MoviesCardList/MoviesCardList';
import MoviesCard from "../../Movies/MoviesCard/MoviesCard";
import pic1 from "../../../images/pic-1.jpg";
import pic2 from "../../../images/pic-2.jpg";
import pic3 from "../../../images/pic-3.jpg";

export default function SavedMoviesCardList() {
    return (
        <MoviesCardList btnVisible={'container-btn__hide'}>
            <MoviesCard
                img={pic1}
                name="33 слова о дизайне"
                title="33 слова о дизайне"
                time="1ч 42м"
                btnImg={'moviesCard__item-info_delete'}
            />
            <MoviesCard
                img={pic2}
                name="Киноальманах «100 лет дизайна»"
                title="Киноальманах «100 лет дизайна»"
                time="1ч 42м"
                btnImg={'moviesCard__item-info_delete'}
            />
            <MoviesCard
                img={pic3}
                name="В погоне за Бенкси"
                title="В погоне за Бенкси"
                time="1ч 42м"
                btnImg={'moviesCard__item-info_delete'}
            />
        </MoviesCardList>
    )
}