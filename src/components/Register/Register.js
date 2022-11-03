import './Register.css';
import {Link} from "react-router-dom";
import React, {useState} from "react";

export default function Register(props) {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    })
    return (
        <section className="register">
            <form
                name="form-signup"
                className="register__form">
                <Link className="header__logo" to="/" />
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
                        placeholder="Name"
                        value={data.name}
                    />
                    <label className="form__input-label">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="form__input form__input_type_register form__input-email"
                        minLength={2}
                        required=""
                        placeholder="Email"
                        value={data.email}
                    />
                    <label className="form__input-label">
                        Пароль
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="form__input form__input_type_register form__input-password"
                        required=""
                        placeholder="Password"
                        minLength={2}
                        value={data.password}
                    />
                </fieldset>
                <button type="submit" className="form__button form__button_type_register">
                    {props.buttonText}
                </button>
                <div className="register__signin">
                    <Link to="/signin" className="register__signin_link">Уже зарегистрированы? Войти</Link>
                </div>
            </form>
        </section>
    )
}