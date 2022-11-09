import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import MoviesCard from "./MoviesCard/MoviesCard";
import pic1 from '../../images/pic-1.jpg';
import pic2 from '../../images/pic-2.jpg';
import pic3 from '../../images/pic-3.jpg';
import pic4 from '../../images/pic-4.jpg';
import pic5 from '../../images/pic-5.jpg';
import pic6 from '../../images/pic-6.jpg';
import pic7 from '../../images/pic-7.jpg';
import pic8 from '../../images/pic-8.jpg';
import pic9 from '../../images/pic-9.jpg';
import pic10 from '../../images/pic-10.jpg';
import pic11 from '../../images/pic-11.jpg';
import pic12 from '../../images/pic-12.jpg';
import pic13 from '../../images/pic-13.jpg';
import pic14 from '../../images/pic-14.jpg';
import pic15 from '../../images/pic-15.jpg';
import pic16 from '../../images/pic-16.jpg';

export default function Movies() {
    return (
        <section className="movies">
            <SearchForm />
            <MoviesCardList>
                <MoviesCard
                    img={pic1}
                    name="33 слова о дизайне"
                    title="33 слова о дизайне"
                    time="1ч 42м"
                />
                <MoviesCard
                    img={pic2}
                    name="Киноальманах «100 лет дизайна»"
                    title="Киноальманах «100 лет дизайна»"
                    time="1ч 42м"
                />
                <MoviesCard
                    img={pic3}
                    name="В погоне за Бенкси"
                    title="В погоне за Бенкси"
                    time="1ч 42м"
                />
                <MoviesCard
                    img={pic4}
                    name="Баския: Взрыв реальности"
                    title="Баския: Взрыв реальности"
                    time="1ч 42м"
                />
                <MoviesCard
                    img={pic5}
                    name="Бег это свобода"
                    title="Бег это свобода"
                    time="1ч 42м"
                />
                <MoviesCard
                    img={pic6}
                    name="Книготорговцы"
                    title="Книготорговцы"
                    time="1ч 42м"
                />
                <MoviesCard
                    img={pic7}
                    name="Когда я думаю о Германии ночью"
                    title="Когда я думаю о Германии ночью"
                    time="1ч 42м"
                />
                <MoviesCard
                    img={pic8}
                    name="Gimme Danger: История Игги и The Stooges"
                    title="Gimme Danger: История Игги и The Stooges"
                    time="1ч 42м"
                />
                <MoviesCard
                    img={pic9}
                    name="Дженис: Маленькая девочка грустит"
                    title="Дженис: Маленькая девочка грустит"
                    time="1ч 42м"
                />
                <MoviesCard
                    img={pic10}
                    name="Соберись перед прыжком"
                    title="Соберись перед прыжком"
                    time="1ч 42м"
                />
                <MoviesCard
                    img={pic11}
                    name="Пи Джей Харви: A dog called money"
                    title="Пи Джей Харви: A dog called money"
                    time="1ч 42м"
                />
                <MoviesCard
                    img={pic12}
                    name="По волнам: Искусство звука в кино"
                    title="По волнам: Искусство звука в кино"
                    time="1ч 42м"
                />
                <MoviesCard
                    img={pic13}
                    name="Рудбой"
                    title="Рудбой"
                    time="1ч 42м"
                />
                <MoviesCard
                    img={pic14}
                    name="Скейт — кухня"
                    title="Скейт — кухня"
                    time="1ч 42м"
                />
                <MoviesCard
                    img={pic15}
                    name="Война искусств"
                    title="Война искусств"
                    time="1ч 42м"
                />
                <MoviesCard
                    img={pic16}
                    name="Зона"
                    title="Зона"
                    time="1ч 42м"
                />
            </MoviesCardList>
        </section>
    )
}