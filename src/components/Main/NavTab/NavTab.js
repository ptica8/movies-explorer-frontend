import './NavTab.css';

export default function NavTab() {
    return (
        <section className="navtab">
            <h2 className="navtab__type">О проекте</h2>
            <div className="navtab__container">
                <div className="navtab__description">
                    <div className="navtab__column">
                        <h3 className="navtab__column-title">Дипломный проект включал 5 этапов</h3>
                        <p className="navtab__column-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className="navtab__column">
                        <h3 className="navtab__column-title">На выполнение диплома ушло 5 недель</h3>
                        <p className="navtab__column-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className="navtab__period">
                    <div className="navtab__period-imagine-b">1 неделя</div>
                    <div className="navtab__period-text-b">Back-end</div>
                    <div className="navtab__period-imagine-f">4 недели</div>
                    <div className="navtab__period-text-f">Front-end</div>
                </div>
            </div>
        </section>
    )
}