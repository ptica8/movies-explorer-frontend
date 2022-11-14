import './AuthorizationForm.css';
import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function AuthorizationForm(props) {
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
        <div className="form">
            <div className="form__container">
                <Link className="header__logo" to="/" />
                <h2 className="form__title">{props.title}</h2>
                <form
                    name={`form-${props.nameForm}`}
                    className={`general__form ${props.nameForm}__form`}
                    onSubmit={handleSubmit}
                >
                    <div className="form__form-set">
                        <label className={`form__input-label ${props.nameForm === 'register' ? '' : 'form__hide'}`}>
                            Имя
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className={`form__input form__input_type_${props.nameForm} form__input-name ${props.nameForm === 'register' ? '' : 'form__hide'}`}
                            minLength={2}
                            required=""
                            placeholder="Имя"
                            value={data.name}
                            onChange={handleChange}
                        />
                        <span className={`form__input-error input-name-error ${props.nameForm === 'register' ? '' : 'form__hide'}`}>Введите имя</span>
                        <label className="form__input-label">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={`form__input form__input_type_${props.nameForm} form__input-email`}
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
                            className={`form__input form__input_type_${props.nameForm} form__input-error_active`}
                            required
                            placeholder="Пароль"
                            minLength={2}
                            value={`${props.nameForm === 'register' ? data.password : ''}`}
                            onChange={handleChange}
                        />
                        <span className={`form__input-error input-password-error ${props.nameForm === 'register' ? 'form__input-error_active' : 'form__hide'}`}>Что-то пошло не так...</span>
                    </div>
                    <div>
                        <button type="submit" onSubmit={handleSubmit} className={`form__button form__button_type_${props.nameForm}`}>
                            {props.buttonText}
                        </button>
                        <div className={`general__signin ${props.nameForm}__signin`}>
                            <p className={`general__signin_text ${props.nameForm}__signin_text`}>{props.linkText}</p>
                            <Link to={props.link} className={`general__signin_link ${props.nameForm}__signin_link`}>{props.linkName}</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}