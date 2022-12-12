import './PageNotFound.css';
import {useNavigate} from "react-router-dom";

export default function PageNotFound() {
	const navigate = useNavigate();
	return (
		<section className="pageNotFound">
			<div className="pageNotFound__container">
				<h2 className="pageNotFound__container-title">404</h2>
				<p className="pageNotFound__container-description">Страница не найдена</p>
				<button className="pageNotFound__container-link" onClick={() => navigate(-1)}>Назад</button>
			</div>
		</section>
	)
}
