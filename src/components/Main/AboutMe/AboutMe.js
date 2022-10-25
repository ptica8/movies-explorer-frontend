import './AboutMe.css';
import photo from '../../../images/photo.jpg';

export default function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__type">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__container-text">
                    <h3 className="about-me__name">Валерия</h3>
                    <p className="about-me__job">Фронтенд-разработчик, 26 лет</p>
                    <p className="about-me_description">
                        Долгое время я жила в Санкт-Петербурге, где получила
                        высшее образование в сфере химической технологии и фармацевтики. Работала по специальности, а
                        затем дошла до кодинга. Увлекшись веб-разработкой, я ушла с основной работы на фриланс и
                        переехала в Сербию.
                    </p>
                    <a
                        className="social__link social__link_me"
                        href="https://www.linkedin.com/in/mikshina-v"
                        target="_blank"
                        rel="noreferrer"
                    >
                        LinkedIn
                    </a>
                </div>
                <img src={photo} className="about-me__container-photo" alt="MyPhoto" />
            </div>
        </section>
    )
}