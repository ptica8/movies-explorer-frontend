import './Portfolio.css';

export default function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__list-project">
                    <a className="social__link social__link_portfolio"
                    href="#"
                    target="_blank"
                    rel="noreferrer">
                        <p className="portfolio__list-project_name">Статичный сайт</p>
                        <div className="portfolio__list-project_pic"></div>
                    </a>
                </li>
                <li className="portfolio__list-project">
                    <a className="social__link social__link_portfolio"
                       href="https://ptica8.github.io/russian-travel/"
                       target="_blank"
                       rel="noreferrer">
                        <p className="portfolio__list-project_name">Адаптивный сайт</p>
                        <div className="portfolio__list-project_pic"></div>
                    </a>
                </li>
                <li className="portfolio__list-project">
                    <a className="social__link social__link_portfolio"
                       href="#"
                       target="_blank"
                       rel="noreferrer">
                        <p className="portfolio__list-project_name">Одностраничное приложение</p>
                        <div className="portfolio__list-project_pic"></div>
                    </a>
                </li>
            </ul>
        </section>
    )
}