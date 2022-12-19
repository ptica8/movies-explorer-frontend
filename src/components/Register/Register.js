import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import './Register.css';

export default function Register({handleSubmitRegister, handleRegister, message}) {
	return (
		<section className="register">
			<AuthorizationForm
				nameForm="register"
				title="Добро пожаловать!"
				buttonText="Зарегистрироваться"
				linkText="Уже зарегистрированы?"
				link="/signin"
				linkName="Войти"
				handleRegister={handleRegister}
				onSubmit={handleSubmitRegister}
				message={message}
			/>
		</section>
	)
}