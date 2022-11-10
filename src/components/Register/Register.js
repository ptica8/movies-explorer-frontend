import './Register.css';
import {Link} from "react-router-dom";
import React, {useState} from "react";

export default function Register(props) {
    const [data, setData] = useState({
        name: 'Виталий',
        email: 'pochta@yandex.ru',
        password: '12345678',
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        let { name, email, password } = data;

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((oldData) => ({
            ...oldData,
            [name]: value
        }))
    }

    return (
        <section className="register">
            <Link className="header__logo" to="/" />
            <form
                name="form-signup"
                className="register__form"
                onSubmit={handleSubmit}
            >
                <h2 className="register__title">{props.title}</h2>
                <fieldset className="register__form-set">
                    <label className="form__input-label">
                        Имя
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="form__input form__input_type_register form__input-name"
                        minLength={2}
                        required=""
                        placeholder="Имя"
                        value={data.name}
                        onChange={handleChange}
                    />
                    <span className="form__input-error input-name-error">Введите имя</span>
                    <label className="form__input-label">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="form__input form__input_type_register form__input-email"
                        minLength={2}
                        required
                        placeholder="Email"
                        value={data.email}
                        onChange={handleChange}
                    />
                    <span className="form__input-error input-email-error">Введите Email</span>
                    <label className="form__input-label">
                        Пароль
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="form__input form__input_type_register form__input-password"
                        required
                        placeholder="Пароль"
                        minLength={2}
                        value={data.password}
                        onChange={handleChange}
                    />
                    <span className="form__input-error input-password-error form__input-error_active">Что-то пошло не так...</span>
                </fieldset>
                <button type="submit" onSubmit={handleSubmit} className="form__button form__button_type_register">
                    {props.buttonText}
                </button>
                <div className="register__signin">
                    <p className="register__signin_text">Уже зарегистрированы?</p>
                    <Link to="/signin" className="register__signin_link">Войти</Link>
                </div>
            </form>
        </section>
    )
}