import './Login.css';
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";

export default function Login() {
    return (
        <section className="login">
            <AuthorizationForm
                nameForm="login"
                title="Рады видеть!"
                buttonText="Войти"
                linkText="Ещё не зарегистрированы?"
                link="/signup"
                linkName="Регистрация"
            />
        </section>
    )
}