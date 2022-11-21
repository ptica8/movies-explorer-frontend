import './MoviesCard.css';

export default function MoviesCard(props) {
   return (
       <section className="moviesCard">
            <li className="moviesCard__item">
                <img src={props.img} className="moviesCard__item_pic" alt={props.name}/>
                <div className="moviesCard__item-info">
                    <h2 className="moviesCard__item-info_title">{props.title}</h2>
                    <button className={`moviesCard__item-button moviesCard__item-button_like ${props.btnImg}`} type="button"></button>
                </div>
                <p className="moviesCard__item_time">{props.time}</p>
            </li>
        </section>
   )
}