import './PageNotFound.css';

export default function PageNotFound() {
    return (
        <section className="pageNotFound">
            <div className="pageNotFound__container">
                <h2 className="pageNotFound__container-title">404</h2>
                <p className="pageNotFound__container-description">Страница не найдена</p>
                <button className="pageNotFound__container-link">Назад</button>
            </div>
        </section>
    )
}
