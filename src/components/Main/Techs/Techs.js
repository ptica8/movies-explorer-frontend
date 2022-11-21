import './Techs.css';

export default function Techs() {
    return (
        <section className="technology">
            <h2 className="technology__type">Технологии</h2>
            <div className="technology__container">
                <h3 className="technology__heading">7 технологий</h3>
                <p className="technology__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="technology__list">
                    <li className="technology__list-name">HTML</li>
                    <li className="technology__list-name">CSS</li>
                    <li className="technology__list-name">JS</li>
                    <li className="technology__list-name">React</li>
                    <li className="technology__list-name">Git</li>
                    <li className="technology__list-name">Express.js</li>
                    <li className="technology__list-name">mongoDB</li>
                </ul>
            </div>
        </section>
    )
}