import './Login.css';
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";

export default function Login({handleSubmitLogin, handleLogin, message}) {
	return (
		<section className="login">
			<AuthorizationForm
				nameForm="login"
				title="Рады видеть!"
				buttonText="Войти"
				linkText="Ещё не зарегистрированы?"
				link="/signup"
				linkName="Регистрация"
				handleLogin={handleLogin}
				onSubmit={handleSubmitLogin}
				message={message}
			/>
		</section>
	)
}